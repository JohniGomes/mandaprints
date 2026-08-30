"use client";

import { useEffect, useState } from "react";

const slides = [
  "/images/islandia/DJI_20260318105321_0023_D.jpg",
  "/images/nyc/FLP05680.jpg",
  "/images/indonesia/DJI_0128.jpg",
  "/images/islandia/FLP01977.jpg",
  "/images/nyc/FLP04607.jpg",
  "/images/indonesia/FLP00547.jpg",
];

export default function Hero() {
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAtivo((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === ativo ? "opacity-45" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-neutral-950/20" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-center gap-4 px-4 py-24 text-white lg:px-8">
        <span className="text-sm uppercase tracking-widest text-emerald-300/80">
          Nova coleção disponível
        </span>
        <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
          Fotografias autorais para decorar seu ambiente
        </h1>
        <p className="max-w-lg text-neutral-300">
          Coleções renovadas a cada 3 meses, impressas em tela canvas de alta qualidade.
        </p>
        <a
          href="#mais-vendidos"
          className="mt-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-emerald-300"
        >
          Ver coleções
        </a>

        <div className="mt-6 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setAtivo(i)}
              aria-label={`Ir para slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === ativo ? "w-6 bg-emerald-300" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
