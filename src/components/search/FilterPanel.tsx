"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { REGIONS, PROPERTY_TYPES, LISTING_TYPES } from "@/lib/constants";
import type { PropertyType, ListingType } from "@/types/property";

interface FilterState {
  location: string;
  propertyTypes: PropertyType[];
  listingType: ListingType | "";
  minPrice: string;
  maxPrice: string;
  bedrooms: number | null;
  bathrooms: number | null;
  minArea: string;
  maxArea: string;
}

function readFiltersFromParams(searchParams: URLSearchParams): FilterState {
  const rawTypes = searchParams.get("types");
  return {
    location: searchParams.get("location") ?? "",
    propertyTypes: rawTypes
      ? (rawTypes.split(",").filter(Boolean) as PropertyType[])
      : [],
    listingType: (searchParams.get("listing") as ListingType) || "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    bedrooms: searchParams.get("bedrooms")
      ? Number(searchParams.get("bedrooms"))
      : null,
    bathrooms: searchParams.get("bathrooms")
      ? Number(searchParams.get("bathrooms"))
      : null,
    minArea: searchParams.get("minArea") ?? "",
    maxArea: searchParams.get("maxArea") ?? "",
  };
}

interface FilterPanelProps {
  className?: string;
}

export default function FilterPanel({ className }: FilterPanelProps) {
  const t = useTranslations("search");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>(() =>
    readFiltersFromParams(searchParams)
  );

  function togglePropertyType(type: PropertyType) {
    setFilters((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type],
    }));
  }

  function handleApply() {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.location) {
      params.set("location", filters.location);
    } else {
      params.delete("location");
    }

    if (filters.propertyTypes.length > 0) {
      params.set("types", filters.propertyTypes.join(","));
    } else {
      params.delete("types");
    }

    if (filters.listingType) {
      params.set("listing", filters.listingType);
    } else {
      params.delete("listing");
    }

    if (filters.minPrice) {
      params.set("minPrice", filters.minPrice);
    } else {
      params.delete("minPrice");
    }

    if (filters.maxPrice) {
      params.set("maxPrice", filters.maxPrice);
    } else {
      params.delete("maxPrice");
    }

    if (filters.bedrooms != null) {
      params.set("bedrooms", String(filters.bedrooms));
    } else {
      params.delete("bedrooms");
    }

    if (filters.bathrooms != null) {
      params.set("bathrooms", String(filters.bathrooms));
    } else {
      params.delete("bathrooms");
    }

    if (filters.minArea) {
      params.set("minArea", filters.minArea);
    } else {
      params.delete("minArea");
    }

    if (filters.maxArea) {
      params.set("maxArea", filters.maxArea);
    } else {
      params.delete("maxArea");
    }

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleClear() {
    const cleared: FilterState = {
      location: "",
      propertyTypes: [],
      listingType: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: null,
      bathrooms: null,
      minArea: "",
      maxArea: "",
    };
    setFilters(cleared);
    const params = new URLSearchParams();
    const sort = searchParams.get("sort");
    if (sort) params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`);
  }

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-brand-dark bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold placeholder:text-gray-400";

  const bedroomOptions = [1, 2, 3, 4, 5] as const;

  return (
    <aside className={cn("space-y-6", className)}>
      {/* Location */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-2">
          {t("location")}
        </label>
        <select
          value={filters.location}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, location: e.target.value }))
          }
          className={inputClass}
        >
          <option value="">{t("allLocations")}</option>
          {REGIONS.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.name_en}
            </option>
          ))}
        </select>
      </div>

      {/* Listing type */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-2">
          {t("listingType")}
        </label>
        <div className="flex rounded-xl border border-gray-200 overflow-hidden">
          {(["", ...LISTING_TYPES.map((l) => l.value)] as const).map((val) => {
            const label =
              val === ""
                ? "All"
                : val === "sale"
                ? t("forSale")
                : t("forRent");
            return (
              <button
                key={val}
                type="button"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    listingType: val as ListingType | "",
                  }))
                }
                className={cn(
                  "flex-1 py-2 text-sm font-medium transition-colors",
                  filters.listingType === val
                    ? "bg-brand-dark text-white"
                    : "bg-white text-brand-dark hover:bg-brand-cream"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Property type */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-2">
          {t("propertyType")}
        </label>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((pt) => (
            <button
              key={pt.value}
              type="button"
              onClick={() => togglePropertyType(pt.value)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                filters.propertyTypes.includes(pt.value)
                  ? "bg-brand-dark text-white border-brand-dark"
                  : "bg-white text-brand-dark border-gray-200 hover:border-brand-dark"
              )}
            >
              {pt.label_en}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-2">
          {t("priceRange")}
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder={t("minPrice")}
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
            }
            className={inputClass}
            min={0}
          />
          <input
            type="number"
            placeholder={t("maxPrice")}
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
            }
            className={inputClass}
            min={0}
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-2">
          {t("bedrooms")}
        </label>
        <div className="flex gap-2">
          {bedroomOptions.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  bedrooms: prev.bedrooms === n ? null : n,
                }))
              }
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-medium border transition-colors",
                filters.bedrooms === n
                  ? "bg-brand-gold text-white border-brand-gold"
                  : "bg-white text-brand-dark border-gray-200 hover:border-brand-gold"
              )}
            >
              {n === 5 ? "5+" : n}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-2">
          {t("bathrooms")}
        </label>
        <div className="flex gap-2">
          {bedroomOptions.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  bathrooms: prev.bathrooms === n ? null : n,
                }))
              }
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-medium border transition-colors",
                filters.bathrooms === n
                  ? "bg-brand-gold text-white border-brand-gold"
                  : "bg-white text-brand-dark border-gray-200 hover:border-brand-gold"
              )}
            >
              {n === 5 ? "5+" : n}
            </button>
          ))}
        </div>
      </div>

      {/* Area range */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-2">
          {t("areaRange")}
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder={t("minArea")}
            value={filters.minArea}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, minArea: e.target.value }))
            }
            className={inputClass}
            min={0}
          />
          <input
            type="number"
            placeholder={t("maxArea")}
            value={filters.maxArea}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxArea: e.target.value }))
            }
            className={inputClass}
            min={0}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          type="button"
          onClick={handleApply}
          className="w-full py-3 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold text-sm transition-colors"
        >
          {t("applyFilters")}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="w-full py-3 rounded-xl border border-gray-200 hover:border-brand-dark text-brand-dark font-medium text-sm transition-colors flex items-center justify-center gap-1.5"
        >
          <X className="w-4 h-4" />
          {t("clearFilters")}
        </button>
      </div>
    </aside>
  );
}
