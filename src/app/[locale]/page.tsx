import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getFeaturedProperties, getLocations } from "@/lib/data";
import { formatPrice, formatPriceRent } from "@/lib/constants";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import HeroCarousel from "@/components/home/HeroCarousel";

export default function HomePage() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const featured = getFeaturedProperties(6);
  const locations = getLocations().filter((l) => l.property_count > 0).slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* Hero Section — bright carousel */}
      <HeroCarousel
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        searchPlaceholder={tCommon("searchPlaceholder")}
        searchButtonLabel={t("searchButton")}
      />

      {/* Featured Properties */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark">
            {t("featuredTitle")}
          </h2>
          <a
            href="/search?featured=true"
            className="text-brand-accent hover:text-brand-accent-light font-medium transition-colors"
          >
            {tCommon("viewAll")} &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property) => (
            <Link
              key={property.id}
              href={`/property/${property.id}`}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                {property.thumbnail_url && (
                  <img
                    src={property.thumbnail_url}
                    alt={property.title_en}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-brand-gold text-white text-sm font-medium px-3 py-1 rounded-full">
                  {tCommon("featured")}
                </span>
                <span className="absolute top-4 right-4 bg-white/90 text-brand-dark text-xs font-medium px-2.5 py-1 rounded-full">
                  {property.listing_type === "sale" ? "For Sale" : "For Rent"}
                </span>
              </div>
              <div className="p-5">
                <div className="text-2xl font-bold text-brand-dark mb-1">
                  {property.listing_type === "rent"
                    ? formatPriceRent(property.price)
                    : formatPrice(property.price)}
                </div>
                <h3 className="font-medium text-gray-700 mb-2 group-hover:text-brand-accent transition-colors line-clamp-1">
                  {property.title_en}
                </h3>
                {property.address_en && (
                  <div className="flex items-center gap-1 text-sm text-brand-slate mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="line-clamp-1">{property.address_en}</span>
                  </div>
                )}
                <div className="flex gap-4 text-sm text-gray-500 pt-3 border-t border-gray-50">
                  {property.bedrooms != null && (
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4" /> {property.bedrooms}
                    </span>
                  )}
                  {property.bathrooms != null && (
                    <span className="flex items-center gap-1">
                      <Bath className="w-4 h-4" /> {property.bathrooms}
                    </span>
                  )}
                  {property.area_sqm != null && (
                    <span className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" /> {property.area_sqm} {tCommon("sqm")}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Location Grid */}
      <section className="py-20 px-4 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark mb-12 text-center">
            {t("locationsTitle")}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: locations[0]?.name_en || "Phuket", count: locations[0]?.property_count || 0, image: "photo-1589394815804-964ed0be2eb5" },
              { name: locations[1]?.name_en || "Pattaya", count: locations[1]?.property_count || 0, image: "photo-1596422846543-75c6fc197f07" },
              { name: locations[2]?.name_en || "Koh Samui", count: locations[2]?.property_count || 0, image: "photo-1537956965359-7573183d1f57" },
              { name: locations[3]?.name_en || "Bangkok", count: locations[3]?.property_count || 0, image: "photo-1508009603885-50cf7c579365" },
            ].map((loc) => (
              <Link
                key={loc.name}
                href={`/search?location=${loc.name.toLowerCase().replace(" ", "-")}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/${loc.image}?w=600&q=80')`,
                  }}
                />
                {/* Lighter overlay than before — bottom only, 50% opacity */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-heading font-bold">{loc.name}</h3>
                  <p className="text-white/80 text-sm">{loc.count} properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-brand-dark">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: "150+", label: t("statsProperties") },
            { value: "6", label: t("statsLocations") },
            { value: "25+", label: t("statsDevelopers") },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl md:text-5xl font-heading font-bold text-brand-gold mb-2">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
