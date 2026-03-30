import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Calendar, MapPin, Building2 } from "lucide-react";

export default function ProjectsPage() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  const projects = [
    {
      name: "The Riviera Ocean Drive",
      developer: "The Riviera Group",
      location: "Pattaya",
      priceFrom: 3200000,
      units: "1-3 BR Condos",
      completion: "Q4 2027",
      status: "Under Construction",
    },
    {
      name: "Botanica Luxury Villas",
      developer: "Botanica Development",
      location: "Phuket",
      priceFrom: 18500000,
      units: "3-5 BR Villas",
      completion: "Q2 2027",
      status: "Pre-Sale",
    },
    {
      name: "One Bangkok Residences",
      developer: "TCC Assets",
      location: "Bangkok",
      priceFrom: 25000000,
      units: "2-4 BR Condos",
      completion: "Q1 2028",
      status: "Under Construction",
    },
    {
      name: "Samui Seaview Estate",
      developer: "Island Living Co.",
      location: "Koh Samui",
      priceFrom: 12000000,
      units: "2-4 BR Villas",
      completion: "Q3 2027",
      status: "Pre-Sale",
    },
    {
      name: "Skyline Sukhumvit 36",
      developer: "Noble Development",
      location: "Bangkok",
      priceFrom: 8900000,
      units: "1-3 BR Condos",
      completion: "Q4 2026",
      status: "Ready to Move",
    },
    {
      name: "Pearl of Naithon",
      developer: "Naithon Properties",
      location: "Phuket",
      priceFrom: 22000000,
      units: "3-4 BR Villas",
      completion: "Q2 2028",
      status: "Pre-Sale",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-light via-white to-teal-50 py-20 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">
            {t("projects")}
          </h1>
          <p className="text-brand-slate text-lg max-w-2xl mx-auto">
            Explore the latest development projects from Thailand&apos;s top developers
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Link
              key={i}
              href={`/search?is_new_project=true&location=${project.location.toLowerCase().replace(" ", "-")}`}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="aspect-[16/10] bg-gray-100 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 bg-white/90 text-brand-dark text-xs font-medium px-2.5 py-1 rounded-full">
                  {project.status}
                </span>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-heading font-bold text-white mb-1">
                    {project.name}
                  </h3>
                  <p className="text-white/80 text-sm">{project.developer}</p>
                </div>
              </div>

              <div className="p-5">
                <div className="text-xl font-bold text-brand-accent mb-3">
                  From ฿{(project.priceFrom / 1000000).toFixed(1)}M
                </div>

                <div className="space-y-2 text-sm text-brand-slate">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 flex-shrink-0" />
                    <span>{project.units}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>Completion: {project.completion}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
