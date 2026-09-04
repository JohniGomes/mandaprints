"use client";

import { collections } from "@/lib/products";
import { useRevealGroup } from "./useReveal";

export default function CollectionsIntro() {
  const ref = useRevealGroup(".reveal", "reveal", 0.1);
  return (
    <section className="collections" id="colecoes" ref={ref}>
      <div className="section-head reveal" style={{ ["--i" as string]: 0 }}>
        <div className="section-head__num">02</div>
        <div className="section-head__label">— As coleções</div>
      </div>
      <div className="collections__intro">
        <h2 className="h-display reveal" style={{ ["--i" as string]: 1 }}>
          O acervo apresentado em capítulos <em>país</em> a país, <em>série</em> a série.
        </h2>
        <p className="collections__lede reveal" style={{ ["--i" as string]: 2 }}>
          Navegue por cada coleção e descubra peças prontas para conversar com o seu espaço.
        </p>
      </div>
      <div className="filters-wrap reveal" style={{ ["--i" as string]: 3 }}>
        <div className="filters" role="tablist" aria-label="Coleções">
          {collections.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} className="filter">
              <span className="filter__code">{c.slug.slice(0, 2).toUpperCase()}</span>
              <span>{c.nome}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
