import PaginaInstitucional from "@/components/PaginaInstitucional";

export const metadata = { title: "Fale Conosco | Filipe Lara Fotografia" };

export default function FaleConosco() {
  return (
    <PaginaInstitucional titulo="Fale Conosco">
      <p>
        Tem alguma dúvida sobre um produto, seu pedido ou precisa de ajuda para escolher o
        quadro ideal? Fale com a gente por um dos canais abaixo:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>E-mail:</strong> contato@filipelarafotografia.com.br
        </li>
        <li>
          <strong>WhatsApp:</strong> em breve
        </li>
        <li>
          <strong>Horário de atendimento:</strong> segunda a sexta, das 9h às 18h
        </li>
      </ul>
      <p>Respondemos o mais rápido possível, geralmente em até 1 dia útil.</p>
    </PaginaInstitucional>
  );
}
