import { notFound } from "next/navigation";
import { collections, getProductsByCollection } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function ColecaoPage(props: PageProps<"/colecoes/[slug]">) {
  const { slug } = await props.params;
  const colecao = collections.find((c) => c.slug === slug);
  if (!colecao) return notFound();

  const produtos = getProductsByCollection(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <ScrollReveal>
        <h1 className="text-3xl font-bold text-neutral-900">Coleção {colecao.nome}</h1>
        <p className="mt-2 max-w-2xl text-neutral-600">{colecao.descricao}</p>
      </ScrollReveal>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {produtos.map((produto, i) => (
          <ScrollReveal key={produto.slug} atraso={(i % 4) * 80}>
            <ProductCard produto={produto} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
