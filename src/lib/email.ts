/**
 * Envio de e-mails transacionais via Resend (https://resend.com).
 *
 * Requer a variável de ambiente RESEND_API_KEY.
 *
 * O remetente abaixo é o domínio de teste do próprio Resend
 * (onboarding@resend.dev) — funciona sem verificar domínio próprio, mas
 * o Resend só entrega para o e-mail que criou a conta (modo sandbox).
 * Assim que um domínio (ex: mandaprints.com.br) for verificado em
 * resend.com/domains, troque REMETENTE_PADRAO por algo como
 * "pedidos@mandaprints.com.br" para poder enviar para qualquer cliente.
 */

interface EnviarEmailParams {
  para: string;
  assunto: string;
  html: string;
}

const REMETENTE_PADRAO = "onboarding@resend.dev";

export async function enviarEmail({ para, assunto, html }: EnviarEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      `[email] RESEND_API_KEY não configurada — e-mail para ${para} não foi enviado (modo simulação).`
    );
    console.log(`[email simulado] Para: ${para} | Assunto: ${assunto}`);
    return { simulado: true };
  }

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: REMETENTE_PADRAO,
      to: para,
      subject: assunto,
      html,
    }),
  });

  if (!resp.ok) {
    const erro = await resp.text();
    throw new Error(`Falha ao enviar e-mail para ${para}: ${erro}`);
  }

  return { simulado: false };
}
