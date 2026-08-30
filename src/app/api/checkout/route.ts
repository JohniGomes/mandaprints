import { NextRequest, NextResponse } from "next/server";
import { CartItem } from "@/lib/cart-context";
import { getSupabaseServerClient } from "@/lib/supabase";

/**
 * Cria uma preferência de pagamento no Mercado Pago (Checkout Pro) e devolve
 * a URL (init_point) para redirecionar o cliente.
 *
 * Requer a variável de ambiente MERCADOPAGO_ACCESS_TOKEN (Access Token de
 * produção ou de teste, gerado em mercadopago.com.br/developers/panel).
 */
export async function POST(req: NextRequest) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { error: "MERCADOPAGO_ACCESS_TOKEN não configurado no .env" },
      { status: 500 }
    );
  }

  const body = (await req.json()) as {
    itens: CartItem[];
    frete: { nome: string; preco: number } | null;
  };

  const items = body.itens.map((item) => ({
    title: `${item.nome} (${item.tamanho}, ${item.moldura}, ${item.acabamento})`,
    quantity: item.quantidade,
    unit_price: item.preco,
    currency_id: "BRL",
  }));

  if (body.frete && body.frete.preco > 0) {
    items.push({
      title: `Frete — ${body.frete.nome}`,
      quantity: 1,
      unit_price: body.frete.preco,
      currency_id: "BRL",
    });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const preferenceResp = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      items,
      back_urls: {
        success: `${baseUrl}/pedido/sucesso`,
        failure: `${baseUrl}/pedido/erro`,
        pending: `${baseUrl}/pedido/pendente`,
      },
      auto_return: "approved",
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
    }),
  });

  if (!preferenceResp.ok) {
    const erro = await preferenceResp.text();
    return NextResponse.json({ error: "Falha ao criar preferência", detalhe: erro }, { status: 502 });
  }

  const preference = await preferenceResp.json();

  const total =
    body.itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0) +
    (body.frete?.preco ?? 0);

  try {
    const supabase = getSupabaseServerClient();
    await supabase.from("pedidos").insert({
      mercadopago_preference_id: preference.id,
      status: "pendente",
      itens: body.itens,
      frete: body.frete,
      total,
    });
  } catch (err) {
    // Não bloqueia o checkout se o Supabase ainda não estiver configurado —
    // apenas registra no log do servidor para investigação.
    console.error("Falha ao salvar pedido no Supabase:", err);
  }

  return NextResponse.json({
    init_point: preference.init_point,
    preference_id: preference.id,
  });
}
