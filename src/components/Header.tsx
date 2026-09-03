"use client";

import { useState } from "react";
import Link from "next/link";
import { collections } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { quantidadeTotal } = useCart();
  const [menuAberto, setMenuAberto] = useState(false);

  const linksNav = [
    ...collections.map((c) => ({ href: `/colecoes/${c.slug}`, label: c.nome })),
    { href: "/#fotografo", label: "Fotógrafo" },
    { href: "/fale-conosco", label: "Contato" },
  ];

  return (
    <header className="w-full border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 lg:px-8">
        <button
          onClick={() => setMenuAberto(true)}
          aria-label="Abrir menu"
          className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round" />
            <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
            <line x1="4" y1="18" x2="20" y2="18" strokeLinecap="round" />
          </svg>
        </button>

        <Link href="/" className="text-xl font-bold tracking-widest text-neutral-900 sm:text-2xl">
          FILIPE LARA
        </Link>

        <div className="hidden flex-1 max-w-xl md:flex">
          <input
            type="text"
            placeholder="O que você está buscando?"
            className="w-full rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500"
          />
        </div>

        <div className="flex items-center gap-3 text-sm text-neutral-700 sm:gap-5">
          <Link href="/carrinho" className="relative flex items-center gap-1 hover:text-neutral-900">
            <span className="hidden sm:inline">Carrinho</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="sm:hidden"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1 text-xs text-white">
              {quantidadeTotal}
            </span>
          </Link>
        </div>
      </div>

      <nav className="hidden border-t border-neutral-100 md:block">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 py-3 text-sm font-medium text-neutral-700 lg:px-8">
          {linksNav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-neutral-900">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Menu lateral mobile */}
      {menuAberto && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuAberto(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[80vw] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
              <span className="text-lg font-bold tracking-widest text-neutral-900">MENU</span>
              <button
                onClick={() => setMenuAberto(false)}
                aria-label="Fechar menu"
                className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="5" x2="19" y2="19" strokeLinecap="round" />
                  <line x1="19" y1="5" x2="5" y2="19" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="px-4 py-4">
              <input
                type="text"
                placeholder="O que você está buscando?"
                className="w-full rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500"
              />
            </div>

            <ul className="flex flex-col px-2 text-neutral-800">
              {linksNav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMenuAberto(false)}
                    className="block rounded-md px-3 py-3 text-sm font-medium hover:bg-neutral-100"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
