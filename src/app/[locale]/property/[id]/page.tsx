import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  ChevronRight,
  Calendar,
  Building2,
} from "lucide-react";
import type { Property, Agent } from "@/types/property";
import { formatPrice } from "@/lib/constants";
import { getLocalizedField } from "@/lib/utils";
import ImageGallery from "@/components/property/ImageGallery";
import AgentContactCard from "@/components/property/AgentContactCard";
import PropertyFeatures from "@/components/property/PropertyFeatures";

// Mock data - will be replaced with Supabase query
const mockAgent: Agent = {
  id: "agent-001",
  name: "Somchai Pradiphat",
  company: "Phuket Premier Properties",
  phone: "+66 81 234 5678",
  email: "somchai@phuketpremier.com",
  avatar_url: null,
  bio_en:
    "With over 15 years of experience in Thailand's premium real estate market, Somchai specializes in luxury villas and condominiums in Phuket and the Andaman coast. Trusted by international investors and expats alike.",
  bio_th: null,
  bio_zh: null,
  listing_count: 24,
  is_developer: false,
  website: "https://phuketpremier.com",
};

const mockProperty: Property = {
  id: "prop-phuket-villa-001",
  title_en: "Luxury Pool Villa in Phuket",
  title_th: "วิลล่าพูลหรูในภูเก็ต",
  title_zh: "普吉岛豪华泳池别墅",
  description_en:
    "An exceptional 4-bedroom pool villa nestled in the prestigious Layan Hills Estate, offering breathtaking panoramic sea views across Layan Bay. This masterfully designed residence combines traditional Thai architecture with contemporary luxury finishes. The expansive living areas flow seamlessly onto a 12-metre infinity pool and sun terrace, creating the perfect indoor-outdoor tropical lifestyle. The lush 800 sqm landscaped garden provides complete privacy while remaining just minutes from Layan Beach and Phuket's finest dining and entertainment.",
  description_th:
    "วิลล่าพูลหรู 4 ห้องนอน ในโครงการ Layan Hills Estate ชั้นนำ พร้อมวิวทะเลพาโนรามา ออกแบบผสมผสานสถาปัตยกรรมไทยกับความหรูหราร่วมสมัย",
  description_zh: null,
  property_type: "villa",
  listing_type: "sale",
  status: "active",
  price: 25000000,
  price_per_sqm: 71429,
  currency: "THB",
  bedrooms: 4,
  bathrooms: 4,
  area_sqm: 350,
  land_sqm: 800,
  floor_number: null,
  total_floors: 2,
  year_built: 2021,
  latitude: 7.9519,
  longitude: 98.2768,
  location_id: "loc-phuket",
  agent_id: "agent-001",
  address_en: "Layan Hills Estate, Cherng Talay, Thalang, Phuket 83110",
  address_th: "เลยัน ฮิลส์ เอสเตท เชิงทะเล ถลาง ภูเก็ต 83110",
  is_featured: true,
  is_new_project: false,
  project_name: "Layan Hills Estate",
  amenities: [
    "Pool",
    "Gym",
    "Parking",
    "Security",
    "WiFi",
    "Air Conditioning",
    "Garden",
    "Kitchen",
    "TV",
    "Balcony",
  ],
  images: [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6a8b5b89?w=1200&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80",
  ],
  thumbnail_url:
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
  source_url: null,
  source_site: null,
  created_at: "2024-01-15T08:00:00Z",
  updated_at: "2024-03-01T10:30:00Z",
  agent: mockAgent,
};

