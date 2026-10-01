import type { Metadata } from "next";

/**
 * Layout da rota administrativa — bloqueia indexação pelo Google.
 * A rota /gestao-onlyinbr-x92k é exclusivamente interna e não deve
 * aparecer em nenhum resultado de busca.
 */
export const metadata: Metadata = {
  title: "Painel de Gestão — Only in BR",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
