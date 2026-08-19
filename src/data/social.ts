/**
 * Dados de redes sociais — Only in BR & Parceiros
 */

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  handle?: string;
  icon: "instagram" | "facebook" | "linkedin" | "youtube" | "tiktok";
};

export const socialLinks: SocialLink[] = [
  {
    id: "instagram-onlyinbr",
    label: "Instagram @onlyinbr",
    handle: "@onlyinbr",
    href: "https://instagram.com/onlyinbr",
    icon: "instagram",
  },
  {
    id: "instagram-botecagem",
    label: "Página Parceira @botecagemsp",
    handle: "@botecagemsp",
    href: "https://instagram.com/botecagemsp",
    icon: "instagram",
  },
  {
    id: "linkedin",
    label: "LinkedIn Corporativo",
    href: "https://linkedin.com/company/onlyinbr",
    icon: "linkedin",
  },
];
