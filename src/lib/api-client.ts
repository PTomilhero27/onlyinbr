import ky from "ky";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes("placeholder")
);

/**
 * Cliente HTTP Ky configurado especificamente para comunicação resiliente com a API REST do Supabase
 */
export const supabaseHttp = ky.create({
  prefix: SUPABASE_URL ? `${SUPABASE_URL}/rest/v1` : undefined,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  },
  timeout: 15000,
  retry: {
    limit: 2,
    methods: ["get", "post", "patch", "put", "delete"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      ({ request }) => {
        if (SUPABASE_ANON_KEY && !request.headers.get("apikey")) {
          request.headers.set("apikey", SUPABASE_ANON_KEY);
          request.headers.set("Authorization", `Bearer ${SUPABASE_ANON_KEY}`);
        }
      },
    ],
  },
});
