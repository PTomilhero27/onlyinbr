import { cookies } from "next/headers";

export const ADMIN_API_SESSION_COOKIE = "onlyinbr_supabase_access_token";
const LEGACY_ADMIN_SESSION_COOKIE = "onlyinbr_admin_api_session";

export function getSupabaseServerConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;
  return { url, serviceRoleKey };
}

export function getSupabaseServerHeaders(serviceRoleKey: string) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

export function getSupabaseAuthConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const adminEmail = process.env.SUPABASE_ADMIN_EMAIL?.trim().toLowerCase();

  if (!url || !anonKey || !adminEmail) return null;
  return { url, anonKey, adminEmail };
}

export async function getAdminAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_API_SESSION_COOKIE)?.value || null;
}

export async function hasAdminApiSession() {
  const config = getSupabaseAuthConfig();
  const accessToken = await getAdminAccessToken();
  if (!config || !accessToken) return false;

  try {
    const response = await fetch(`${config.url}/auth/v1/user`, {
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) return false;

    const user = (await response.json()) as {
      email?: string;
      email_confirmed_at?: string | null;
    };

    return (
      user.email?.trim().toLowerCase() === config.adminEmail &&
      Boolean(user.email_confirmed_at)
    );
  } catch {
    return false;
  }
}

export async function clearAdminApiCookies() {
  const cookieStore = await cookies();
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/api/admin",
    maxAge: 0,
  };

  cookieStore.set(ADMIN_API_SESSION_COOKIE, "", cookieOptions);
  cookieStore.set(LEGACY_ADMIN_SESSION_COOKIE, "", cookieOptions);
}