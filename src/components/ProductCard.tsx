"use client";

import Link from "next/link";
import { Product } from "@/lib/types";
import WallMockup from "./WallMockup";

function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProductCard({ produto }: { produto: Product }) {
  const precoPix = produto.precoBase * 0.95;

  return (
    <Link
      href={`/produtos/${produto.slug}`}
      className="group block overflow-hidden rounded-lg border border-neutral-100 bg-white transition hover:shadow-md"
    >
      <WallMockup src={produto.imagens[0]} alt={produto.nome} />
      <div className="p-3">
        <p className="line-clamp-2 text-sm text-neutral-800">{produto.nome}</p>
        <p className="mt-2 text-xs text-neutral-500">no PIX a partir de:</p>
        <p className="text-base font-semibold text-neutral-900">{formatarPreco(precoPix)}</p>
      </div>
    </Link>
  );
}
