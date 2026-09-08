"use client";

import { useState } from "react";
import { CartItem } from "@/lib/cart-context";
import { EnderecoEntrega } from "@/lib/types";

interface Pedido {
  id: string;
  itens: CartItem[];
  frete: { nome: string; preco: number; prazo?: string } | null;
  endereco: EnderecoEntrega | null;
  total: number;
  cliente_nome: string | null;
  cliente_email: string | null;
  cliente_telefone: string | null;
  status: string;
  created_at: string;
}

function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function AdminPedidosPage() {
  const [senha, setSenha] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [enviandoId, setEnviandoId] = useState<string | null>(null);
  const [rastreios, setRastreios] = useState<Record<string, { codigo: string; transportadora: string }>>({});
  const [concluidos, setConcluidos] = useState<Set<string>>(new Set());

  async function entrar() {
    setCarregando(true);
    setErro(null);
    try {
      const resp = await fetch(`/api/admin/pedidos?senha=${encodeURIComponent(senha)}`);
      if (!resp.ok) {
        const data = await resp.json().catch(() => null);
        setErro(data?.error || "Falha ao carregar pedidos");
        return;
      }
      const data = await resp.json();
      setPedidos(data.pedidos);
      setAutenticado(true);
    } catch {
      setErro("Falha ao conectar com o servidor");
    } finally {
      setCarregando(false);
    }
  }

  function atualizarRastreio(pedidoId: string, campo: "codigo" | "transportadora", valor: string) {
    setRastreios((atual) => {
      const existente = atual[pedidoId] ?? { codigo: "", transportadora: "" };
      return { ...atual, [pedidoId]: { ...existente, [campo]: valor } };
    });
  }

  async function marcarEnviado(pedidoId: string) {
    const dados = rastreios[pedidoId];
    if (!dados?.codigo?.trim()) return;

    setEnviandoId(pedidoId);
    try {
      const resp = await fetch("/api/admin/marcar-enviado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senha,
          pedidoId,
          codigoRastreio: dados.codigo,
          transportadora: dados.transportadora,
        }),
      });
      if (resp.ok) {
        setConcluidos((atual) => new Set(atual).add(pedidoId));
      } else {
        const data = await resp.json().catch(() => null);
        alert(data?.error || "Falha ao marcar pedido como enviado");
      }
    } finally {
      setEnviandoId(null);
    }
  }

  if (!autenticado) {
    return (
      <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
        <h1 className="text-xl font-bold text-neutral-900">Painel de Pedidos</h1>
        <p className="mt-1 text-sm text-neutral-500">Acesso restrito.</p>
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && entrar()}
          className="mt-4 rounded border border-neutral-300 px-3 py-2 text-sm"
        />
        <button
          onClick={entrar}
          disabled={carregando || !senha}
          className="mt-3 rounded bg-neutral-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>
        {erro && <p className="mt-3 text-sm text-red-600">{erro}</p>}
      </div>
    );
  }

  const pendentes = pedidos.filter((p) => !concluidos.has(p.id));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-xl font-bold text-neutral-900">Pedidos aguardando envio</h1>
      <p className="mt-1 text-sm text-neutral-500">
        {pendentes.length} pedido{pendentes.length === 1 ? "" : "s"} pago{pendentes.length === 1 ? "" : "s"}{" "}
        aguardando o fornecedor despachar.
      </p>

      {pendentes.length === 0 && (
        <p className="mt-8 text-sm text-neutral-400">Nenhum pedido pendente de envio no momento.</p>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {pendentes.map((pedido) => (
          <div key={pedido.id} className="rounded-lg border border-neutral-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-neutral-900">
                  {pedido.cliente_nome || "Cliente sem nome"} —{" "}
                  {new Date(pedido.created_at).toLocaleDateString("pt-BR")}
                </p>
                <p className="text-sm text-neutral-500">
                  {pedido.cliente_email} · {pedido.cliente_telefone}
                </p>
              </div>
              <p className="font-semibold text-neutral-900">{formatarPreco(pedido.total)}</p>
            </div>

            <ul className="mt-3 list-disc pl-5 text-sm text-neutral-700">
              {pedido.itens.map((item) => (
                <li key={item.id}>
                  {item.quantidade}x {item.nome} — {item.tamanho}, {item.moldura}, {item.acabamento}
                </li>
              ))}
            </ul>

            {pedido.endereco && (
              <p className="mt-3 text-sm text-neutral-600">
                <b>Entregar em:</b> {pedido.endereco.rua}, {pedido.endereco.numero}
                {pedido.endereco.complemento ? ` — ${pedido.endereco.complemento}` : ""} —{" "}
                {pedido.endereco.bairro}, {pedido.endereco.cidade}/{pedido.endereco.uf} — CEP{" "}
                {pedido.endereco.cep}
              </p>
            )}

            {pedido.frete && (
              <p className="mt-1 text-sm text-neutral-600">
                <b>Frete escolhido:</b> {pedido.frete.nome}
                {pedido.frete.prazo ? ` (prazo estimado ${pedido.frete.prazo})` : ""}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-end gap-2 border-t border-neutral-100 pt-4">
              <div className="flex flex-col">
                <label className="text-xs text-neutral-500">Transportadora</label>
                <input
                  type="text"
                  placeholder="Ex: Correios, Jadlog..."
                  value={rastreios[pedido.id]?.transportadora ?? ""}
                  onChange={(e) => atualizarRastreio(pedido.id, "transportadora", e.target.value)}
                  className="rounded border border-neutral-300 px-2 py-1.5 text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-neutral-500">Código de rastreio</label>
                <input
                  type="text"
                  placeholder="Ex: BR123456789BR"
                  value={rastreios[pedido.id]?.codigo ?? ""}
                  onChange={(e) => atualizarRastreio(pedido.id, "codigo", e.target.value)}
                  className="rounded border border-neutral-300 px-2 py-1.5 text-sm"
                />
              </div>
              <button
                onClick={() => marcarEnviado(pedido.id)}
                disabled={enviandoId === pedido.id || !rastreios[pedido.id]?.codigo?.trim()}
                className="rounded bg-neutral-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {enviandoId === pedido.id ? "Enviando..." : "Marcar como enviado e avisar cliente"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
