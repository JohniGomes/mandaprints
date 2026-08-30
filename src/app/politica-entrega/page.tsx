import PaginaInstitucional from "@/components/PaginaInstitucional";

export const metadata = { title: "Política de Entrega | Filipe Lara Fotografia" };

export default function PoliticaEntrega() {
  return (
    <PaginaInstitucional titulo="Política de Entrega">
      <p>
        Trabalhamos com transportadoras privadas para garantir que o seu quadro chegue com
        segurança, em embalagem reforçada especialmente desenvolvida para o transporte de telas.
      </p>
      <h2 className="text-lg font-semibold text-neutral-900">Prazo de produção e envio</h2>
      <p>
        Após a confirmação do pagamento, o seu quadro é produzido sob encomenda e despachado
        pelo nosso fornecedor. O prazo de entrega varia conforme a sua região e é calculado no
        carrinho a partir do seu CEP.
      </p>
      <h2 className="text-lg font-semibold text-neutral-900">Rastreio</h2>
      <p>
        Assim que o seu pedido for despachado, você receberá o código de rastreio por e-mail
        para acompanhar cada etapa da entrega.
      </p>
    </PaginaInstitucional>
  );
}
