"use client";

import Link from "next/link";
import { Product } from "@/lib/types";

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
      <div className="aspect-square w-full overflow-hidden bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={produto.imagens[0]}
          alt={produto.nome}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='%23e5e5e5'/></svg>";
          }}
        />
      </div>
      <div className="p-3">
        <p className="line-clamp-2 text-sm text-neutral-800">{produto.nome}</p>
        <p className="mt-2 text-xs text-neutral-500">no PIX a partir de:</p>
        <p className="text-base font-semibold text-neutral-900">{formatarPreco(precoPix)}</p>
      </div>
    </Link>
  );
}
