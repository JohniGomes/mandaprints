import ScrollReveal from "./ScrollReveal";

export default function SobreFotografo() {
  return (
    <section id="fotografo" className="relative overflow-hidden bg-neutral-950 py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
        <ScrollReveal>
          <div className="aspect-[4/5] w-full overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/islandia/FLP03842.jpg"
              alt="Filipe Lara em campo, na Islândia"
              className="h-full w-full object-cover"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal atraso={150}>
          <span className="text-xs uppercase tracking-widest text-emerald-400">
            03 — O fotógrafo
          </span>
          <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
            Não são imagens decorativas.
            <br />
            São <span className="italic text-emerald-400">frames do mundo.</span>
          </h2>
          <p className="mt-6 text-neutral-300">
            A Filipe Lara reúne obras autorais em uma curadoria para ambientes que pedem mais do
            que decoração: pedem história, atmosfera e presença.
          </p>
          <p className="mt-4 text-neutral-300">
            Mais de 14 anos de estrada, 20+ países documentados e um olhar construído entre
            viagens, esporte, ruas e grandes histórias. Cada obra é fruto de campo, espera e
            escolha, e chega à parede como um capítulo independente.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-xs uppercase tracking-widest text-neutral-400">
            <span>3 coleções públicas</span>
            <span>41 obras catalogadas</span>
            <span>20+ países documentados</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
