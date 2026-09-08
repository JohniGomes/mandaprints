import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

/**
 * Lista pedidos pagos aguardando envio (status = "aprovado"), para a tela
 * /admin/pedidos. Protegido por senha simples (ADMIN_SENHA).
 */
export async function GET(req: NextRequest) {
  const adminSenha = process.env.ADMIN_SENHA;
  const senha = req.nextUrl.searchParams.get("senha");

  if (!adminSenha) {
    return NextResponse.json({ error: "ADMIN_SENHA não configurada" }, { status: 500 });
  }
  if (senha !== adminSenha) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("pedidos")
    .select(
      "id, itens, frete, endereco, total, cliente_nome, cliente_email, cliente_telefone, status, codigo_rastreio, transportadora, created_at"
    )
    .eq("status", "aprovado")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Falha ao buscar pedidos" }, { status: 500 });
  }

  return NextResponse.json({ pedidos: data });
}
