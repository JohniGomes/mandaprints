const badges = [
  {
    titulo: "Desconto à Vista",
    texto: "Garanta 5% de desconto pagando no PIX!",
  },
  {
    titulo: "Até 12x sem juros",
    texto: "Pagamento facilitado no cartão para você decorar com tranquilidade!",
  },
  {
    titulo: "Frete Seguro",
    texto: "Embalagem reforçada para o seu quadro chegar perfeito!",
  },
  {
    titulo: "Em Tela Canvas",
    texto: "Impressos em tecido canvas, o mesmo usado em quadros pintados à mão!",
  },
];

export default function TrustBadges() {
  return (
    <section className="border-b border-neutral-100 bg-neutral-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {badges.map((b) => (
          <div key={b.titulo} className="text-center sm:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              {b.titulo}
            </h3>
            <p className="mt-1 text-sm text-neutral-600">{b.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
