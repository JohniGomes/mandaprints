function onErro(e: React.SyntheticEvent<HTMLImageElement>) {
  (e.target as HTMLImageElement).src =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='%23e5e5e5'/></svg>";
}

export function MockupParede({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ background: "linear-gradient(180deg, #f6f2ea 0%, #ece5d6 100%)" }}
    >
      <div className="relative flex max-h-full max-w-[62%] items-center justify-center border-[3px] border-neutral-900/90 bg-white shadow-[0_18px_35px_-12px_rgba(0,0,0,0.45)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          onError={onErro}
        />
      </div>
    </div>
  );
}

export function FotoCompleta({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-neutral-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full object-contain"
        onError={onErro}
      />
    </div>
  );
}

export default function WallMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden">
      <MockupParede src={src} alt={alt} />
    </div>
  );
}
