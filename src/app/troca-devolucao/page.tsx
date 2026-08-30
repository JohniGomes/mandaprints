import PaginaInstitucional from "@/components/PaginaInstitucional";

export const metadata = { title: "Troca e Devolução | Filipe Lara Fotografia" };

export default function TrocaDevolucao() {
  return (
    <PaginaInstitucional titulo="Troca e Devolução">
      <p>
        Conforme o Código de Defesa do Consumidor, você tem até <strong>7 dias corridos</strong>{" "}
        após o recebimento do produto para solicitar a devolução, caso se arrependa da compra.
      </p>
      <h2 className="text-lg font-semibold text-neutral-900">Produto com defeito</h2>
      <p>
        Se o seu quadro chegar com algum defeito de fabricação ou avaria no transporte, entre em
        contato conosco em até 7 dias após o recebimento, com fotos do produto e da embalagem,
        para que possamos providenciar a troca sem custo adicional.
      </p>
      <h2 className="text-lg font-semibold text-neutral-900">Como solicitar</h2>
      <p>
        Entre em contato pelo e-mail contato@filipelarafotografia.com.br informando o número do
        pedido e o motivo da solicitação. Nossa equipe irá orientar os próximos passos.
      </p>
    </PaginaInstitucional>
  );
}
