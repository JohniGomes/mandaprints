import { Product, Collection, ProductVariants } from "./types";

export const collections: Collection[] = [
  {
    slug: "indonesia",
    nome: "Indonésia",
    descricao: "Paisagens e texturas inspiradas nas ilhas e templos da Indonésia.",
    capa: "/images/indonesia/DJI_0128.jpg",
  },
  {
    slug: "islandia",
    nome: "Islândia",
    descricao: "Fiordes, geleiras e céus nórdicos em fotografia de autor.",
    capa: "/images/islandia/FLP01977.jpg",
  },
  {
    slug: "nyc",
    nome: "Nova York",
    descricao: "O skyline e as ruas de Nova York em preto e branco e cor.",
    capa: "/images/nyc/FLP04607.jpg",
  },
];

const variantesPadrao: ProductVariants = {
  tamanhos: [
    { id: "40x60", label: "40x60 cm" },
    { id: "50x75", label: "50x75 cm", priceDelta: 80 },
    { id: "60x90", label: "60x90 cm", priceDelta: 180 },
    { id: "80x120", label: "80x120 cm", priceDelta: 320 },
  ],
  molduras: [
    { id: "sem-moldura", label: "Sem moldura" },
    { id: "preta", label: "Moldura Preta", priceDelta: 60 },
    { id: "branca", label: "Moldura Branca", priceDelta: 60 },
    { id: "madeira-clara", label: "Moldura Madeira Clara", priceDelta: 75 },
    { id: "madeira-escura", label: "Moldura Madeira Escura", priceDelta: 75 },
    { id: "dourada", label: "Moldura Dourada", priceDelta: 90 },
  ],
  acabamentos: [
    { id: "sem-vidro", label: "Sem vidro (tela canvas)" },
    { id: "com-vidro", label: "Com vidro", priceDelta: 45 },
  ],
};

function gerarProdutosColecao(
  colecaoSlug: string,
  colecaoNome: string,
  arquivos: string[],
  nomes: string[],
  precoInicial: number
): Product[] {
  return arquivos.map((arquivo, i) => ({
    slug: `${colecaoSlug}-${i + 1}`,
    nome: `Quadro Decorativo ${nomes[i] ?? `${colecaoNome} ${i + 1}`}`,
    colecao: colecaoSlug,
    referencia: `FL-${colecaoSlug.slice(0, 3).toUpperCase()}${String(i + 1).padStart(2, "0")}`,
    precoBase: precoInicial + i * 15,
    imagens: [`/images/${colecaoSlug}/${arquivo}`],
    descricao:
      `Peça da coleção ${colecaoNome}, impressa em tecido canvas de alta gramatura. ` +
      `Disponível em diversos tamanhos, molduras e acabamentos.`,
    variantes: variantesPadrao,
  }));
}

// Nomes de arquivo reais entregues pelo cliente (pasta "SELEÇÃO MENSAL" do Drive).
const arquivosIndonesia = [
  "DJI_0128.jpg",
  "DJI_0297.jpg",
  "DJI_0698.jpg",
  "FLP00547.jpg",
  "FLP01088.jpg",
  "FLP01223.jpg",
  "FLP01360.jpg",
  "FLP01644.jpg",
  "FLP02148.jpg",
  "FLP02946.jpg",
  "FLP03035.jpg",
];

const arquivosIslandia = [
  "DJI_20260318105321_0023_D.jpg",
  "DJI_20260318132544_0048_D.jpg",
  "FLP00304-Aprimorado-NR.jpg",
  "FLP00531-Aprimorado-NR.jpg",
  "FLP01977.jpg",
  "FLP02103.jpg",
  "FLP02340.jpg",
  "FLP03147.jpg",
  "FLP03436.jpg",
  "FLP03842.jpg",
  "FLP04319.jpg",
  "FLP09181.jpg",
  "FLP09395.jpg",
  "FLP09831.jpg",
];

const arquivosNyc = [
  "FLP04607.jpg",
  "FLP04641.jpg",
  "FLP04895.jpg",
  "FLP04910.jpg",
  "FLP05091.jpg",
  "FLP05397.jpg",
  "FLP05426.jpg",
  "FLP05680.jpg",
  "FLP05783.jpg",
  "FLP05962.jpg",
  "FLP05972.jpg",
  "FLP05994-2.jpg",
  "FLP06006.jpg",
  "FLP06053.jpg",
  "FLP06089.jpg",
  "FLP06246.jpg",
];

// Nomes de exibição — placeholder até o Filipe confirmar o nome de cada peça.
const nomesIndonesia = arquivosIndonesia.map((_, i) => `Indonésia ${i + 1}`);
const nomesIslandia = arquivosIslandia.map((_, i) => `Islândia ${i + 1}`);
const nomesNyc = arquivosNyc.map((_, i) => `Nova York ${i + 1}`);

export const products: Product[] = [
  ...gerarProdutosColecao("indonesia", "Indonésia", arquivosIndonesia, nomesIndonesia, 289),
  ...gerarProdutosColecao("islandia", "Islândia", arquivosIslandia, nomesIslandia, 319),
  ...gerarProdutosColecao("nyc", "Nova York", arquivosNyc, nomesNyc, 299),
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(colecaoSlug: string) {
  return products.filter((p) => p.colecao === colecaoSlug);
}

export function calcularPrecoVariante(
  produto: Product,
  tamanhoId: string,
  molduraId: string,
  acabamentoId: string
) {
  const t = produto.variantes.tamanhos.find((v) => v.id === tamanhoId);
  const m = produto.variantes.molduras.find((v) => v.id === molduraId);
  const a = produto.variantes.acabamentos.find((v) => v.id === acabamentoId);
  return (
    produto.precoBase +
    (t?.priceDelta || 0) +
    (m?.priceDelta || 0) +
    (a?.priceDelta || 0)
  );
}
