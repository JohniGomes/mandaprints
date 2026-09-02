import ScrollReveal from "./ScrollReveal";

const estatisticas = [
  { label: "Coleções", valorDestaque: "3", texto: "capítulos" },
  { label: "Obras", valorDestaque: "41", texto: "quadros" },
  { label: "Experiência", valorDestaque: "14 anos", texto: "· 20+ países" },
  { label: "Entrega", texto: "Segura" },
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/islandia/DJI_20260318105321_0023_D.jpg"
          alt="Vestrahorn, Islândia — montanhas refletidas na água"
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/30 to-neutral-950/90" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 px-4 py-24 text-center text-white sm:py-32">
        <ScrollReveal>
          <h1 className="max-w-3xl text-3xl font-light leading-tight sm:text-5xl">
            Fotografias autorais para transformar suas paredes em{" "}
            <span className="font-bold text-emerald-400">vida.</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal atraso={150}>
          <a
            href="#mais-vendidos"
            className="rounded-sm px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-400 hover:text-neutral-900"
          >
            Explorar as obras
          </a>
        </ScrollReveal>
      </div>

      <ScrollReveal atraso={300}>
        <div className="relative border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 py-6 sm:grid-cols-4 sm:px-8">
            {estatisticas.map((e) => (
              <div key={e.label}>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                  {e.label}
                </p>
                <p className="mt-1 text-sm text-white sm:text-base">
                  {e.valorDestaque && (
                    <span className="font-bold text-emerald-400">{e.valorDestaque} </span>
                  )}
                  {e.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
