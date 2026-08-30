export interface VariantOption {
  id: string;
  label: string;
  priceDelta?: number; // acréscimo/desconto sobre o preço base
}

export interface ProductVariants {
  tamanhos: VariantOption[];
  molduras: VariantOption[];
  acabamentos: VariantOption[];
}

export interface Product {
  slug: string;
  nome: string;
  colecao: string; // "indonesia" | "islandia" | "nyc"
  referencia: string;
  precoBase: number; // em reais
  imagens: string[];
  descricao: string;
  variantes: ProductVariants;
}

export interface Collection {
  slug: string;
  nome: string;
  descricao: string;
  capa: string;
}
