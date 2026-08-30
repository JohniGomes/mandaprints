"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CarrinhoPage() {
  const { itens, remover, atualizarQuantidade, total } = useCart();
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState<{ nome: string; preco: number; prazo: string } | null>(null);
  const [carregandoFrete, setCarregandoFrete] = useState(false);
  const [finalizando, setFinalizando] = useState(false);

  async function calcularFrete() {
    if (cep.replace(/\D/g, "").length !== 8) return;
    setCarregandoFrete(true);
    setFrete(null);
    try {
      const resp = await fetch("/api/frete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cepDestino: cep }),
      });
      const data = await resp.json();
      setFrete(data.opcoes?.[0] ?? null);
    } finally {
      setCarregandoFrete(false);
    }
  }

  async function finalizarCompra() {
    setFinalizando(true);
    try {
      const resp = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itens, frete }),
      });
      const data = await resp.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } finally {
      setFinalizando(false);
    }
  }

  if (itens.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Seu carrinho está vazio</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white"
        >
          Ver coleções
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900">Meu Carrinho</h1>

      <div className="mt-6 divide-y divide-neutral-200">
        {itens.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imagem}
              alt={item.nome}
              className="h-20 w-20 rounded object-cover bg-neutral-100"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100%' height='100%' fill='%23e5e5e5'/></svg>";
              }}
            />
            <div className="flex-1">
              <p className="font-medium text-neutral-900">{item.nome}</p>
              <p className="text-sm text-neutral-500">
                {item.tamanho} · {item.moldura} · {item.acabamento}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={item.quantidade}
                  onChange={(e) => atualizarQuantidade(item.id, Number(e.target.value))}
                  className="w-16 rounded border border-neutral-300 px-2 py-1 text-sm"
                />
                <button
                  onClick={() => remover(item.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remover
                </button>
              </div>
            </div>
            <p className="font-semibold text-neutral-900">
              {formatarPreco(item.preco * item.quantidade)}
            </p>
          </div>
        ))}
      </div>

      {/* Frete */}
      <div className="mt-8 rounded-lg border border-neutral-200 p-4">
        <h3 className="text-sm font-semibold text-neutral-900">Calcular frete</h3>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            placeholder="Digite seu CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="w-40 rounded border border-neutral-300 px-3 py-2 text-sm"
          />
          <button
            onClick={calcularFrete}
            disabled={carregandoFrete}
            className="rounded border border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
          >
            {carregandoFrete ? "Calculando..." : "Calcular"}
          </button>
        </div>
        {frete && (
          <p className="mt-2 text-sm text-neutral-700">
            {frete.nome}: {formatarPreco(frete.preco)} — prazo estimado {frete.prazo}
          </p>
        )}
      </div>

      {/* Resumo */}
      <div className="mt-8 flex flex-col items-end gap-2">
        <p className="text-sm text-neutral-600">Subtotal: {formatarPreco(total)}</p>
        {frete && <p className="text-sm text-neutral-600">Frete: {formatarPreco(frete.preco)}</p>}
        <p className="text-xl font-bold text-neutral-900">
          Total: {formatarPreco(total + (frete?.preco ?? 0))}
        </p>
        <button
          onClick={finalizarCompra}
          disabled={finalizando}
          className="mt-2 rounded-full bg-neutral-900 px-8 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          {finalizando ? "Redirecionando..." : "Finalizar Compra (Mercado Pago)"}
        </button>
      </div>
    </div>
  );
}
