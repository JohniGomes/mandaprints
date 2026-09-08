import { NextRequest, NextResponse } from "next/server";
import { enviarEmail } from "@/lib/email";
import { getSupabaseServerClient } from "@/lib/supabase";

/**
 * Cancela um pedido (ex: fornecedor sem estoque, cliente desistiu) e avisa
 * o cliente por e-mail. Usado pela tela /admin/pedidos.
 *
 * Protegido por senha simples (ADMIN_SENHA) — mesma proteção das outras
 * rotas de admin.
 */
export async function POST(req: NextRequest) {
  const adminSenha = process.env.ADMIN_SENHA;
  if (!adminSenha) {
    return NextResponse.json({ error: "ADMIN_SENHA não configurada" }, { status: 500 });
  }

  const body = (await req.json()) as { senha: string; pedidoId: string; motivo?: string };

  if (body.senha !== adminSenha) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }
  if (!body.pedidoId) {
    return NextResponse.json({ error: "Pedido é obrigatório" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();

  const { data: pedido, error: erroBusca } = await supabase
    .from("pedidos")
    .select("id, cliente_nome, cliente_email")
    .eq("id", body.pedidoId)
    .maybeSingle();

  if (erroBusca || !pedido) {
    return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
  }

  const { error: erroUpdate } = await supabase
    .from("pedidos")
    .update({
      status: "cancelado",
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.pedidoId);

  if (erroUpdate) {
    return NextResponse.json({ error: "Falha ao atualizar pedido" }, { status: 500 });
  }

  if (pedido.cliente_email) {
    await enviarEmail({
      para: pedido.cliente_email,
      assunto: "Seu pedido foi cancelado — Filipe Lara Fotografia",
      html: `
        <h2>Seu pedido foi cancelado, ${pedido.cliente_nome || "cliente"}.</h2>
        ${body.motivo ? `<p><b>Motivo:</b> ${body.motivo}</p>` : ""}
        <p>Se o pagamento já havia sido processado, o estorno será realizado pelo Mercado Pago
        de acordo com o prazo do seu método de pagamento.</p>
        <p>Qualquer dúvida, entre em contato respondendo este e-mail.</p>
      `,
    });
  }

  return NextResponse.json({ ok: true });
}
