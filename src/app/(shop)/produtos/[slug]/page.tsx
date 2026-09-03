import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/products";
import ProdutoDetalhe from "@/components/ProdutoDetalhe";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProdutoPage(props: PageProps<"/produtos/[slug]">) {
  const { slug } = await props.params;
  const produto = getProductBySlug(slug);
  if (!produto) return notFound();

  return <ProdutoDetalhe produto={produto} />;
}
