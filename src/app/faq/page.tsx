import PaginaInstitucional from "@/components/PaginaInstitucional";

export const metadata = { title: "Perguntas Frequentes | Filipe Lara Fotografia" };

const perguntas = [
  {
    pergunta: "O quadro é pintado à mão?",
    resposta:
      "Não. As imagens são impressas em alta resolução sobre tecido canvas, o mesmo material usado em obras pintadas à mão.",
  },
  {
    pergunta: "O quadro possui vidro?",
    resposta:
      "Você pode escolher entre a versão sem vidro (moldura flutuante) ou com vidro (moldura caixa), de acordo com a sua preferência.",
  },
  {
    pergunta: "Quanto tempo leva para receber meu pedido?",
    resposta:
      "O prazo varia conforme a sua região e é exibido no carrinho a partir do seu CEP, após o cálculo do frete.",
  },
  {
    pergunta: "Posso trocar ou devolver meu quadro?",
    resposta:
      "Sim. Você tem até 7 dias corridos após o recebimento para solicitar a devolução. Veja mais detalhes na página de Troca e Devolução.",
  },
  {
    pergunta: "Quais formas de pagamento vocês aceitam?",
    resposta:
      "Aceitamos PIX (com desconto) e cartão de crédito parcelado, através do Mercado Pago.",
  },
];

export default function Faq() {
  return (
    <PaginaInstitucional titulo="Perguntas Frequentes">
      {perguntas.map((p) => (
        <div key={p.pergunta}>
          <h2 className="text-lg font-semibold text-neutral-900">{p.pergunta}</h2>
          <p>{p.resposta}</p>
        </div>
      ))}
    </PaginaInstitucional>
  );
}
