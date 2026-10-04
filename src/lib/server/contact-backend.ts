import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_API_SESSION_COOKIE = "onlyinbr_admin_api_session";

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

export function isAdminApiConfigured() {
  return Boolean(process.env.ADMIN_API_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

function createAdminSessionToken() {
  const password = process.env.ADMIN_API_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) return null;

  return createHmac("sha256", secret)
    .update(`onlyinbr-admin:${password}`)
    .digest("hex");
}

export function verifyAdminApiPassword(password: string) {
  const expected = process.env.ADMIN_API_PASSWORD;
  if (!expected) return false;

  const receivedBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);
  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}

export async function hasAdminApiSession() {
  const expectedToken = createAdminSessionToken();
  if (!expectedToken) return false;

  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_API_SESSION_COOKIE)?.value;
  if (!session) return false;

  const receivedBuffer = Buffer.from(session);
  const expectedBuffer = Buffer.from(expectedToken);
  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}

export function getAdminApiSessionToken() {
  return createAdminSessionToken();
}