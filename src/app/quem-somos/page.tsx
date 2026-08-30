import PaginaInstitucional from "@/components/PaginaInstitucional";

export const metadata = { title: "Quem Somos | Filipe Lara Fotografia" };

export default function QuemSomos() {
  return (
    <PaginaInstitucional titulo="Quem Somos">
      <p>
        A Filipe Lara Fotografia nasceu da paixão por registrar lugares e momentos únicos ao
        redor do mundo e transformá-los em obras para decorar o seu ambiente.
      </p>
      <p>
        Cada quadro da nossa loja é uma fotografia autoral, impressa em tela canvas de alta
        qualidade — o mesmo tecido usado em obras pintadas à mão — garantindo durabilidade,
        textura e um acabamento à altura da imagem original.
      </p>
      <p>
        Renovamos nossas coleções a cada 3 meses, trazendo sempre novos destinos e novas
        histórias para fazer parte da decoração da sua casa ou do seu espaço de trabalho.
      </p>
    </PaginaInstitucional>
  );
}
