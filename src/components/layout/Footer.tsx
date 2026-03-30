import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PT</span>
              </div>
              <span className="font-heading font-bold text-xl">
                Property Thailand
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {t("aboutText")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/sale", label: tNav("buy") },
                { href: "/rent", label: tNav("rent") },
                { href: "/projects", label: tNav("projects") },
                { href: "/map", label: tNav("mapSearch") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-brand-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold mb-4">{t("support")}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-brand-gold text-sm transition-colors">
                  {t("contactUs")}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-brand-gold text-sm transition-colors">
                  {t("faq")}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-brand-gold text-sm transition-colors">
                  {t("termsOfService")}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-brand-gold text-sm transition-colors">
                  {t("privacyPolicy")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
          &copy; {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
