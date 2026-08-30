"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/types";
import { calcularPrecoVariante } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { MockupParede, FotoCompleta } from "./WallMockup";

function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProdutoDetalhe({ produto }: { produto: Product }) {
  const router = useRouter();
  const { adicionar } = useCart();

  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [visualizacao, setVisualizacao] = useState<"quadro" | "foto">("quadro");
  const [ampliado, setAmpliado] = useState(false);
  const [tamanhoId, setTamanhoId] = useState(produto.variantes.tamanhos[0].id);
  const [molduraId, setMolduraId] = useState(produto.variantes.molduras[0].id);
  const [acabamentoId, setAcabamentoId] = useState(produto.variantes.acabamentos[0].id);
  const [adicionado, setAdicionado] = useState(false);

  const preco = useMemo(
    () => calcularPrecoVariante(produto, tamanhoId, molduraId, acabamentoId),
    [produto, tamanhoId, molduraId, acabamentoId]
  );
  const precoPix = preco * 0.95;

  const tamanho = produto.variantes.tamanhos.find((v) => v.id === tamanhoId)!;
  const moldura = produto.variantes.molduras.find((v) => v.id === molduraId)!;
  const acabamento = produto.variantes.acabamentos.find((v) => v.id === acabamentoId)!;

  function handleAdicionarAoCarrinho() {
    adicionar({
      id: `${produto.slug}-${tamanhoId}-${molduraId}-${acabamentoId}`,
      produtoSlug: produto.slug,
      nome: produto.nome,
      imagem: produto.imagens[0],
      tamanho: tamanho.label,
      moldura: moldura.label,
      acabamento: acabamento.label,
      preco,
    });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  }

  function handleComprarAgora() {
    handleAdicionarAoCarrinho();
    router.push("/carrinho");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <nav className="mb-6 text-sm text-neutral-500">
        Início &gt; {produto.colecao} &gt; <span className="text-neutral-800">{produto.nome}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Galeria */}
        <div>
          {/* Alternar entre foto do quadro na parede e a foto completa */}
          <div className="mb-3 inline-flex rounded-full border border-neutral-300 p-1 text-sm">
            <button
              onClick={() => setVisualizacao("quadro")}
              className={`rounded-full px-4 py-1.5 font-medium transition ${
                visualizacao === "quadro"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Quadro na parede
            </button>
            <button
              onClick={() => setVisualizacao("foto")}
              className={`rounded-full px-4 py-1.5 font-medium transition ${
                visualizacao === "foto"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Foto completa
            </button>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
            <div
              className={`h-full w-full transition-transform duration-300 ${
                ampliado ? "scale-[1.8] cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setAmpliado((a) => !a)}
            >
              {visualizacao === "quadro" ? (
                <MockupParede src={produto.imagens[imagemAtiva]} alt={produto.nome} />
              ) : (
                <FotoCompleta src={produto.imagens[imagemAtiva]} alt={produto.nome} />
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setAmpliado((a) => !a);
              }}
              aria-label={ampliado ? "Afastar" : "Aproximar"}
              className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-md transition hover:bg-white"
            >
              {ampliado ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              )}
            </button>
          </div>

          <div className="mt-3 flex gap-3">
            {produto.imagens.map((img, i) => (
              <button
                key={img}
                onClick={() => setImagemAtiva(i)}
                className={`h-16 w-16 overflow-hidden rounded border ${
                  i === imagemAtiva ? "border-neutral-900" : "border-neutral-200"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${produto.nome} ${i + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100%' height='100%' fill='%23e5e5e5'/></svg>";
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info + variantes */}
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            REF: {produto.referencia}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-neutral-900">{produto.nome}</h1>

          {/* Tamanho */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-900">Tamanho</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {produto.variantes.tamanhos.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTamanhoId(opt.id)}
                  className={`rounded border px-3 py-2 text-sm ${
                    opt.id === tamanhoId
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-300 text-neutral-700 hover:border-neutral-500"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Moldura */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-900">Cor da Moldura</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {produto.variantes.molduras.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setMolduraId(opt.id)}
                  className={`rounded border px-3 py-2 text-sm ${
                    opt.id === molduraId
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-300 text-neutral-700 hover:border-neutral-500"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Acabamento / textura */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-900">Acabamento</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {produto.variantes.acabamentos.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setAcabamentoId(opt.id)}
                  className={`rounded border px-3 py-2 text-sm ${
                    opt.id === acabamentoId
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-300 text-neutral-700 hover:border-neutral-500"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preço */}
          <div className="mt-8 border-t border-neutral-200 pt-6">
            <p className="text-3xl font-bold text-neutral-900">{formatarPreco(preco)}</p>
            <p className="mt-1 text-sm text-neutral-600">
              12x de {formatarPreco(preco / 12)} ou {formatarPreco(precoPix)} à vista no PIX
              (5% de desconto)
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAdicionarAoCarrinho}
              className="flex-1 rounded-full border border-neutral-900 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
            >
              {adicionado ? "Adicionado ✓" : "Adicionar ao carrinho"}
            </button>
            <button
              onClick={handleComprarAgora}
              className="flex-1 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Comprar agora
            </button>
          </div>

          <p className="mt-8 text-sm leading-relaxed text-neutral-600">{produto.descricao}</p>
        </div>
      </div>
    </div>
  );
}
