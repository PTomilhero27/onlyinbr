import { z } from "zod";
import {
  getSupabaseServerConfig,
  getSupabaseServerHeaders,
} from "@/lib/server/contact-backend";

export const runtime = "nodejs";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(8).max(40),
  service: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(5).max(5000),
  website: z.string().max(200).optional().default(""),
});

const rateLimitWindowMs = 15 * 60 * 1000;
const maxRequestsPerWindow = 5;
const requestsByIp = new Map<string, number[]>();

function isRateLimited(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const cutoff = Date.now() - rateLimitWindowMs;
  const recentRequests = (requestsByIp.get(ip) || []).filter((time) => time > cutoff);

  if (recentRequests.length >= maxRequestsPerWindow) {
    requestsByIp.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(Date.now());
  requestsByIp.set(ip, recentRequests);
  return false;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return Response.json({ error: "Origem inválida." }, { status: 403 });
      }
    } catch {
      return Response.json({ error: "Origem inválida." }, { status: 403 });
    }
  }

  if (isRateLimited(request)) {
    return Response.json(
      { error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." },
      { status: 429 }
    );
  }

  let parsed;
  try {
    parsed = leadSchema.safeParse(await request.json());
  } catch {
    return Response.json({ error: "Não foi possível ler os dados do formulário." }, { status: 400 });
  }

  if (!parsed.success) {
    return Response.json({ error: "Confira os campos obrigatórios do formulário." }, { status: 400 });
  }

  if (parsed.data.website.trim()) {
    return Response.json({ ok: true, emailSent: true }, { status: 201 });
  }

  const config = getSupabaseServerConfig();
  if (!config) {
    return Response.json(
      { error: "O envio ainda não está configurado no servidor. Seus dados não foram enviados." },
      { status: 503 }
    );
  }

  const lead = {
    name: parsed.data.name,
    company: parsed.data.company || null,
    email: parsed.data.email,
    phone: parsed.data.phone,
    service: parsed.data.service || null,
    message: parsed.data.message,
  };

  try {
    const databaseResponse = await fetch(`${config.url}/rest/v1/contact_leads`, {
      method: "POST",
      headers: {
        ...getSupabaseServerHeaders(config.serviceRoleKey),
        Prefer: "return=minimal",
      },
      body: JSON.stringify(lead),
      cache: "no-store",
    });

    if (!databaseResponse.ok) {
      console.error("Contact lead could not be saved to Supabase:", databaseResponse.status);
      return Response.json(
        { error: "Não foi possível salvar seu briefing. Tente novamente em instantes." },
        { status: 502 }
      );
    }
  } catch {
    return Response.json(
      { error: "Não foi possível salvar seu briefing. Tente novamente em instantes." },
      { status: 502 }
    );
  }

  let recipient = "";
  try {
    const query = new URLSearchParams({
      key: "eq.contact_recipient_email",
      select: "value",
      limit: "1",
    });
    const settingsResponse = await fetch(`${config.url}/rest/v1/app_settings?${query}`, {
      headers: getSupabaseServerHeaders(config.serviceRoleKey),
      cache: "no-store",
    });

    if (settingsResponse.ok) {
      const settings = (await settingsResponse.json()) as { value: string }[];
      recipient = settings[0]?.value || "";
    }
  } catch {
    recipient = "";
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!recipient || !resendApiKey || !sender) {
    return Response.json({ ok: true, emailSent: false, reason: "email_not_configured" }, { status: 201 });
  }

  const emailFields = [
    ["Nome", lead.name],
    ["Empresa / organização", lead.company || "Não informado"],
    ["E-mail", lead.email],
    ["Telefone / WhatsApp", lead.phone],
    ["Serviço", lead.service || "Não informado"],
    ["Detalhes do projeto", lead.message],
  ];
  const html = emailFields
    .map(([label, value]) => `<p><strong>${label}:</strong><br />${escapeHtml(value || "")}</p>`)
    .join("");
  const text = emailFields.map(([label, value]) => `${label}: ${value || ""}`).join("\n\n");

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: lead.email,
        subject: `Novo briefing de evento: ${lead.name}`,
        html,
        text,
      }),
      cache: "no-store",
    });

    if (!emailResponse.ok) {
      console.error("Resend rejected contact notification:", emailResponse.status);
      return Response.json({ ok: true, emailSent: false, reason: "email_delivery_failed" }, { status: 201 });
    }
  } catch {
    return Response.json({ ok: true, emailSent: false, reason: "email_delivery_failed" }, { status: 201 });
  }

  return Response.json({ ok: true, emailSent: true }, { status: 201 });
}