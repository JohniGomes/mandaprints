"use client";

import { useEffect, useState } from "react";

type Variante = {
  id: string;
  wall: string;
  frame: string;
  mat?: string;
  mostrarMovel?: boolean;
};

const variantes: Variante[] = [
  {
    id: "clara",
    wall: "linear-gradient(180deg, #f6f2ea 0%, #ece5d6 100%)",
    frame: "border-[3px] border-neutral-900/90 shadow-[0_18px_35px_-12px_rgba(0,0,0,0.45)]",
  },
  {
    id: "escura",
    wall: "linear-gradient(180deg, #2e2d2b 0%, #1c1b1a 100%)",
    frame: "border-[10px] border-white shadow-[0_18px_35px_-10px_rgba(0,0,0,0.6)]",
    mat: "p-1.5 bg-white",
  },
  {
    id: "aconchegante",
    wall: "linear-gradient(180deg, #ecdfc4 0%, #dcc9a3 100%)",
    frame: "border-[6px] border-[#5b3d24] shadow-[0_18px_35px_-12px_rgba(0,0,0,0.4)]",
    mostrarMovel: true,
  },
];

export default function WallMockup({ src, alt }: { src: string; alt: string }) {
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAtivo((i) => (i + 1) % variantes.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-square w-full overflow-hidden">
      {variantes.map((v, i) => (
        <div
          key={v.id}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
            i === ativo ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: v.wall }}
        >
          <div
            className={`relative overflow-hidden ${v.frame} ${v.mat ?? ""}`}
            style={{ width: "62%", aspectRatio: "1 / 1" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='%23e5e5e5'/></svg>";
              }}
            />
          </div>

          {v.mostrarMovel && (
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-3 px-[15%] pb-1">
              <div className="h-[9%] w-[46%] rounded-sm bg-[#8a6a45] shadow-inner" />
              <div className="h-[13%] w-[7%] rounded-t-full bg-emerald-800/70" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
