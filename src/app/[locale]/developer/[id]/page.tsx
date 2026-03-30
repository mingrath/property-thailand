import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPin, Building2, Calendar, Globe } from "lucide-react";

export default async function DeveloperPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const t = useTranslations("developer");
  const tCommon = useTranslations("common");

  // Mock developer data
  const developer = {
    id,
    name: "Botanica Development",
    phone: "+66 2 123 4567",
    email: "info@botanica.co.th",
    website: "https://botanica.co.th",
    bio_en: "Botanica Development is a leading luxury property developer specializing in premium villas and residences across Southern Thailand. With a focus on sustainable architecture and tropical living, our developments blend modern design with natural beauty.",
    listing_count: 12,
    is_developer: true,
  };

  const projects = [
    {
      name: "Botanica Luxury Villas Phase 3",
      location: "Cherng Talay, Phuket",
      priceFrom: 18500000,
      units: "12 Villas",
      completion: "Q2 2027",
      status: "Pre-Sale",
    },
    {
      name: "Botanica Nature Reserve",
      location: "Nai Thon, Phuket",
      priceFrom: 25000000,
      units: "8 Villas",
      completion: "Q4 2027",
      status: "Under Construction",
    },
    {
      name: "Botanica Beachfront Residences",
      location: "Natai Beach, Phang Nga",
      priceFrom: 35000000,
      units: "6 Residences",
      completion: "Q1 2028",
      status: "Pre-Sale",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Developer Header */}
      <section className="bg-gradient-to-br from-brand-light via-white to-teal-50 py-16 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-10 h-10 text-brand-accent" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-brand-dark mb-2">
            {developer.name}
          </h1>
          <p className="text-brand-slate mb-6">Developer &bull; {developer.listing_count} Active Projects</p>
          {developer.website && (
            <a
              href={developer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              <Globe className="w-4 h-4" />
              Visit Website
            </a>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto py-12 px-4">
        {/* About */}
        <section className="mb-12">
          <h2 className="text-xl font-heading font-bold text-brand-dark mb-4">
            {t("aboutDeveloper")}
          </h2>
          <p className="text-brand-slate leading-relaxed">{developer.bio_en}</p>
        </section>

        {/* Active Projects */}
        <section>
          <h2 className="text-xl font-heading font-bold text-brand-dark mb-6">
            {t("activeProjects")}
          </h2>
          <div className="space-y-6">
            {projects.map((project, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-all"
              >
                <div className="md:w-72 aspect-[16/10] bg-gray-100 rounded-xl flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-heading font-bold text-brand-dark">
                      {project.name}
                    </h3>
                    <span className="text-xs font-medium bg-brand-light text-brand-dark border border-gray-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {project.status}
                    </span>
                  </div>
                  <div className="text-xl font-bold text-brand-gold mb-3">
                    From ฿{(project.priceFrom / 1000000).toFixed(1)}M
                  </div>
                  <div className="space-y-1.5 text-sm text-brand-slate">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0 text-brand-accent" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 flex-shrink-0 text-brand-accent" />
                      <span>{project.units}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 flex-shrink-0 text-brand-accent" />
                      <span>Completion: {project.completion}</span>
                    </div>
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
