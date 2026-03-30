"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { localeNames, type Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PT</span>
          </div>
          <span className="font-heading font-bold text-xl text-brand-navy hidden sm:block">
            Property Thailand
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-brand-charcoal hover:text-brand-gold transition-colors rounded-lg hover:bg-gray-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-brand-charcoal hover:text-brand-gold transition-colors rounded-lg hover:bg-gray-50"
            >
              <Globe className="w-4 h-4" />
              <span>{localeNames[locale]}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[120px]">
                {(Object.entries(localeNames) as [Locale, string][]).map(
                  ([loc, name]) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        locale === loc
                          ? "text-brand-gold font-medium"
                          : "text-brand-charcoal"
                      }`}
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
            className="md:hidden p-2 text-brand-charcoal hover:text-brand-gold"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-brand-charcoal hover:text-brand-gold rounded-lg hover:bg-gray-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
