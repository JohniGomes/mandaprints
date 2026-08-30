import { NextRequest, NextResponse } from "next/server";

/**
 * Cota o frete via API do Melhor Envio.
 *
 * Requer as variáveis de ambiente:
 * - MELHOR_ENVIO_TOKEN: token de integração gerado em
 *   melhorenvio.com.br > Configurações > Tokens de Integração.
 * - MELHOR_ENVIO_CEP_ORIGEM: CEP de onde o fornecedor despacha os produtos.
 *
 * Enquanto essas variáveis não estiverem configuradas, retorna uma cotação
 * simulada para permitir o desenvolvimento e testes do front-end.
 */
export async function POST(req: NextRequest) {
  const { cepDestino } = (await req.json()) as { cepDestino: string };
  const token = process.env.MELHOR_ENVIO_TOKEN;
  const cepOrigem = process.env.MELHOR_ENVIO_CEP_ORIGEM;

  if (!token || !cepOrigem) {
    // Cotação simulada — remover assim que as credenciais reais forem configuradas.
    return NextResponse.json({
      simulado: true,
      opcoes: [
        { nome: "Transportadora (simulado)", preco: 39.9, prazo: "5 a 8 dias úteis" },
      ],
    });
  }

  const resp = await fetch("https://www.melhorenvio.com.br/api/v2/me/shipment/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      from: { postal_code: cepOrigem },
      to: { postal_code: cepDestino.replace(/\D/g, "") },
      // Dimensões padrão de um quadro embalado — ajustar conforme o tamanho real.
      package: { height: 10, width: 60, length: 90, weight: 3 },
    }),
  });

  if (!resp.ok) {
    const erro = await resp.text();
    return NextResponse.json({ error: "Falha ao cotar frete", detalhe: erro }, { status: 502 });
  }

  const cotacoes = await resp.json();

  const opcoes = (cotacoes as Array<{ name: string; price: string; delivery_time: number }>)
    .filter((c) => c.price)
    .map((c) => ({
      nome: c.name,
      preco: Number(c.price),
      prazo: `${c.delivery_time} dias úteis`,
    }));

  return NextResponse.json({ simulado: false, opcoes });
}
