import { z } from "zod";
import {
  getSupabaseServerConfig,
  getSupabaseServerHeaders,
  hasAdminApiSession,
} from "@/lib/server/contact-backend";

export const runtime = "nodejs";

const emailSchema = z.object({
  email: z.string().trim().email().max(254),
});

export async function GET() {
  if (!(await hasAdminApiSession())) {
    return Response.json({ error: "Sessão administrativa necessária." }, { status: 401 });
  }

  const config = getSupabaseServerConfig();
  if (!config) {
    return Response.json({ error: "O armazenamento seguro do e-mail não está configurado." }, { status: 503 });
  }

  try {
    const query = new URLSearchParams({
      key: "eq.contact_recipient_email",
      select: "value",
      limit: "1",
    });
    const response = await fetch(`${config.url}/rest/v1/app_settings?${query}`, {
      headers: getSupabaseServerHeaders(config.serviceRoleKey),
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json({ error: "Não foi possível carregar o e-mail de destino." }, { status: 502 });
    }

    const rows = (await response.json()) as { value: string }[];
    return Response.json({ email: rows[0]?.value || "" });
  } catch {
    return Response.json({ error: "Não foi possível carregar o e-mail de destino." }, { status: 502 });
  }
}

export async function PUT(request: Request) {
  if (!(await hasAdminApiSession())) {
    return Response.json({ error: "Sessão administrativa necessária." }, { status: 401 });
  }

  const config = getSupabaseServerConfig();
  if (!config) {
    return Response.json({ error: "O armazenamento seguro do e-mail não está configurado." }, { status: 503 });
  }

  let parsed;
  try {
    parsed = emailSchema.safeParse(await request.json());
  } catch {
    return Response.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }

  if (!parsed.success) {
    return Response.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${config.url}/rest/v1/app_settings?on_conflict=key`,
      {
        method: "POST",
        headers: {
          ...getSupabaseServerHeaders(config.serviceRoleKey),
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify({
          key: "contact_recipient_email",
          value: parsed.data.email,
          updated_at: new Date().toISOString(),
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return Response.json({ error: "Não foi possível salvar o e-mail de destino." }, { status: 502 });
    }

    return Response.json({ ok: true, email: parsed.data.email });
  } catch {
    return Response.json({ error: "Não foi possível salvar o e-mail de destino." }, { status: 502 });
  }
}