import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase para uso exclusivo no servidor (rotas de API / route handlers).
 * Usa a service_role key, que ignora RLS — nunca importe este arquivo em
 * componentes client ("use client").
 */
export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env"
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
