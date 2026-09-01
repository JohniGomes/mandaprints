import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { collections, getProductsByCollection } from "@/lib/products";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />

      {collections.map((colecao) => {
        const produtos = getProductsByCollection(colecao.slug).slice(0, 8);
        return (
          <section
            key={colecao.slug}
            id={colecao.slug === collections[0].slug ? "mais-vendidos" : undefined}
            className="mx-auto max-w-7xl px-4 py-12 lg:px-8"
          >
            <ScrollReveal>
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">Coleção {colecao.nome}</h2>
                  <p className="mt-1 text-sm text-neutral-600">{colecao.descricao}</p>
                </div>
                <Link
                  href={`/colecoes/${colecao.slug}`}
                  className="hidden text-sm font-medium text-neutral-700 hover:text-neutral-900 sm:block"
                >
                  Ver coleção completa →
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {produtos.map((produto, i) => (
                <ScrollReveal key={produto.slug} atraso={(i % 4) * 80}>
                  <ProductCard produto={produto} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
