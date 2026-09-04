import Link from "next/link";
import { collections, getProductsByCollection } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";

export default function OldCatalog() {
  return (
    <div id="galeria" className="bg-white text-neutral-900">
      {collections.map((colecao) => {
        const produtos = getProductsByCollection(colecao.slug).slice(0, 8);
        return (
          <section
            key={colecao.slug}
            id={colecao.slug}
            className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 lg:px-8"
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
    </div>
  );
}
