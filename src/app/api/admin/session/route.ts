import { cookies } from "next/headers";
import {
  ADMIN_API_SESSION_COOKIE,
  clearAdminApiCookies,
  getAdminAccessToken,
  getSupabaseAuthConfig,
  hasAdminApiSession,
} from "@/lib/server/contact-backend";
import { z } from "zod";

export const runtime = "nodejs";

const passwordSchema = z.object({
  password: z.string().min(1).max(128),
});

export async function POST(request: Request) {
  const config = getSupabaseAuthConfig();
  if (!config) {
    return Response.json(
      { error: "Configure a conta administradora do Supabase em SUPABASE_ADMIN_EMAIL." },
      { status: 503 }
    );
  }

  let parsed;
  try {
    parsed = passwordSchema.safeParse(await request.json());
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }

  if (!parsed.success) {
    return Response.json({ error: "Informe a senha da conta administradora do Supabase." }, { status: 400 });
  }

  let authResponse: Response;
  try {
    const query = new URLSearchParams({ grant_type: "password" });
    authResponse = await fetch(`${config.url}/auth/v1/token?${query}`, {
      method: "POST",
      headers: {
        apikey: config.anonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: config.adminEmail, password: parsed.data.password }),
      cache: "no-store",
    });
  } catch {
    return Response.json({ error: "Não foi possível conectar ao Supabase Auth." }, { status: 502 });
  }

  if (!authResponse.ok) {
    return Response.json({ error: "Senha inválida ou conta administradora não confirmada no Supabase." }, { status: 401 });
  }

  const session = (await authResponse.json()) as {
    access_token?: string;
    expires_in?: number;
    user?: { email?: string };
  };

  if (
    !session.access_token ||
    session.user?.email?.trim().toLowerCase() !== config.adminEmail
  ) {
    return Response.json({ error: "A conta autenticada não corresponde ao administrador configurado." }, { status: 403 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_API_SESSION_COOKIE, session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/admin",
    maxAge: Math.min(session.expires_in || 3600, 60 * 60 * 8),
  });

  return Response.json({ ok: true });
}

export async function GET() {
  if (!(await hasAdminApiSession())) {
    return Response.json({ authenticated: false }, { status: 401 });
  }

  return Response.json({ authenticated: true });
}

export async function PUT(request: Request) {
  if (!(await hasAdminApiSession())) {
    return Response.json({ error: "Sessão administrativa necessária." }, { status: 401 });
  }

  const config = getSupabaseAuthConfig();
  const accessToken = await getAdminAccessToken();
  if (!config || !accessToken) {
    return Response.json({ error: "Sessão do Supabase indisponível. Entre novamente." }, { status: 401 });
  }

  let parsed;
  try {
    parsed = z.object({ password: z.string().min(8).max(128) }).safeParse(await request.json());
  } catch {
    return Response.json({ error: "Informe uma senha válida com pelo menos 8 caracteres." }, { status: 400 });
  }

  if (!parsed.success) {
    return Response.json({ error: "A nova senha precisa ter pelo menos 8 caracteres." }, { status: 400 });
  }

  try {
    const response = await fetch(`${config.url}/auth/v1/user`, {
      method: "PUT",
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: parsed.data.password }),
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json({ error: "O Supabase não conseguiu atualizar a senha." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Não foi possível atualizar a senha no Supabase." }, { status: 502 });
  }
}

export async function DELETE() {
  await clearAdminApiCookies();
  return Response.json({ ok: true });
}