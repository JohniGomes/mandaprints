import PaginaInstitucional from "@/components/PaginaInstitucional";

export const metadata = { title: "Rastreio do Pedido | Filipe Lara Fotografia" };

export default function Rastreio() {
  return (
    <PaginaInstitucional titulo="Rastreio do Pedido">
      <p>
        Assim que o seu pedido for despachado pelo nosso fornecedor, você receberá um e-mail com
        o código de rastreio e o link para acompanhar a entrega diretamente com a transportadora.
      </p>
      <p>
        Caso já tenha recebido o código e esteja com dificuldades para localizar o pedido, entre
        em contato pelo e-mail contato@filipelarafotografia.com.br informando o número do
        pedido.
      </p>
    </PaginaInstitucional>
  );
}
