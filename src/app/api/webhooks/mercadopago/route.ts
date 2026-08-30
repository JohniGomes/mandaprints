import { NextRequest, NextResponse } from "next/server";
import { enviarEmail } from "@/lib/email";

/**
 * Webhook do Mercado Pago.
 *
 * Configurar em: mercadopago.com.br/developers/panel > sua aplicação >
 * Webhooks > URL: https://SEU_DOMINIO/api/webhooks/mercadopago
 *
 * Quando um pagamento é aprovado, o Mercado Pago envia um POST com o id do
 * pagamento. A partir desse id, buscamos os detalhes na API e disparamos os
 * e-mails automáticos para: cliente final, Filipe (dono da loja) e fornecedor.
 *
 * Variáveis de ambiente necessárias:
 * - MERCADOPAGO_ACCESS_TOKEN
 * - EMAIL_LOJA (e-mail do Filipe, para onde vai o aviso de nova venda)
 * - EMAIL_FORNECEDOR (e-mail do fornecedor, para onde vai a ficha de produção)
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

  if (pagamento.status !== "approved") {
    // Ainda pendente, rejeitado etc. — não dispara nada.
    return NextResponse.json({ recebido: true, status: pagamento.status });
  }

  const clienteEmail = pagamento.payer?.email;
  const clienteNome = pagamento.payer?.first_name || "Cliente";
  const valorTotal = pagamento.transaction_amount;
  const descricaoItens = pagamento.description || "Pedido Filipe Lara Fotografia";

  const resumoPedido = `
    <p><b>Pedido:</b> ${descricaoItens}</p>
    <p><b>Valor total:</b> R$ ${Number(valorTotal).toFixed(2)}</p>
    <p><b>ID do pagamento:</b> ${paymentId}</p>
  `;

  const envios = [];

  if (clienteEmail) {
    envios.push(
      enviarEmail({
        para: clienteEmail,
        assunto: "Confirmação do seu pedido — Filipe Lara Fotografia",
        html: `
          <h2>Obrigado pela sua compra, ${clienteNome}!</h2>
          <p>Seu pagamento foi aprovado e seu pedido já está sendo preparado.</p>
          ${resumoPedido}
          <p>Em breve você receberá o certificado da obra e o código de rastreio.</p>
        `,
      })
    );
  }

  if (emailLoja) {
    envios.push(
      enviarEmail({
        para: emailLoja,
        assunto: `Nova venda aprovada — ${descricaoItens}`,
        html: `
          <h2>Nova venda aprovada!</h2>
          <p><b>Cliente:</b> ${clienteNome} (${clienteEmail ?? "e-mail não informado"})</p>
          ${resumoPedido}
        `,
      })
    );
  }

  if (emailFornecedor) {
    envios.push(
      enviarEmail({
        para: emailFornecedor,
        assunto: `Novo pedido para produção — ${descricaoItens}`,
        html: `
          <h2>Novo pedido para produção e envio</h2>
          ${resumoPedido}
          <p>Cliente: ${clienteNome} (${clienteEmail ?? "e-mail não informado"})</p>
          <p><i>Endereço de entrega e detalhes de moldura/tamanho: integrar com os dados
          completos do pedido (endpoint /v1/payments traz apenas o resumo — os detalhes
          de variantes ficam salvos no pedido no seu banco de dados).</i></p>
        `,
      })
    );
  }

  await Promise.allSettled(envios);

  return NextResponse.json({ recebido: true, processado: true });
}
