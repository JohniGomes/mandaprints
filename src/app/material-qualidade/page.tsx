import PaginaInstitucional from "@/components/PaginaInstitucional";

export const metadata = { title: "Material e Qualidade | Filipe Lara Fotografia" };

export default function MaterialQualidade() {
  return (
    <PaginaInstitucional titulo="Material e Qualidade">
      <p>
        Todos os nossos quadros são impressos em <strong>tecido canvas</strong> de alta
        gramatura — o mesmo material utilizado por artistas na criação de obras pintadas à mão.
      </p>
      <p>
        Essa característica proporciona resistência, durabilidade e uma textura única, dando
        mais profundidade e realismo à imagem impressa.
      </p>
      <h2 className="text-lg font-semibold text-neutral-900">Opções de moldura</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Sem moldura:</strong> a tela é esticada sobre o chassi de madeira, com a
          própria imagem cobrindo as laterais.
        </li>
        <li>
          <strong>Com moldura:</strong> disponível em diferentes cores e acabamentos (preta,
          branca, madeira clara, madeira escura e dourada).
        </li>
      </ul>
      <h2 className="text-lg font-semibold text-neutral-900">Acabamento</h2>
      <p>
        Você pode optar por quadros com ou sem vidro de proteção, de acordo com a sua
        preferência.
      </p>
    </PaginaInstitucional>
  );
}
