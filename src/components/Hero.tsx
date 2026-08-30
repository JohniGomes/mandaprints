export default function Hero() {
  return (
    <section className="relative w-full bg-neutral-900">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-center gap-4 px-4 py-20 text-white lg:px-8">
        <span className="text-sm uppercase tracking-widest text-neutral-300">
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
          className="mt-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200"
        >
          Ver coleções
        </a>
      </div>
    </section>
  );
}
