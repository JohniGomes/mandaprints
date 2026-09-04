"use client";

import { useEffect, useRef } from "react";
import { useRevealGroup } from "./useReveal";

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRevealGroup(".hero__meta-cell", "reveal", 0.05);

  useEffect(() => {
    const root = titleRef.current;
    if (!root) return;
    const items = root.querySelectorAll(".reveal-text");
    items.forEach((t, i) => {
      (t as HTMLElement).style.setProperty("--i", String(i));
      requestAnimationFrame(() => t.classList.add("reveal-text--in"));
    });
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__bg" style={{ display: "block", opacity: 1 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero__photo"
          src="/images/islandia/FLP03147.jpg"
          alt="Vestrahorn, Islândia — montanhas refletidas na água"
        />
      </div>

      <div className="hero__meta-top">
        <div className="hero__meta-l"></div>
        <div></div>
      </div>

      <div className="hero__content">
        <div ref={titleRef}>
          <h1 className="hero__title hero__title--d" style={{ fontWeight: 300 }}>
            <span className="reveal-text">
              <span className="reveal-text__inner">Fotografias autorais</span>
            </span>
            <br />
            <span className="reveal-text">
              <span className="reveal-text__inner">para transformar</span>
            </span>
            <br />
            <span className="reveal-text">
              <span className="reveal-text__inner">suas paredes</span>
            </span>
            <br />
            <span className="reveal-text">
              <span className="reveal-text__inner">
                <span style={{ color: "rgb(79, 216, 156)", fontWeight: 800 }}>EM VIDA</span>
              </span>
            </span>
          </h1>
          <h1 className="hero__title hero__title--m" style={{ fontWeight: 300 }}>
            <span className="reveal-text">
              <span className="reveal-text__inner">Fotografias autorais</span>
            </span>
            <br />
            <span className="reveal-text">
              <span className="reveal-text__inner">para transformar</span>
            </span>
            <br />
            <span className="reveal-text">
              <span className="reveal-text__inner">suas paredes</span>
            </span>
            <br />
            <span className="reveal-text">
              <span className="reveal-text__inner">
                <span style={{ color: "rgb(79, 216, 156)", fontWeight: 800 }}>EM VIDA</span>
              </span>
            </span>
          </h1>
        </div>
        <div className="hero__ctas reveal reveal--in">
          <a
            className="btn btn--primary"
            href="#galeria"
            style={{ backgroundColor: "rgba(255,255,255,0)", border: "none", boxShadow: "none" }}
          >
            <span style={{ color: "rgb(255,255,255)" }}>EXPLORAR AS OBRAS</span>
          </a>
        </div>
      </div>

      <div className="hero__meta-bottom" ref={metaRef}>
        <div className="hero__meta-cell reveal" style={{ ["--i" as string]: 0 }}>
          <div className="hero__meta-k">Coleções</div>
          <div className="hero__meta-v">
            <em>3</em> capítulos
          </div>
        </div>
        <div className="hero__meta-cell reveal" style={{ ["--i" as string]: 1 }}>
          <div className="hero__meta-k">Obras</div>
          <div className="hero__meta-v">
            <em>41</em> quadros
          </div>
        </div>
        <div className="hero__meta-cell reveal" style={{ ["--i" as string]: 2 }}>
          <div className="hero__meta-k">Experiência</div>
          <div className="hero__meta-v">
            <em>14</em> anos · <em>20+</em> países
          </div>
        </div>
        <div className="hero__meta-cell reveal" style={{ ["--i" as string]: 3 }}>
          <div className="hero__meta-k">Atendimento</div>
          <div className="hero__meta-v">Direto no WhatsApp</div>
        </div>
      </div>
    </section>
  );
}
