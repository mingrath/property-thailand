"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { localeNames, type Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/sale", label: t("buy") },
    { href: "/rent", label: t("rent") },
    { href: "/projects", label: t("projects") },
    { href: "/map", label: t("mapSearch") },
  ];

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm tracking-tight">PT</span>
          </div>
          <span className="font-heading font-bold text-xl text-brand-dark hidden sm:block">
            Property Thailand
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-brand-dark hover:text-brand-accent transition-colors rounded-lg hover:bg-brand-light"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Language Switcher + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-brand-dark hover:text-brand-accent transition-colors rounded-lg hover:bg-brand-light"
            >
              <Globe className="w-4 h-4" />
              <span>{localeNames[locale]}</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", langOpen && "rotate-180")} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1.5 bg-white rounded-xl shadow-lg shadow-slate-200/60 border border-slate-100 py-1.5 min-w-[130px]">
                {(Object.entries(localeNames) as [Locale, string][]).map(
                  ([loc, name]) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm transition-colors hover:bg-brand-light",
                        locale === loc
                          ? "text-brand-accent font-semibold"
                          : "text-brand-dark"
                      )}
                    >
                      {name}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-brand-dark hover:text-brand-accent transition-colors rounded-lg hover:bg-brand-light"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-brand-dark hover:text-brand-accent rounded-lg hover:bg-brand-light transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
