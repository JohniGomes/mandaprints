"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const WA = "5551989739921";
const waUrl = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const MSG_GERAL =
  "Olá! Vim pelo site e gostaria de conversar sobre as coleções de quadros do Filipe Lara.";

const links: [string, string][] = [
  ["#colecoes", "Coleções"],
  ["#galeria", "Galeria"],
  ["#fotografo", "Fotógrafo"],
  ["#contato", "Contato"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { quantidadeTotal } = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.body.classList.toggle("menu-open", menuOpen);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  return (
    <header className={"nav " + (scrolled ? "nav--scrolled" : "")}>
      <Link href="#top" className="nav__brand">
        <span className="nav__mark">
          <span />
        </span>
        <div className="nav__wordmark">
          <span className="nav__word">MANDA PRINTS</span>
          <span className="nav__sub">Quadros decorativos</span>
        </div>
      </Link>

      <nav className="nav__links">
        {links.map(([href, label]) => (
          <a key={href} href={href} className="nav__link">
            {label}
          </a>
        ))}
        <Link href="/carrinho" className="nav__cta">
          <span>Carrinho ({quantidadeTotal})</span>
        </Link>
      </nav>

      <button
        className={"nav__burger " + (menuOpen ? "nav__burger--open" : "")}
        aria-label="Abrir menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={"nav__drawer " + (menuOpen ? "nav__drawer--open" : "")}>
        <nav className="nav__drawer-links">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="nav__drawer-link" onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <Link href="/carrinho" className="nav__drawer-link" onClick={() => setMenuOpen(false)}>
            Carrinho ({quantidadeTotal})
          </Link>
        </nav>
        <a
          className="btn btn--primary nav__drawer-cta"
          href={waUrl(MSG_GERAL)}
          target="_blank"
          rel="noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          <span>Falar pelo WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
