import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import type { Property } from "@/types/property";
import { formatPrice, formatPriceRent } from "@/lib/constants";
import { getLocalizedField } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const t = useTranslations("common");
  const locale = useLocale();

  const p = property as unknown as Record<string, unknown>;
  const title = getLocalizedField(p, "title", locale);
  const address = getLocalizedField(p, "address", locale);
  const displayPrice =
    property.listing_type === "rent"
      ? formatPriceRent(property.price)
      : formatPrice(property.price);

  const thumbnailUrl =
    property.thumbnail_url ||
    property.images?.[0] ||
    "/images/static/placeholder.jpg";

  return (
    <Link
      href={`/property/${property.id}`}
      className="group block rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Image — 4:3 aspect ratio */}
      <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Subtle gradient for badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.is_featured && (
            <span className="bg-brand-gold text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {t("featured")}
            </span>
          )}
          {property.is_new_project && (
            <span className="bg-brand-dark text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {t("new")}
            </span>
          )}
        </div>

        {/* Listing type badge — top right */}
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-brand-dark text-xs font-medium px-2.5 py-1 rounded-full">
            {property.listing_type === "sale" ? "For Sale" : "For Rent"}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-5">
        {/* Price */}
        <div className="text-2xl font-bold text-brand-dark mb-1">
          {displayPrice}
        </div>

        {/* Title */}
        <h3 className="font-medium text-gray-700 group-hover:text-brand-accent transition-colors duration-300 line-clamp-1 mb-2">
          {title}
        </h3>

        {/* Location */}
        {address && (
          <div className="flex items-center gap-1 text-sm text-brand-slate mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="line-clamp-1">{address}</span>
          </div>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-4 text-sm text-brand-slate pt-3 border-t border-gray-100">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              {property.bathrooms}
            </span>
          )}
          {property.area_sqm != null && (
            <span className="flex items-center gap-1">
              <Maximize className="w-4 h-4" />
              {property.area_sqm} {t("sqm")}
            </span>
          )}
          {property.price_per_sqm != null && (
            <span className="text-xs text-gray-400 ml-auto">
              ฿{property.price_per_sqm.toLocaleString()}/{t("sqm")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
