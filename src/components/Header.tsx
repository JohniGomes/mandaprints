"use client";

import Link from "next/link";
import { collections } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { quantidadeTotal } = useCart();

  return (
    <header className="w-full border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 lg:px-8">
        <Link href="/" className="text-2xl font-bold tracking-widest text-neutral-900">
          FILIPE LARA
        </Link>

        <div className="hidden flex-1 max-w-xl md:flex">
          <input
            type="text"
            placeholder="O que você está buscando?"
            className="w-full rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500"
          />
        </div>

        <div className="flex items-center gap-5 text-sm text-neutral-700">
          <Link href="/atendimento" className="hidden md:block hover:text-neutral-900">
            Atendimento
          </Link>
          <Link href="/conta" className="hidden md:block hover:text-neutral-900">
            Minha conta
          </Link>
          <Link href="/carrinho" className="relative flex items-center gap-1 hover:text-neutral-900">
            <span>Carrinho</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1 text-xs text-white">
              {quantidadeTotal}
            </span>
          </Link>
        </div>
      </div>

      <nav className="border-t border-neutral-100">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 py-3 text-sm font-medium text-neutral-700 lg:px-8">
          <li>
            <Link href="/lancamentos" className="hover:text-neutral-900">
              Lançamentos
            </Link>
          </li>
          {collections.map((c) => (
            <li key={c.slug}>
              <Link href={`/colecoes/${c.slug}`} className="hover:text-neutral-900">
                {c.nome}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/quadros-personalizados" className="hover:text-neutral-900">
              Quadros Personalizados
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
