import { ServiceSection } from "@/components/shared/service-section";
import { services } from "@/data/services";

export function ServiceLicitacoes() {
  const service = services.find((s) => s.id === "licitacoes")!;

  return (
    <ServiceSection
      service={service}
      imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
      imageAlt="Reunião de planejamento de evento licitado — Only in BR"
      imagePosition="right"
      dark={false}
    />
  );
}
