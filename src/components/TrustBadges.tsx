function IconPix() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 3.5 3.5 8a2 2 0 0 0 0 2.83l5.5 5.5a2 2 0 0 0 2.83 0l5.5-5.5a2 2 0 0 0 0-2.83L12 3.5a2 2 0 0 0-2.83 0Z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function IconCard() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <line x1="2.5" y1="10" x2="21.5" y2="10" />
    </svg>
  );
}

function IconTruck() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="1.5" y="7" width="13" height="10" rx="1.5" />
      <path d="M14.5 10.5H18l3.5 3.5V17a1 1 0 0 1-1 1h-1.5" />
      <circle cx="6" cy="18.5" r="1.6" />
      <circle cx="17" cy="18.5" r="1.6" />
    </svg>
  );
}

function IconCanvas() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="14" rx="1.5" />
      <path d="M3 14.5 8.5 9l4 4 3-3L21 14" />
    </svg>
  );
}

const badges = [
  { icon: IconPix, titulo: "5% off no PIX", texto: "Desconto à vista pagando com PIX." },
  { icon: IconCard, titulo: "Até 12x sem juros", texto: "Parcele no cartão com tranquilidade." },
  { icon: IconTruck, titulo: "Frete seguro", texto: "Embalagem reforçada até a sua porta." },
  { icon: IconCanvas, titulo: "Tela canvas", texto: "O mesmo tecido usado em telas pintadas à mão." },
];

export default function TrustBadges() {
  return (
    <section className="border-b border-neutral-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-neutral-100 px-4 py-8 sm:grid-cols-4 sm:divide-x lg:px-8">
        {badges.map(({ icon: Icon, titulo, texto }) => (
          <div key={titulo} className="flex flex-col items-center gap-2 px-3 py-3 text-center sm:items-start sm:text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Icon />
            </span>
            <h3 className="text-sm font-semibold text-neutral-900">{titulo}</h3>
            <p className="text-xs leading-snug text-neutral-500">{texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
