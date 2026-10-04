import { z } from "zod";
import nodemailer from "nodemailer";
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
  const lead = {
    name: parsed.data.name,
    company: parsed.data.company || null,
    email: parsed.data.email,
    phone: parsed.data.phone,
    service: parsed.data.service || null,
    message: parsed.data.message,
  };

  let databaseSaved = false;
  let databaseError = "database_not_configured";

  if (config) {
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

      if (databaseResponse.ok) {
        databaseSaved = true;
        databaseError = "";
      } else {
        databaseError = "database_save_failed";
        console.error("Contact lead could not be saved to Supabase:", databaseResponse.status);
      }
    } catch {
      databaseError = "database_save_failed";
    }
  }

  const recipientResult = z.string().trim().email().safeParse(process.env.SALES_EMAIL);
  const recipient = recipientResult.success ? recipientResult.data : "";

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 0);
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASS;
  const sender = process.env.SMTP_FROM_EMAIL || smtpUser;

  if (!recipient || !smtpHost || !Number.isInteger(smtpPort) || !smtpPort || !smtpUser || !smtpPassword || !sender) {
    if (databaseSaved) {
      return Response.json({ ok: true, databaseSaved, emailSent: false, reason: "email_not_configured" }, { status: 201 });
    }

    return Response.json(
      { ok: false, databaseSaved, emailSent: false, error: "Configure Supabase e SMTP no servidor para enviar o briefing." },
      { status: 503 }
    );
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

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPassword },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });

  try {
    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: lead.email,
      subject: `Novo briefing de evento: ${lead.name}`,
      html,
      text,
    });
  } catch {
    if (databaseSaved) {
      return Response.json({ ok: true, databaseSaved, emailSent: false, reason: "email_delivery_failed" }, { status: 201 });
    }

    return Response.json(
      { ok: false, databaseSaved, emailSent: false, error: "Não foi possível salvar nem enviar o briefing. Tente novamente." },
      { status: 502 }
    );
  }

  return Response.json(
    { ok: true, databaseSaved, emailSent: true, databaseError: databaseSaved ? undefined : databaseError },
    { status: 201 }
  );
}