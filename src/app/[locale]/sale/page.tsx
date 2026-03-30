import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Building2, Home, Castle, Hotel, Mountain, Store } from "lucide-react";

export default function SalePage() {
  const t = useTranslations("search");
  const tTypes = useTranslations("propertyTypes");
  const tCommon = useTranslations("common");

  const propertyTypes = [
    { type: "condo", icon: Building2, count: 42 },
    { type: "house", icon: Home, count: 28 },
    { type: "villa", icon: Castle, count: 35 },
    { type: "townhouse", icon: Hotel, count: 12 },
    { type: "land", icon: Mountain, count: 18 },
    { type: "commercial", icon: Store, count: 8 },
  ] as const;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-light via-white to-teal-50 py-20 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">
            {t("forSale")}
          </h1>
          <p className="text-brand-slate text-lg max-w-2xl mx-auto">
            Discover premium properties for sale across Thailand&apos;s most desirable locations
          </p>
        </div>
      </section>

      {/* Property Type Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-heading font-bold text-brand-dark mb-8">
          Browse by Property Type
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {propertyTypes.map(({ type, icon: Icon, count }) => (
            <Link
              key={type}
              href={`/search?listing_type=sale&property_type=${type}`}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 hover:border-brand-accent hover:shadow-lg transition-all"
            >
              <Icon className="w-8 h-8 text-brand-slate group-hover:text-brand-accent transition-colors" />
              <span className="font-medium text-brand-dark text-sm">
                {tTypes(type)}
              </span>
              <span className="text-xs text-brand-slate">{count} listings</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured For Sale */}
      <section className="py-16 px-4 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-heading font-bold text-brand-dark">
              {tCommon("featured")} Properties for Sale
            </h2>
            <Link
              href="/search?listing_type=sale&featured=true"
              className="text-brand-accent hover:text-teal-700 font-medium transition-colors text-sm"
            >
              {tCommon("viewAll")} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Sea View Condo in Phuket", price: "฿8,500,000", beds: 2, baths: 2, sqm: 75, location: "Phuket" },
              { title: "Luxury Villa in Koh Samui", price: "฿25,000,000", beds: 4, baths: 4, sqm: 350, location: "Koh Samui" },
              { title: "Penthouse in Sukhumvit", price: "฿45,000,000", beds: 3, baths: 3, sqm: 180, location: "Bangkok" },
              { title: "Beachfront Villa Pattaya", price: "฿18,000,000", beds: 3, baths: 3, sqm: 220, location: "Pattaya" },
              { title: "Modern Condo Sathorn", price: "฿12,500,000", beds: 2, baths: 2, sqm: 85, location: "Bangkok" },
              { title: "Pool Villa Rawai", price: "฿15,900,000", beds: 3, baths: 3, sqm: 280, location: "Phuket" },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="absolute top-3 right-3 bg-white/90 text-brand-dark text-xs font-medium px-2.5 py-1 rounded-full">
                    {t("forSale")}
                  </span>
                </div>
                <div className="p-5">
                  <div className="text-2xl font-bold text-brand-dark mb-1">{item.price}</div>
                  <h3 className="font-medium text-gray-700 mb-2 group-hover:text-brand-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-slate mb-3">{item.location}</p>
                  <div className="flex gap-4 text-sm text-brand-slate pt-3 border-t border-gray-50">
                    <span>{item.beds} {tCommon("beds")}</span>
                    <span>{item.baths} {tCommon("baths")}</span>
                    <span>{item.sqm} {tCommon("sqm")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
