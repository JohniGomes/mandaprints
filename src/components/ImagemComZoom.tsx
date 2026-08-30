"use client";

import { useRef, useState } from "react";
import { MockupParede, FotoCompleta } from "./WallMockup";

const ZOOM_MIN = 1;
const ZOOM_MAX = 10;
const ZOOM_PASSO = 1.8;

export default function ImagemComZoom({
  src,
  alt,
  visualizacao,
}: {
  src: string;
  alt: string;
  visualizacao: "quadro" | "foto";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const arrastando = useRef(false);
  const inicio = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  function clampPos(x: number, y: number, escalaAtual: number) {
    const el = containerRef.current;
    if (!el) return { x, y };
    const limiteX = (el.clientWidth * (escalaAtual - 1)) / 2;
    const limiteY = (el.clientHeight * (escalaAtual - 1)) / 2;
    return {
      x: Math.min(limiteX, Math.max(-limiteX, x)),
      y: Math.min(limiteY, Math.max(-limiteY, y)),
    };
  }

  function aumentarZoom() {
    setEscala((e) => Math.min(ZOOM_MAX, +(e * ZOOM_PASSO).toFixed(2)));
  }

  function diminuirZoom() {
    setEscala((e) => {
      const nova = Math.max(ZOOM_MIN, +(e / ZOOM_PASSO).toFixed(2));
      if (nova === ZOOM_MIN) setPos({ x: 0, y: 0 });
      else setPos((p) => clampPos(p.x, p.y, nova));
      return nova;
    });
  }

  function resetarZoom() {
    setEscala(1);
    setPos({ x: 0, y: 0 });
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (escala <= 1) return;
    arrastando.current = true;
    inicio.current = { x: e.clientX, y: e.clientY, posX: pos.x, posY: pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!arrastando.current) return;
    const dx = e.clientX - inicio.current.x;
    const dy = e.clientY - inicio.current.y;
    setPos(clampPos(inicio.current.posX + dx, inicio.current.posY + dy, escala));
  }

  function handlePointerUp() {
    arrastando.current = false;
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100 select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        className="h-full w-full"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${escala})`,
          transition: arrastando.current ? "none" : "transform 0.2s ease-out",
          cursor: escala > 1 ? "grab" : "default",
          touchAction: escala > 1 ? "none" : "auto",
        }}
      >
        {visualizacao === "quadro" ? (
          <MockupParede src={src} alt={alt} />
        ) : (
          <FotoCompleta src={src} alt={alt} />
        )}
      </div>

      {/* Controles de zoom */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <button
          onClick={aumentarZoom}
          disabled={escala >= ZOOM_MAX}
          aria-label="Aproximar"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-md transition hover:bg-white disabled:opacity-40"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button
          onClick={diminuirZoom}
          disabled={escala <= ZOOM_MIN}
          aria-label="Afastar"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-md transition hover:bg-white disabled:opacity-40"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
      </div>

      {escala > 1 && (
        <button
          onClick={resetarZoom}
          className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-800 shadow-md transition hover:bg-white"
        >
          {escala.toFixed(1)}x · Redefinir
        </button>
      )}
    </div>
  );
}
