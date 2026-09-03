"use client";

import { useRevealGroup } from "./useReveal";

export default function About() {
  const ref = useRevealGroup(".reveal, .reveal-zoom", "reveal, reveal-zoom", 0.12);
  return (
    <section className="about" id="fotografo" ref={ref}>
      <div className="section-head reveal" style={{ ["--i" as string]: 0 }}>
        <div className="section-head__num">03</div>
        <div className="section-head__label">— O fotógrafo</div>
      </div>
      <div className="about__grid" style={{ textAlign: "left" }}>
        <div className="about__portrait reveal-zoom" style={{ ["--i" as string]: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="about__portrait-img"
            src="/images/islandia/FLP03842.jpg"
            alt="Filipe Lara em campo, na Islândia"
          />
          <div className="about__portrait-cap"></div>
        </div>
        <div className="about__text">
          <h2 className="h-display">
            Não são imagens decorativas.
            <br />
            São <em>frames do mundo</em>.
          </h2>
          <p>
            A Filipe Lara Fotografia reúne obras autorais em uma curadoria para ambientes que
            pedem mais do que decoração: pedem história, atmosfera e presença.
          </p>
          <p>
            Mais de 14 anos de estrada, 20+ países documentados e um olhar construído entre
            viagens, esporte, ruas e grandes histórias. Cada obra é fruto de campo, espera e
            escolha e chega à parede como um capítulo independente.
          </p>
          <div className="about__chips">
            <div className="chip">3 coleções públicas</div>
            <div className="chip">41 obras catalogadas</div>
            <div className="chip">20+ países documentados</div>
          </div>
        </div>
      </div>
    </section>
  );
}
