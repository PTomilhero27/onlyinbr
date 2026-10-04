import { readContactSettings } from "@/lib/server/contact-settings";

export const runtime = "nodejs";

export async function GET() {
  try {
    const contact = await readContactSettings();
    if (!contact) return Response.json({ contact: null });

    const {
      whatsappNumber,
      displayPhone,
      instagram,
      botecagemInstagram,
      address,
      cnpj,
      messages,
    } = contact;

    return Response.json({
      contact: {
        whatsappNumber,
        displayPhone,
        instagram,
        botecagemInstagram,
        address,
        cnpj,
        messages,
      },
    });
  } catch {
    return Response.json({ contact: null }, { status: 503 });
  }
}