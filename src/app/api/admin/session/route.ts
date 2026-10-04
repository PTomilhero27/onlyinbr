import { cookies } from "next/headers";
import {
  ADMIN_API_SESSION_COOKIE,
  getAdminApiSessionToken,
  isAdminApiConfigured,
  verifyAdminApiPassword,
} from "@/lib/server/contact-backend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAdminApiConfigured()) {
    return Response.json(
      { error: "A autenticação do servidor ainda não foi configurada." },
      { status: 503 }
    );
  }

  let password: unknown;
  try {
    ({ password } = await request.json());
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }

  if (typeof password !== "string" || !verifyAdminApiPassword(password)) {
    return Response.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  const token = getAdminApiSessionToken();
  if (!token) {
    return Response.json({ error: "A sessão administrativa não está configurada." }, { status: 503 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_API_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/admin",
    maxAge: 60 * 60 * 8,
  });

  return Response.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_API_SESSION_COOKIE);
  return Response.json({ ok: true });
}