"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { collections, products } from "@/lib/products";
import { useRevealGroup } from "./useReveal";

function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const filtros = [
  { id: "all", code: "ALL", label: "Todas" },
  { id: "indonesia", code: "ID", label: "Indonésia" },
  { id: "islandia", code: "IS", label: "Islândia" },
  { id: "nyc", code: "NY", label: "NYC" },
];

export default function CollectionsGallery() {
  const introRef = useRevealGroup(".reveal", "reveal", 0.1);
  const gridRef = useRevealGroup(".card", "reveal", 0.08);

  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(24);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: products.length };
    collections.forEach((col) => {
      c[col.slug] = products.filter((p) => p.colecao === col.slug).length;
    });
    return c;
  }, []);

  const filtrados = useMemo(() => {
    let list = active === "all" ? products : products.filter((p) => p.colecao === active);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) => p.nome.toLowerCase().includes(q) || p.colecao.toLowerCase().includes(q)
      );
    }
    return list;
  }, [active, query]);

  const total = filtrados.length;
  const lista = filtrados.slice(0, visible);
  const remaining = Math.max(0, total - visible);

  function trocarFiltro(id: string) {
    setActive(id);
    setVisible(24);
  }

  return (
    <>
      <section className="collections" id="colecoes" ref={introRef}>
        <div className="section-head reveal" style={{ ["--i" as string]: 0 }}>
          <div className="section-head__num">02</div>
          <div className="section-head__label">— As coleções</div>
        </div>
        <div className="collections__intro">
          <h2 className="h-display reveal" style={{ ["--i" as string]: 1 }}>
            O acervo apresentado em capítulos <em>país</em> a país, <em>série</em> a série.
          </h2>
          <p className="collections__lede reveal" style={{ ["--i" as string]: 2 }}>
            Navegue por cada coleção, pesquise pelo nome do lugar ou da obra, e descubra peças
            prontas para conversar com o seu espaço.
          </p>
        </div>
        <div className="filters-wrap reveal" style={{ ["--i" as string]: 3 }}>
          <div className="filters" role="tablist" aria-label="Coleções">
            {filtros.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={active === f.id}
                className={"filter " + (active === f.id ? "filter--on" : "")}
                onClick={() => trocarFiltro(f.id)}
              >
                <span className="filter__code">{f.code}</span>
                <span>{f.label}</span>
                <span className="filter__count">{counts[f.id] || 0}</span>
              </button>
            ))}
          </div>
          <div className="search">
            <svg className="search__icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              className="search__input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por obra, coleção…"
              aria-label="Buscar"
            />
            {query && (
              <button className="search__clear" onClick={() => setQuery("")} aria-label="Limpar busca">
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="gallery gallery--dnormal" id="galeria">
        <div className="gallery__head">
          <div className="gallery__count">
            <span className="gallery__count-num">{String(total).padStart(3, "0")}</span>
            <span className="gallery__count-lbl">obras nesta seleção</span>
          </div>
          <div className="gallery__legend">
            Mostrando {Math.min(visible, total)} de {total}
          </div>
        </div>

        <div className="gallery__grid" ref={gridRef}>
          {total === 0 && (
            <div className="gallery__empty">
              <div className="gallery__empty-h">Nada por aqui ainda</div>
              <p className="gallery__empty-p">
                Nenhuma obra corresponde a esta busca. Tente outro nome ou troque de coleção.
              </p>
            </div>
          )}
          {lista.map((p) => (
            <Link key={p.slug} href={`/produtos/${p.slug}`} className="card">
              <div className="card__frame">
                <div className="art-ph art-ph--photo" style={{ height: "100%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="art-ph__img" src={p.imagens[0]} alt={p.nome} loading="lazy" />
                </div>
                <div className="card__hover">
                  <div className="card__hover-row">
                    <span>Ver obra</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
              <div className="card__meta">
                <div className="card__meta-top">
                  <span className="card__title">{p.nome}</span>
                  <span className="card__price">{formatarPreco(p.precoBase * 0.95)}</span>
                </div>
                <div className="card__meta-bot">
                  <span className="card__place">
                    {collections.find((c) => c.slug === p.colecao)?.nome}
                  </span>
                  <span className="card__buy">Ver obra →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {total > 0 && (
          <div className="gallery__more">
            <div className="gallery__progress">
              <span>
                <em>{Math.min(visible, total)}</em> / {total}
              </span>
              <div className="gallery__progress-bar">
                <div
                  className="gallery__progress-fill"
                  style={{ width: (Math.min(visible, total) / total) * 100 + "%" }}
                ></div>
              </div>
            </div>
            {remaining > 0 ? (
              <button className="btn btn--ghost" onClick={() => setVisible((v) => Math.min(total, v + 24))}>
                <span>Carregar mais {Math.min(remaining, 24)}</span>
                <span className="btn__arrow">↓</span>
              </button>
            ) : (
              total > 24 && (
                <button className="btn btn--ghost" onClick={() => setVisible(24)}>
                  <span>Recolher</span>
                  <span className="btn__arrow">↑</span>
                </button>
              )
            )}
          </div>
        )}
      </section>
    </>
  );
}
