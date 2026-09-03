import PaginaInstitucional from "@/components/PaginaInstitucional";

export const metadata = { title: "Política de Privacidade | Filipe Lara Fotografia" };

export default function PoliticaPrivacidade() {
  return (
    <PaginaInstitucional titulo="Política de Privacidade">
      <p>
        A sua privacidade é importante para nós. Esta página explica, de forma simples, como
        tratamos os seus dados ao utilizar nossa loja.
      </p>
      <h2 className="text-lg font-semibold text-neutral-900">Quais dados coletamos</h2>
      <p>
        Coletamos apenas os dados necessários para processar seu pedido: nome, e-mail, endereço
        de entrega e informações de pagamento (processadas diretamente pelo Mercado Pago, sem
        que tenhamos acesso aos dados do seu cartão).
      </p>
      <h2 className="text-lg font-semibold text-neutral-900">Como usamos seus dados</h2>
      <p>
        Utilizamos seus dados exclusivamente para processar e entregar seu pedido, além de
        enviar comunicações relacionadas à sua compra (confirmação, rastreio, etc.).
      </p>
      <h2 className="text-lg font-semibold text-neutral-900">Compartilhamento</h2>
      <p>
        Compartilhamos os dados de entrega apenas com o fornecedor responsável pela produção e
        envio do seu quadro, e com a transportadora contratada.
      </p>
      <p>Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing.</p>
    </PaginaInstitucional>
  );
}
