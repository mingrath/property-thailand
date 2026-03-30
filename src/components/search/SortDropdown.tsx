"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "relevant", labelKey: "sortRelevant" },
  { value: "newest", labelKey: "sortNewest" },
  { value: "price_asc", labelKey: "sortPriceLow" },
  { value: "price_desc", labelKey: "sortPriceHigh" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

interface SortDropdownProps {
  className?: string;
}

export default function SortDropdown({ className }: SortDropdownProps) {
  const t = useTranslations("search");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = (searchParams.get("sort") ?? "relevant") as SortValue;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <label className="sr-only">{t("sort")}</label>
      <select
        value={currentSort}
        onChange={handleChange}
        className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-brand-dark font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold cursor-pointer"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {t(opt.labelKey)}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 w-4 h-4 text-brand-dark" />
    </div>
  );
}
