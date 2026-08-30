-- Execute este script no Supabase: Project > SQL Editor > New query > Run

create table if not exists pedidos (
  id uuid primary key default gen_random_uuid(),
  mercadopago_preference_id text,
  mercadopago_payment_id text,
  status text not null default 'pendente', -- pendente | aprovado | rejeitado
  itens jsonb not null,
  frete jsonb,
  total numeric(10, 2) not null,
  cliente_nome text,
  cliente_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_pedidos_preference_id on pedidos (mercadopago_preference_id);
create index if not exists idx_pedidos_payment_id on pedidos (mercadopago_payment_id);

-- Row Level Security: bloqueia acesso público direto.
-- Toda leitura/escrita passa pelas rotas de API (que usam a service_role key).
alter table pedidos enable row level security;
