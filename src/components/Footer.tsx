const colunas = [
  {
    titulo: "Sobre a Filipe Lara",
    links: ["Quem Somos", "Fale Conosco", "Política de Privacidade", "Blog"],
  },
  {
    titulo: "Sobre o Produto",
    links: ["Material e Qualidade", "Quadros Personalizados", "Troca e Devolução", "Política de Entrega"],
  },
  {
    titulo: "Ajuda",
    links: ["Rastreio do Pedido", "Como Pendurar seu Quadro", "Perguntas Frequentes"],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h4 className="text-xl font-bold tracking-widest text-neutral-900">FILIPE LARA</h4>
          <p className="mt-3 text-sm text-neutral-600">
            Fotografias autorais impressas em tela canvas de alta qualidade.
          </p>
        </div>
        {colunas.map((coluna) => (
          <div key={coluna.titulo}>
            <h5 className="text-sm font-semibold uppercase text-neutral-900">{coluna.titulo}</h5>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              {coluna.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-neutral-900">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-neutral-200 px-4 py-6 text-center text-xs text-neutral-500 lg:px-8">
        Copyright Filipe Lara Fotografia — {new Date().getFullYear()}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
