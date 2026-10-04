import { z } from "zod";
import { hasAdminApiSession } from "@/lib/server/contact-backend";
import { readContactSettings, writeContactSettings } from "@/lib/server/contact-settings";

export const runtime = "nodejs";

const contactSettingsSchema = z.object({
  whatsappNumber: z.string().trim().max(20).regex(/^\d*$/),
  displayPhone: z.string().trim().max(40),
  instagram: z.string().trim().max(200),
  botecagemInstagram: z.string().trim().max(200),
  address: z.string().trim().max(240),
  cnpj: z.string().trim().max(32),
  messages: z.record(z.string(), z.string().max(1000)),
});

export async function GET() {
  if (!(await hasAdminApiSession())) {
    return Response.json({ error: "Sessão administrativa necessária." }, { status: 401 });
  }

  try {
    const contact = await readContactSettings();
    const salesEmail = process.env.SALES_EMAIL?.trim() || "";
    const validSalesEmail = z.string().email().safeParse(salesEmail);
    return Response.json({
      contact,
      salesEmail: validSalesEmail.success ? validSalesEmail.data : "",
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Não foi possível carregar as configurações." },
      { status: 503 }
    );
  }
}

export async function PUT(request: Request) {
  if (!(await hasAdminApiSession())) {
    return Response.json({ error: "Sessão administrativa necessária." }, { status: 401 });
  }

  let parsed;
  try {
    parsed = contactSettingsSchema.safeParse(await request.json());
  } catch {
    return Response.json({ error: "Dados de contato inválidos." }, { status: 400 });
  }

  if (!parsed.success) {
    return Response.json({ error: "Confira os dados do contato e tente novamente." }, { status: 400 });
  }

  try {
    const contact = await writeContactSettings(parsed.data);
    const salesEmail = process.env.SALES_EMAIL?.trim() || "";
    const validSalesEmail = z.string().email().safeParse(salesEmail);
    return Response.json({
      ok: true,
      contact,
      salesEmail: validSalesEmail.success ? validSalesEmail.data : "",
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Não foi possível salvar as configurações." },
      { status: 503 }
    );
  }
}