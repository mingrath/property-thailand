import { useTranslations } from "next-intl";
import { Phone, Mail, Globe, MapPin } from "lucide-react";

export default async function AgentPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const t = useTranslations("agent");
  const tCommon = useTranslations("common");

  // Mock agent data - will be replaced with Supabase query
  const agent = {
    id,
    name: "Somchai Pradiphat",
    company: "Phuket Premier Properties",
    phone: "+66 81 234 5678",
    email: "somchai@phuketpremier.com",
    website: "https://phuketpremier.com",
    bio_en: "With over 15 years of experience in Thailand's premium real estate market, Somchai specializes in luxury villas and condominiums in Phuket and the Andaman coast. Trusted by international investors and expats alike.",
    avatar_url: null,
    listing_count: 24,
    is_developer: false,
  };

  return (
    <div className="min-h-screen">
      {/* Profile Header */}
      <section className="bg-gradient-to-br from-brand-light via-white to-teal-50 py-16 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-28 h-28 rounded-full bg-teal-50 border-2 border-teal-100 flex items-center justify-center flex-shrink-0">
            <span className="text-4xl font-heading font-bold text-brand-accent">
              {agent.name.charAt(0)}
            </span>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-heading font-bold text-brand-dark mb-1">
              {agent.name}
            </h1>
            <p className="text-brand-slate text-lg mb-4">{agent.company}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href={`tel:${agent.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {t("contactInfo")}
              </a>
              <a
                href={`mailto:${agent.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-brand-dark rounded-xl text-sm font-medium hover:border-brand-accent hover:text-brand-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* About */}
        <section className="mb-12">
          <h2 className="text-xl font-heading font-bold text-brand-dark mb-4">
            {t("aboutAgent")}
          </h2>
          <p className="text-brand-slate leading-relaxed">{agent.bio_en}</p>
        </section>

        {/* Contact Info */}
        <section className="mb-12 p-6 bg-brand-light rounded-2xl border border-gray-100">
          <h2 className="text-xl font-heading font-bold text-brand-dark mb-4">
            {t("contactInfo")}
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-brand-slate">
              <Phone className="w-5 h-5 text-brand-accent" />
              <span>{agent.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-brand-slate">
              <Mail className="w-5 h-5 text-brand-accent" />
              <span>{agent.email}</span>
            </div>
            {agent.website && (
              <div className="flex items-center gap-3 text-brand-slate">
                <Globe className="w-5 h-5 text-brand-accent" />
                <span>{agent.website}</span>
              </div>
            )}
          </div>
        </section>

        {/* Active Listings */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-brand-dark">
              {t("activeListings")} ({agent.listing_count})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-[16/10] bg-gray-100" />
                <div className="p-4">
                  <div className="text-lg font-bold text-brand-dark mb-1">
                    ฿{(8 + i * 3).toFixed(1)}M
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Premium {i % 2 === 0 ? "Villa" : "Condo"} in Phuket
                  </p>
                  <div className="flex gap-3 text-xs text-brand-slate">
                    <span>{i + 1} {tCommon("beds")}</span>
                    <span>{i + 1} {tCommon("baths")}</span>
                    <span>{80 + i * 40} {tCommon("sqm")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
