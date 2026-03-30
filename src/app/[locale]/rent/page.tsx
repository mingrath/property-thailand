import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function RentPage() {
  const t = useTranslations("search");
  const tCommon = useTranslations("common");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-brand-navy py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {t("forRent")}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Find your perfect rental property in Thailand&apos;s prime locations
          </p>
        </div>
      </section>

      {/* Location Cards */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-heading font-bold text-brand-navy mb-8">
          Rent by Location
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Bangkok", count: 52, desc: "Vibrant capital with modern condos" },
            { name: "Phuket", count: 34, desc: "Island paradise with beachfront living" },
            { name: "Pattaya", count: 28, desc: "Coastal city with diverse rentals" },
            { name: "Koh Samui", count: 15, desc: "Tropical island luxury retreats" },
            { name: "Chiang Mai", count: 18, desc: "Mountain city with affordable living" },
            { name: "Hua Hin", count: 12, desc: "Royal resort town by the sea" },
          ].map((loc) => (
            <Link
              key={loc.name}
              href={`/search?listing_type=rent&location=${loc.name.toLowerCase().replace(" ", "-")}`}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-brand-gold hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-heading font-bold text-brand-navy group-hover:text-brand-gold transition-colors mb-1">
                {loc.name}
              </h3>
              <p className="text-sm text-brand-slate mb-3">{loc.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-brand-gold">{loc.count} rentals</span>
                <span className="text-brand-gold text-sm">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Rentals */}
      <section className="py-16 px-4 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-heading font-bold text-brand-navy">
              {tCommon("featured")} Rentals
            </h2>
            <Link
              href="/search?listing_type=rent"
              className="text-brand-gold hover:text-brand-gold-dark font-medium transition-colors text-sm"
            >
              {tCommon("viewAll")} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Studio Condo Thonglor", price: "฿25,000/mo", beds: 1, baths: 1, sqm: 35 },
              { title: "2BR Condo Asoke", price: "฿45,000/mo", beds: 2, baths: 2, sqm: 65 },
              { title: "Sea View Apartment Phuket", price: "฿35,000/mo", beds: 2, baths: 1, sqm: 80 },
              { title: "Penthouse Sathorn", price: "฿120,000/mo", beds: 3, baths: 3, sqm: 150 },
              { title: "Pool Villa Pattaya", price: "฿65,000/mo", beds: 3, baths: 2, sqm: 200 },
              { title: "Luxury Loft Silom", price: "฿55,000/mo", beds: 2, baths: 2, sqm: 90 },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="absolute top-3 right-3 bg-brand-gold text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {t("forRent")}
                  </span>
                </div>
                <div className="p-5">
                  <div className="text-2xl font-bold text-brand-navy mb-1">{item.price}</div>
                  <h3 className="font-medium text-gray-700 mb-3 group-hover:text-brand-gold transition-colors">
                    {item.title}
                  </h3>
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
