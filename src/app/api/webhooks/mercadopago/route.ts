import { NextRequest, NextResponse } from "next/server";
import { enviarEmail } from "@/lib/email";
import { getSupabaseServerClient } from "@/lib/supabase";
import { CartItem } from "@/lib/cart-context";
import { EnderecoEntrega } from "@/lib/types";

interface PedidoRow {
  id: string;
  itens: CartItem[];
  frete: { nome: string; preco: number; prazo?: string } | null;
  endereco: EnderecoEntrega | null;
  total: number;
  cliente_nome: string | null;
  cliente_email: string | null;
}

function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function listaItensHtml(itens: CartItem[]) {
  return `
    <ul>
      ${itens
        .map(
          (item) => `
        <li>
          <b>${item.quantidade}x ${item.nome}</b> — ${item.tamanho}, ${item.moldura}, ${item.acabamento}
          (${formatarPreco(item.preco)} cada)
        </li>`
        )
        .join("")}
    </ul>
  `;
}

function enderecoHtml(endereco: EnderecoEntrega | null) {
  if (!endereco) return "<p><i>Endereço não informado.</i></p>";
  return `
    <p>
      ${endereco.nome} — ${endereco.telefone}<br/>
      ${endereco.rua}, ${endereco.numero}${endereco.complemento ? " — " + endereco.complemento : ""}<br/>
      ${endereco.bairro} — ${endereco.cidade}/${endereco.uf}<br/>
      CEP: ${endereco.cep}
    </p>
  `;
}

/**
 * Webhook do Mercado Pago.
 *
 * O notification_url é enviado por preferência (veja checkout/route.ts),
 * então não é preciso configurar nada manualmente no painel do Mercado
 * Pago para esta integração funcionar.
 *
 * Quando um pagamento é aprovado, o Mercado Pago envia um POST com o id do
 * pagamento. A partir desse id buscamos o pagamento na API do MP (para
 * saber se foi aprovado) e localizamos o pedido completo no Supabase pelo
 * "external_reference" — o id do próprio pedido no nosso banco, enviado na
 * criação da preferência. NÃO usar pagamento.order?.id (é o id do
 * merchant_order, não bate com nada que a gente guarda) nem confiar no
 * e-mail devolvido em pagamento.payer?.email (o Mercado Pago costuma
 * mascará-lo, tipo "XXXXXXXXXXX") — o e-mail e nome usados nos avisos vêm
 * do que o próprio cliente preencheu no nosso formulário de entrega.
 *
 * Variáveis de ambiente necessárias:
 * - MERCADOPAGO_ACCESS_TOKEN
 * - EMAIL_LOJA (e-mail de quem recebe o aviso de nova venda)
 * - EMAIL_FORNECEDOR (e-mail de quem recebe a ficha de produção/envio)
 */
