import type { PropertyType, ListingType } from "@/types/property";

export const REGIONS = [
  { slug: "bangkok", name_en: "Bangkok", name_th: "กรุงเทพมหานคร", name_zh: "曼谷", lat: 13.7563, lng: 100.5018 },
  { slug: "phuket", name_en: "Phuket", name_th: "ภูเก็ต", name_zh: "普吉岛", lat: 7.8804, lng: 98.3923 },
  { slug: "pattaya", name_en: "Pattaya", name_th: "พัทยา", name_zh: "芭提雅", lat: 12.9236, lng: 100.8825 },
  { slug: "koh-samui", name_en: "Koh Samui", name_th: "เกาะสมุย", name_zh: "苏梅岛", lat: 9.5120, lng: 100.0136 },
  { slug: "chiang-mai", name_en: "Chiang Mai", name_th: "เชียงใหม่", name_zh: "清迈", lat: 18.7883, lng: 98.9853 },
  { slug: "hua-hin", name_en: "Hua Hin", name_th: "หัวหิน", name_zh: "华欣", lat: 12.5684, lng: 99.9577 },
] as const;

export const PROPERTY_TYPES: { value: PropertyType; label_en: string; label_th: string; label_zh: string; icon: string }[] = [
  { value: "condo", label_en: "Condominium", label_th: "คอนโดมิเนียม", label_zh: "公寓", icon: "Building2" },
  { value: "house", label_en: "House", label_th: "บ้านเดี่ยว", label_zh: "独栋别墅", icon: "Home" },
  { value: "villa", label_en: "Villa", label_th: "วิลล่า", label_zh: "别墅", icon: "Castle" },
  { value: "townhouse", label_en: "Townhouse", label_th: "ทาวน์เฮาส์", label_zh: "联排别墅", icon: "Hotel" },
  { value: "land", label_en: "Land", label_th: "ที่ดิน", label_zh: "土地", icon: "Mountain" },
  { value: "commercial", label_en: "Commercial", label_th: "อาคารพาณิชย์", label_zh: "商业地产", icon: "Store" },
];

export const LISTING_TYPES: { value: ListingType; label_en: string; label_th: string; label_zh: string }[] = [
  { value: "sale", label_en: "For Sale", label_th: "ขาย", label_zh: "出售" },
  { value: "rent", label_en: "For Rent", label_th: "เช่า", label_zh: "出租" },
];

export const PRICE_RANGES = {
  sale: [
    { min: 0, max: 3000000, label: "Under 3M" },
    { min: 3000000, max: 5000000, label: "3M - 5M" },
    { min: 5000000, max: 10000000, label: "5M - 10M" },
    { min: 10000000, max: 30000000, label: "10M - 30M" },
    { min: 30000000, max: 50000000, label: "30M - 50M" },
    { min: 50000000, max: Infinity, label: "Over 50M" },
  ],
  rent: [
    { min: 0, max: 15000, label: "Under 15K" },
    { min: 15000, max: 30000, label: "15K - 30K" },
    { min: 30000, max: 50000, label: "30K - 50K" },
    { min: 50000, max: 100000, label: "50K - 100K" },
    { min: 100000, max: Infinity, label: "Over 100K" },
  ],
};

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5] as const;
export const BATHROOM_OPTIONS = [1, 2, 3, 4, 5] as const;

export const MAPBOX_STYLE = "mapbox://styles/mapbox/light-v11";
export const DEFAULT_MAP_CENTER = { lat: 13.7563, lng: 100.5018 }; // Bangkok
export const DEFAULT_MAP_ZOOM = 6;

export function formatPrice(price: number, currency = "THB"): string {
  if (currency === "THB") {
    if (price >= 1000000) {
      return `฿${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`;
    }
    if (price >= 1000) {
      return `฿${(price / 1000).toFixed(0)}K`;
    }
    return `฿${price.toLocaleString()}`;
  }
  return `${price.toLocaleString()} ${currency}`;
}

export function formatPriceRent(price: number): string {
  return `฿${price.toLocaleString()}/mo`;
}
