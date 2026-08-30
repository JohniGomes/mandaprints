import PaginaInstitucional from "@/components/PaginaInstitucional";

export const metadata = { title: "Dicas | Filipe Lara Fotografia" };

export default function Dicas() {
  return (
    <PaginaInstitucional titulo="Dicas">
      <h2 className="text-lg font-semibold text-neutral-900">Como escolher o tamanho ideal</h2>
      <p>
        Uma boa referência é medir a parede onde o quadro será pendurado e escolher uma peça que
        ocupe entre 2/3 e 3/4 da largura do móvel ou espaço disponível abaixo dela (como um sofá
        ou aparador).
      </p>
      <h2 className="text-lg font-semibold text-neutral-900">Como pendurar seu quadro</h2>
      <p>
        Utilize um nível para garantir que o quadro fique alinhado. Como referência, o centro do
        quadro deve ficar entre 1,45m e 1,55m do chão — a altura média dos olhos.
      </p>
      <p>
        Para quadros mais pesados, prefira buchas e parafusos adequados ao tipo de parede
        (alvenaria, drywall, etc.), em vez de apenas fita adesiva ou pregos simples.
      </p>
      <h2 className="text-lg font-semibold text-neutral-900">Combinando cores e temas</h2>
      <p>
        Quadros com tons neutros e naturais (como as coleções de paisagens) combinam com quase
        qualquer decoração. Para ambientes já com muitas cores, prefira composições mais
        discretas.
      </p>
    </PaginaInstitucional>
  );
}
