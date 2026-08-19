import Image from "next/image";
import { cn } from "@/lib/utils";

export type LogoOrientation = "horizontal" | "vertical" | "completo" | "icon";
export type LogoColor = "yellow" | "green" | "blue" | "light" | "rose" | "dark";

interface LogoProps {
  className?: string;
  variant?: "default" | "white" | "dark" | "yellow" | "green" | "blue" | "light";
  orientation?: LogoOrientation;
  color?: LogoColor;
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
}

const logoMap: Record<LogoOrientation, Record<LogoColor, string>> = {
  horizontal: {
    green: "/logos/PNG/Logo Only in BR HORIZONTAL PNG 1.png",
    yellow: "/logos/PNG/Logo Only in BR HORIZONTAL PNG 2.png",
    blue: "/logos/PNG/Logo Only in BR HORIZONTAL PNG 3.png",
    light: "/logos/PNG/Logo Only in BR HORIZONTAL PNG 4.png",
    rose: "/logos/PNG/Logo Only in BR HORIZONTAL PNG 5.png",
    dark: "/logos/PNG/Logo Only in BR HORIZONTAL PNG 6.png",
  },
  vertical: {
    green: "/logos/PNG/Logo Only in BR VERTICAL PNG 1.png",
    yellow: "/logos/PNG/Logo Only in BR VERTICAL PNG 2.png",
    blue: "/logos/PNG/Logo Only in BR VERTICAL PNG 3.png",
    light: "/logos/PNG/Logo Only in BR VERTICAL PNG 4.png",
    rose: "/logos/PNG/Logo Only in BR VERTICAL PNG 5.png",
    dark: "/logos/PNG/Logo Only in BR VERTICAL PNG 6.png",
  },
  completo: {
    yellow: "/logos/PNG/Logo Only in BR COMPLETO PNG 1.png",
    green: "/logos/PNG/Logo Only in BR COMPLETO PNG 2.png",
    blue: "/logos/PNG/Logo Only in BR COMPLETO PNG 3.png",
    light: "/logos/PNG/Logo Only in BR COMPLETO PNG 4.png",
    rose: "/logos/PNG/Logo Only in BR COMPLETO PNG 3.png",
    dark: "/logos/PNG/Logo Only in BR COMPLETO PNG 1.png",
  },
  icon: {
    green: "/logos/PNG/ICONE Only in BR 1.png",
    yellow: "/logos/PNG/ICONE Only in BR 2.png",
    blue: "/logos/PNG/ICONE Only in BR 3.png",
    light: "/logos/PNG/ICONE Only in BR 4.png",
    rose: "/logos/PNG/ICONE Only in BR 5.png",
    dark: "/logos/PNG/ICONE Only in BR 6.png",
  },
};

const dimensionsMap: Record<LogoOrientation, { width: number; height: number }> = {
  horizontal: { width: 360, height: 72 },
  vertical: { width: 220, height: 130 },
  completo: { width: 200, height: 180 },
  icon: { width: 120, height: 105 },
};

const sizeClasses: Record<LogoOrientation, Record<"sm" | "md" | "lg" | "xl", string>> = {
  horizontal: {
    sm: "h-6 w-auto",
    md: "h-8 w-auto md:h-9",
    lg: "h-10 w-auto md:h-12",
    xl: "h-14 w-auto md:h-16",
  },
  vertical: {
    sm: "h-10 w-auto",
    md: "h-14 w-auto md:h-16",
    lg: "h-20 w-auto md:h-24",
    xl: "h-28 w-auto md:h-32",
  },
  completo: {
    sm: "h-10 w-auto",
    md: "h-14 w-auto md:h-16",
    lg: "h-20 w-auto md:h-24",
    xl: "h-28 w-auto md:h-32",
  },
  icon: {
    sm: "h-6 w-auto",
    md: "h-8 w-auto",
    lg: "h-12 w-auto",
    xl: "h-16 w-auto",
  },
};

/**
 * Logo — Only in BR
 * Renderiza as versões oficiais da marca a partir de public/logos/PNG/
 */
export function Logo({
  className,
  variant = "default",
  orientation = "horizontal",
  color,
  size = "md",
  priority = false,
}: LogoProps) {
  // Resolução de cor baseada em color prop ou variant compatível
  let resolvedColor: LogoColor = "yellow";

  if (color) {
    resolvedColor = color;
  } else if (variant === "white" || variant === "light") {
    resolvedColor = "light";
  } else if (variant === "dark") {
    resolvedColor = "dark";
  } else if (variant === "green") {
    resolvedColor = "green";
  } else if (variant === "blue") {
    resolvedColor = "blue";
  } else if (variant === "yellow" || variant === "default") {
    resolvedColor = "yellow";
  }

  const src = logoMap[orientation]?.[resolvedColor] ?? logoMap.horizontal.yellow;
  const { width, height } = dimensionsMap[orientation] ?? dimensionsMap.horizontal;
  const sizeClass = sizeClasses[orientation]?.[size] ?? sizeClasses.horizontal[size];

  return (
    <div className={cn("inline-flex items-center select-none", className)}>
      <Image
        src={src}
        alt="Only in BR"
        width={width}
        height={height}
        priority={priority}
        className={cn(sizeClass, "object-contain transition-transform duration-200")}
      />
    </div>
  );
}
