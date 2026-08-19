import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl, type WhatsAppContext } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface WhatsAppCTAProps {
  context?: WhatsAppContext;
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  showIcon?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-yellow text-neutral-950 hover:bg-brand-yellow-dark font-bold shadow-sm hover:shadow-md",
  secondary:
    "bg-brand-green text-white hover:bg-brand-green-dark font-bold shadow-sm hover:shadow-md",
  outline:
    "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white font-bold",
  ghost:
    "text-brand-green hover:text-brand-green-dark underline-offset-4 hover:underline font-semibold",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-xs sm:text-sm px-4 py-2 gap-1.5",
  md: "text-sm sm:text-base px-6 py-3 gap-2",
  lg: "text-base sm:text-lg px-8 py-3.5 gap-2.5",
};

/**
 * WhatsAppCTA — Only in BR
 *
 * Componente central de CTA para WhatsApp.
 * Todos os botões de WhatsApp do site devem usar este componente.
 * O número e as mensagens são gerenciados em src/lib/whatsapp.ts.
 */
export function WhatsAppCTA({
  context = "default",
  label = "Falar no WhatsApp",
  variant = "primary",
  size = "md",
  className,
  showIcon = true,
}: WhatsAppCTAProps) {
  const url = getWhatsAppUrl(context);

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — abre o WhatsApp`}
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-2 focus-visible:outline-brand-yellow focus-visible:outline-offset-3",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {showIcon && (
        <MessageCircle
          aria-hidden="true"
          className={cn(
            "flex-shrink-0",
            size === "sm" && "w-4 h-4",
            size === "md" && "w-5 h-5",
            size === "lg" && "w-6 h-6"
          )}
        />
      )}
      <span>{label}</span>
    </Link>
  );
}
