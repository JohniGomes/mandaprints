import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const colunas = [
  {
    titulo: "Navegar",
    links: [
      { label: "O fotógrafo", href: "#fotografo" },
      { label: "Coleções", href: "/#mais-vendidos" },
      { label: "Quem Somos", href: "/quem-somos" },
    ],
  },
  {
    titulo: "Contato",
    links: [
      { label: "WhatsApp", href: "https://wa.me/5551989739921" },
      { label: "Fale Conosco", href: "/fale-conosco" },
    ],
  },
  {
    titulo: "Curadoria",
    links: [
      { label: "Material e Qualidade", href: "/material-qualidade" },
      { label: "Troca e Devolução", href: "/troca-devolucao" },
      { label: "Política de Entrega", href: "/politica-entrega" },
      { label: "Política de Privacidade", href: "/politica-privacidade" },
      { label: "Rastreio do Pedido", href: "/rastreio" },
      { label: "Dicas", href: "/dicas" },
      { label: "Perguntas Frequentes", href: "/faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-neutral-950 text-white">
      <ScrollReveal>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <h4 className="text-2xl font-bold tracking-wide">
              Filipe<span className="text-emerald-400">Lara</span>
            </h4>
            <p className="mt-3 text-sm text-neutral-400">
              por Filipe Lara · Coleção de quadros autorais
            </p>
          </div>
          {colunas.map((coluna) => (
            <div key={coluna.titulo}>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                {coluna.titulo}
              </h5>
              <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                {coluna.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-emerald-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-neutral-500 lg:px-8">
        <p>© {new Date().getFullYear()} — Filipe Lara Fotografia. Todos os direitos reservados.</p>
        <p className="mt-1">Todas as imagens são obra autoral · reprodução não autorizada.</p>
      </div>
    </footer>
  );
}
