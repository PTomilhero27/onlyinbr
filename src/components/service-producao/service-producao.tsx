import { ServiceSection } from "@/components/shared/service-section";
import { services } from "@/data/services";

export function ServiceProducao() {
  const service = services.find((s) => s.id === "producao")!;

  return (
    <ServiceSection
      service={service}
      imageSrc="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
      imageAlt="Produção de evento ao vivo com estrutura completa — Only in BR"
      imagePosition="left"
      dark={true}
    />
  );
}