const similarProperties = [
  {
    id: "sim-1",
    title: "Sea View Villa Naithon",
    price: "฿22.5M",
    beds: 3,
    baths: 3,
    sqm: 280,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80",
    location: "Naithon Beach, Phuket",
  },
  {
    id: "sim-2",
    title: "Tropical Pool Villa Rawai",
    price: "฿18M",
    beds: 3,
    baths: 3,
    sqm: 240,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    location: "Rawai, Phuket",
  },
  {
    id: "sim-3",
    title: "Modern Villa Bang Tao",
    price: "฿28M",
    beds: 4,
    baths: 5,
    sqm: 400,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    location: "Bang Tao, Phuket",
  },
];

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  await params;
  const t = useTranslations("common");
  const locale = useLocale();

  const property = mockProperty;
  const prop = property as unknown as Record<string, unknown>;
  const title = getLocalizedField(prop, "title", locale);
  const description = getLocalizedField(prop, "description", locale);
  const address = getLocalizedField(prop, "address", locale);
  const displayPrice = formatPrice(property.price);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-brand-cream border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-brand-slate">
            <Link href="/" className="hover:text-brand-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <Link
              href="/search?listing_type=sale"
              className="hover:text-brand-gold transition-colors"
            >
              {t("forSale") ?? "For Sale"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <Link
              href="/search?location=phuket"
              className="hover:text-brand-gold transition-colors"
            >
              Phuket
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-brand-dark font-medium line-clamp-1">
              {title}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Title row */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-brand-gold text-white text-xs font-medium px-3 py-1 rounded-full">
              {t("featured") ?? "Featured"}
            </span>
            <span className="bg-brand-dark/10 text-brand-dark text-xs font-medium px-3 py-1 rounded-full capitalize">
              {property.property_type}
            </span>
            <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
              For Sale
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark mb-2">
            {title}
          </h1>
          {address && (
            <div className="flex items-center gap-1.5 text-brand-slate">
              <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span className="text-sm">{address}</span>
            </div>
          )}
        </div>

        {/* Main grid: content + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Image gallery */}
            <ImageGallery images={property.images} title={title} />

            {/* Price + key stats */}
            <div className="bg-brand-cream rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-heading font-bold text-brand-dark mb-1">
                {displayPrice}
              </div>
              {property.price_per_sqm && (
                <p className="text-brand-slate text-sm mb-5">
                  ฿{property.price_per_sqm.toLocaleString()} / {t("sqm") ?? "sqm"}
                </p>
              )}

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.bedrooms != null && (
                  <div className="flex flex-col items-center gap-1.5 bg-white rounded-xl p-4 shadow-sm">
                    <Bed className="w-6 h-6 text-brand-gold" />
                    <span className="text-xl font-bold text-brand-dark">
                      {property.bedrooms}
                    </span>
                    <span className="text-xs text-brand-slate uppercase tracking-wide">
                      {t("beds") ?? "Beds"}
                    </span>
                  </div>
                )}
                {property.bathrooms != null && (
                  <div className="flex flex-col items-center gap-1.5 bg-white rounded-xl p-4 shadow-sm">
                    <Bath className="w-6 h-6 text-brand-gold" />
                    <span className="text-xl font-bold text-brand-dark">
                      {property.bathrooms}
                    </span>
                    <span className="text-xs text-brand-slate uppercase tracking-wide">
                      {t("baths") ?? "Baths"}
                    </span>
                  </div>
                )}
                {property.area_sqm != null && (
                  <div className="flex flex-col items-center gap-1.5 bg-white rounded-xl p-4 shadow-sm">
                    <Maximize className="w-6 h-6 text-brand-gold" />
                    <span className="text-xl font-bold text-brand-dark">
                      {property.area_sqm}
                    </span>
                    <span className="text-xs text-brand-slate uppercase tracking-wide">
                      {t("sqm") ?? "sqm"}
                    </span>
                  </div>
                )}
                {property.year_built != null && (
                  <div className="flex flex-col items-center gap-1.5 bg-white rounded-xl p-4 shadow-sm">
                    <Calendar className="w-6 h-6 text-brand-gold" />
                    <span className="text-xl font-bold text-brand-dark">
                      {property.year_built}
                    </span>
                    <span className="text-xs text-brand-slate uppercase tracking-wide">
                      Built
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Additional details row */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              {property.land_sqm && (
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100">
                  <Maximize className="w-5 h-5 text-brand-slate flex-shrink-0" />
                  <div>
                    <p className="text-xs text-brand-slate uppercase tracking-wide">
                      Land Size
                    </p>
                    <p className="font-semibold text-brand-dark">
                      {property.land_sqm} {t("sqm") ?? "sqm"}
                    </p>
                  </div>
                </div>
              )}
              {property.total_floors && (
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100">
                  <Building2 className="w-5 h-5 text-brand-slate flex-shrink-0" />
                  <div>
                    <p className="text-xs text-brand-slate uppercase tracking-wide">
                      Floors
                    </p>
                    <p className="font-semibold text-brand-dark">
                      {property.total_floors}
                    </p>
                  </div>
                </div>
              )}
              {property.project_name && (
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100">
                  <Building2 className="w-5 h-5 text-brand-slate flex-shrink-0" />
                  <div>
                    <p className="text-xs text-brand-slate uppercase tracking-wide">
                      Project
                    </p>
                    <p className="font-semibold text-brand-dark">
                      {property.project_name}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <section>
                <h2 className="text-xl font-heading font-bold text-brand-dark mb-4">
                  About This Property
                </h2>
                <p className="text-brand-slate leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </section>
            )}

            {/* Features & Amenities */}
            {property.amenities.length > 0 && (
              <section>
                <h2 className="text-xl font-heading font-bold text-brand-dark mb-4">
                  Features &amp; Amenities
                </h2>
                <PropertyFeatures amenities={property.amenities} />
              </section>
            )}

            {/* Location */}
            <section>
              <h2 className="text-xl font-heading font-bold text-brand-dark mb-4">
                Location
              </h2>
              {address && (
                <div className="flex items-start gap-2 text-brand-slate mb-4">
                  <MapPin className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{address}</span>
                </div>
              )}
              {/* Static map placeholder */}
              <div className="aspect-[16/7] rounded-2xl overflow-hidden bg-gray-100 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-80"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=60')",
                  }}
                />
                <div className="absolute inset-0 bg-brand-dark/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-xl px-5 py-3 shadow-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                    <span className="font-medium text-brand-dark text-sm">
                      Layan, Phuket
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right: sticky sidebar */}
          <div className="lg:col-span-1">
            {property.agent && (
              <AgentContactCard agent={property.agent} />
            )}
          </div>
        </div>

        {/* Similar Listings */}
        <section className="mt-16 pt-12 border-t border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-heading font-bold text-brand-dark">
              Similar Properties
            </h2>
            <Link
              href="/search?listing_type=sale&location=phuket&property_type=villa"
              className="text-brand-gold hover:text-brand-gold-dark font-medium transition-colors text-sm"
            >
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((item) => (
              <Link
                key={item.id}
                href={`/property/${item.id}`}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="text-xl font-bold text-brand-dark mb-1">
                    {item.price}
                  </div>
                  <h3 className="font-medium text-gray-700 mb-2 group-hover:text-brand-gold transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-brand-slate mb-3">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </div>
                  <div className="flex gap-4 text-sm text-brand-slate pt-3 border-t border-gray-50">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5" />
                      {item.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5" />
                      {item.baths}
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize className="w-3.5 h-3.5" />
                      {item.sqm} {t("sqm") ?? "sqm"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
