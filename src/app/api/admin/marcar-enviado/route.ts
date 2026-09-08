import { NextRequest, NextResponse } from "next/server";
import { enviarEmail } from "@/lib/email";
import { getSupabaseServerClient } from "@/lib/supabase";

/**
 * Marca um pedido como enviado e avisa o cliente por e-mail com o código
 * de rastreio. Usado pela tela /admin/pedidos.
 *
 * Protegido por senha simples (ADMIN_SENHA) — não há sistema de login
 * completo ainda, só o suficiente para impedir acesso não autorizado a
 * esta rota específica.
 */
export async function POST(req: NextRequest) {
  const adminSenha = process.env.ADMIN_SENHA;
  if (!adminSenha) {
    return NextResponse.json({ error: "ADMIN_SENHA não configurada" }, { status: 500 });
  }

  const body = (await req.json()) as {
    senha: string;
    pedidoId: string;
    codigoRastreio: string;
    transportadora: string;
  };

  if (body.senha !== adminSenha) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  if (!body.pedidoId || !body.codigoRastreio?.trim()) {
    return NextResponse.json({ error: "Pedido e código de rastreio são obrigatórios" }, { status: 400 });
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
      status: "enviado",
      codigo_rastreio: body.codigoRastreio.trim(),
      transportadora: body.transportadora?.trim() || null,
      enviado_em: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.pedidoId);

  if (erroUpdate) {
    return NextResponse.json({ error: "Falha ao atualizar pedido" }, { status: 500 });
  }

  if (pedido.cliente_email) {
    await enviarEmail({
      para: pedido.cliente_email,
      assunto: "Seu pedido foi enviado — Filipe Lara Fotografia",
      html: `
        <h2>Seu pedido está a caminho, ${pedido.cliente_nome || "cliente"}!</h2>
        <p>O fornecedor acabou de despachar sua obra.</p>
        <p><b>Transportadora:</b> ${body.transportadora?.trim() || "não informada"}</p>
        <p><b>Código de rastreio:</b> ${body.codigoRastreio.trim()}</p>
        <p>Você pode acompanhar a entrega diretamente no site da transportadora usando esse código.</p>
      `,
    });
  }

  return NextResponse.json({ ok: true });
}
