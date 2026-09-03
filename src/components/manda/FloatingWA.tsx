const WA = "5551989739921";
const waUrl = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const MSG_GERAL =
  "Olá! Vim pelo site e gostaria de conversar sobre as coleções de quadros do Filipe Lara.";

export default function FloatingWA() {
  return (
    <a className="fwa" href={waUrl(MSG_GERAL)} target="_blank" rel="noreferrer" aria-label="Conversar no WhatsApp">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2.5c-5.25 0-9.5 4.25-9.5 9.5 0 1.7.45 3.3 1.25 4.7L2.5 21.5l4.95-1.25c1.35.75 2.9 1.15 4.55 1.15 5.25 0 9.5-4.25 9.5-9.5S17.25 2.5 12 2.5zm4.5 13.6c-.25-.15-1.45-.7-1.65-.8-.25-.1-.4-.15-.55.15-.15.25-.65.8-.8.95-.15.2-.3.2-.55.05-.25-.15-1.05-.4-2-1.25-.75-.65-1.25-1.45-1.4-1.7-.15-.25 0-.4.1-.55.1-.1.25-.3.4-.45.1-.15.15-.25.25-.4.05-.15 0-.3-.05-.45-.05-.1-.55-1.35-.75-1.85-.2-.5-.4-.4-.55-.4h-.5c-.15 0-.4.05-.6.3-.2.25-.8.8-.8 1.95s.85 2.25 1 2.4c.1.15 1.7 2.6 4.1 3.65.55.25 1 .4 1.35.5.55.2 1.1.15 1.5.1.45-.05 1.45-.6 1.65-1.15.2-.55.2-1.05.15-1.15-.05-.1-.2-.15-.45-.3z"
          fill="currentColor"
        />
      </svg>
      <span>Conversar</span>
    </a>
  );
}
