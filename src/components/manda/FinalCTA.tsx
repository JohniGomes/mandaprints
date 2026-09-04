"use client";

import { useRevealGroup } from "./useReveal";

const WA = "5551989739921";
const waUrl = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const MSG_GERAL =
  "Olá! Vim pelo site e gostaria de conversar sobre as coleções de quadros do Filipe Lara.";

export default function FinalCTA() {
  const ref = useRevealGroup(".reveal", "reveal", 0.18);
  return (
    <section className="final" id="contato" ref={ref}>
      <div className="final__bg"></div>
      <div className="final__inner">
        <h2 className="final__title reveal" style={{ ["--i" as string]: 1 }}>
          Encontre a obra que
          <br />
          conversa com o <em>teu espaço</em>.
        </h2>
        <p className="final__lede reveal" style={{ ["--i" as string]: 2 }}>
          Explore as coleções disponíveis e fale pelo WhatsApp para consultar tamanhos,
          acabamentos, valores e disponibilidade. Atendimento humano, sem etapas desnecessárias.
        </p>
        <div className="final__ctas reveal" style={{ ["--i" as string]: 3 }}>
          <a className="btn btn--primary btn--lg" href="#galeria">
            <span>Ver quadros disponíveis</span>
            <span className="btn__arrow">↓</span>
          </a>
          <a className="btn btn--ghost btn--lg" href={waUrl(MSG_GERAL)} target="_blank" rel="noreferrer">
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
