import { getSupabaseServerConfig, getSupabaseServerHeaders } from "@/lib/server/contact-backend";

const SETTINGS_ID = "primary";

export async function readContactSettings() {
  const config = getSupabaseServerConfig();
  if (!config) throw new Error("SUPABASE_SERVICE_ROLE_KEY não está configurada.");

  const query = new URLSearchParams({
    id: `eq.${SETTINGS_ID}`,
    select: "settings",
    limit: "1",
  });
  const response = await fetch(`${config.url}/rest/v1/site_contact_settings?${query}`, {
    headers: getSupabaseServerHeaders(config.serviceRoleKey),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Não foi possível carregar o contato no Supabase.");

  const rows = (await response.json()) as { settings: Record<string, unknown> }[];
  return rows[0]?.settings || null;
}

export async function writeContactSettings(settings: Record<string, unknown>) {
  const config = getSupabaseServerConfig();
  if (!config) throw new Error("SUPABASE_SERVICE_ROLE_KEY não está configurada.");

  const response = await fetch(
    `${config.url}/rest/v1/site_contact_settings?on_conflict=id`,
    {
      method: "POST",
      headers: {
        ...getSupabaseServerHeaders(config.serviceRoleKey),
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify({
        id: SETTINGS_ID,
        settings,
        updated_at: new Date().toISOString(),
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error("Não foi possível salvar o contato no Supabase.");

  const rows = (await response.json()) as { settings: Record<string, unknown> }[];
  return rows[0]?.settings || settings;
}