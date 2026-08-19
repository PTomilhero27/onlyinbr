import { ServiceSection } from "@/components/shared/service-section";
import { services } from "@/data/services";

export function ServiceMarmitas() {
  const service = services.find((s) => s.id === "marmitas")!;

  return (
    <ServiceSection
      service={service}
      imageSrc="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80"
      imageAlt="Marmitas organizadas para evento — Only in BR"
      imagePosition="right"
      dark={false}
    />
  );
}
