"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

/**
 * Header — Only in BR
 * Header sticky com visual leve em vidro fosco claro.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300 ease-out",
        scrolled ? "px-4 py-2.5 md:px-8" : "px-4 py-4 md:px-8"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto flex items-center justify-between",
          "rounded-2xl transition-all duration-300",
          "px-5 py-2.5",
          "liquid-glass-opaque border border-white/20 shadow-2xl"
        )}
      >
        {/* Logo */}
        <Link href="#hero" aria-label="Only in BR — Início" className="flex items-center">
          <Logo size="md" color="yellow" priority />
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold text-neutral-200",
                "hover:text-brand-yellow transition-colors duration-200",
                "relative after:absolute after:bottom-[-2px] after:left-0",
                "after:w-0 after:h-[2px] after:bg-brand-yellow",
                "after:transition-all after:duration-300",
                "hover:after:w-full"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <WhatsAppCTA context="hero" label="WhatsApp" variant="primary" size="sm" />
        </div>

        {/* Mobile: Sheet */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu de navegação"}
            className="md:hidden text-white hover:text-brand-yellow p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="w-[300px] bg-[#072312] border-l border-white/20 flex flex-col p-6 shadow-2xl backdrop-blur-3xl"
          >
            <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/15">
              <Logo size="md" color="yellow" />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Fechar menu"
                className="text-neutral-300 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav aria-label="Navegação mobile" className="flex flex-col gap-2.5 flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    "text-base font-semibold text-neutral-100",
                    "hover:text-brand-yellow hover:translate-x-1.5",
                    "transition-all duration-200 py-3 px-3",
                    "border-b border-white/10 rounded-xl hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-white/15">
              <WhatsAppCTA
                context="hero"
                label="Falar no WhatsApp"
                variant="secondary"
                size="md"
                className="w-full justify-center bg-brand-green hover:bg-brand-green-dark text-white font-bold"
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
