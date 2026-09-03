import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function CtaFinal() {
  return (
    <section className="bg-neutral-50 py-20 sm:py-28">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-light leading-tight text-neutral-900 sm:text-4xl">
            Encontre a obra que conversa com{" "}
            <span className="font-bold text-emerald-600">o seu espaço.</span>
          </h2>
          <p className="mt-5 text-neutral-600">
            Explore as coleções disponíveis e fale pelo WhatsApp para consultar tamanhos,
            acabamentos, valores e disponibilidade. Atendimento humano, sem etapas
            desnecessárias.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#mais-vendidos"
              className="rounded-full bg-neutral-900 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
            >
              Ver quadros disponíveis
            </Link>
            <a
              href="https://wa.me/5551989739921?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20as%20cole%C3%A7%C3%B5es%20de%20quadros."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-neutral-300 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 transition hover:border-neutral-900"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