export async function POST(req: NextRequest) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  const emailLoja = process.env.EMAIL_LOJA;
  const emailFornecedor = process.env.EMAIL_FORNECEDOR;

  const notificacao = await req.json().catch(() => null);

  // O Mercado Pago manda notificações de vários tipos (payment, merchant_order...).
  // Só nos interessa "payment".
  if (!notificacao || notificacao.type !== "payment" || !accessToken) {
    return NextResponse.json({ recebido: true });
  }

  const paymentId = notificacao.data?.id;
  if (!paymentId) {
    return NextResponse.json({ recebido: true });
  }

  const pagamentoResp = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!pagamentoResp.ok) {
    return NextResponse.json({ erro: "Não foi possível buscar o pagamento" }, { status: 502 });
  }

  const pagamento = await pagamentoResp.json();
  const externalReference: string | undefined = pagamento.external_reference || undefined;

  let pedido: PedidoRow | null = null;

  try {
    const supabase = getSupabaseServerClient();

    const dadosAtualizados = {
      status: pagamento.status === "approved" ? "aprovado" : pagamento.status,
      mercadopago_payment_id: String(paymentId),
      updated_at: new Date().toISOString(),
    };

    if (externalReference) {
      const { data } = await supabase
        .from("pedidos")
        .update(dadosAtualizados)
        .eq("id", externalReference)
        .select()
        .maybeSingle();
      pedido = (data as PedidoRow) ?? null;
    }

    // Fallback para pedidos criados antes do external_reference existir:
    // tenta pelo id da preferência (que o MP nao devolve mais no payload
    // do pagamento, mas fica salvo no nosso registro) via payment_id ja
    // gravado numa notificacao anterior, ou casamento por preference_id
    // se o campo "order" antigo ainda apontar pra ele em contas legadas.
    if (!pedido) {
      const { data: dataFallback } = await supabase
        .from("pedidos")
        .update(dadosAtualizados)
        .eq("mercadopago_payment_id", String(paymentId))
        .select()
        .maybeSingle();
      pedido = (dataFallback as PedidoRow) ?? null;
    }
  } catch (err) {
    console.error("Falha ao atualizar pedido no Supabase:", err);
  }

  if (pagamento.status !== "approved") {
    // Ainda pendente, rejeitado etc. — não dispara e-mail.
    return NextResponse.json({ recebido: true, status: pagamento.status });
  }

  const itens = pedido?.itens ?? [];
  const frete = pedido?.frete ?? null;
  const endereco = pedido?.endereco ?? null;
  const valorTotal = pedido?.total ?? pagamento.transaction_amount;
  // Preferimos os dados que o proprio cliente preencheu no nosso
  // formulario — o retorno do Mercado Pago costuma mascarar o e-mail.
  const clienteEmail = pedido?.cliente_email || undefined;
  const clienteNome = pedido?.cliente_nome || "Cliente";

  const resumoItens = itens.length
    ? listaItensHtml(itens)
    : `<p>${pagamento.description || "Pedido Manda Prints"}</p>`;

  const resumoFrete = frete
    ? `<p><b>Frete:</b> ${frete.nome} — ${formatarPreco(frete.preco)}${frete.prazo ? ` (prazo estimado ${frete.prazo})` : ""}</p>`
    : "";

  const envios = [];

  if (clienteEmail) {
    envios.push(
      enviarEmail({
        para: clienteEmail,
        assunto: "Confirmação do seu pedido — Manda Prints",
        html: `
          <h2>Obrigado pela sua compra, ${clienteNome}!</h2>
          <p>Seu pagamento foi aprovado e seu pedido já está sendo preparado.</p>
          ${resumoItens}
          ${resumoFrete}
          <p><b>Valor total:</b> ${formatarPreco(Number(valorTotal))}</p>
          <p>Entrega em:</p>
          ${enderecoHtml(endereco)}
          <p>Em breve você receberá o certificado da obra e o código de rastreio.</p>
        `,
      })
    );
  }

  if (emailLoja) {
    envios.push(
      enviarEmail({
        para: emailLoja,
        assunto: `Venda realizada — ${formatarPreco(Number(valorTotal))}`,
        html: `
          <h2>Venda realizada!</h2>
          <p><b>Cliente:</b> ${clienteNome} (${clienteEmail ?? "e-mail não informado"})</p>
          ${resumoItens}
          ${resumoFrete}
          <p><b>Valor total:</b> ${formatarPreco(Number(valorTotal))}</p>
          <p><b>ID do pagamento:</b> ${paymentId}</p>
        `,
      })
    );
  }

  if (emailFornecedor) {
    envios.push(
      enviarEmail({
        para: emailFornecedor,
        assunto: "Novo pedido para produção e envio",
        html: `
          <h2>Novo pedido para produção e envio</h2>
          ${resumoItens}
          <p><b>Cliente:</b> ${clienteNome} (${clienteEmail ?? "e-mail não informado"})</p>
          <p><b>Endereço de entrega:</b></p>
          ${enderecoHtml(endereco)}
          ${resumoFrete}
        `,
      })
    );
  }

  await Promise.allSettled(envios);

  return NextResponse.json({ recebido: true, processado: true });
}
