"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "@/components/search/PropertyCard";
import FilterPanel from "@/components/search/FilterPanel";
import SortDropdown from "@/components/search/SortDropdown";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

const ITEMS_PER_PAGE = 9;

const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    title_en: "Luxury Oceanview Condo at Patong Beach",
    title_th: "คอนโดวิวทะเลหรู ปาตอง บีช",
    title_zh: "芭东海滩海景豪华公寓",
    description_en:
      "Stunning 2-bedroom condo with panoramic Andaman Sea views in the heart of Patong, Phuket.",
    description_th: null,
    description_zh: null,
    property_type: "condo",
    listing_type: "sale",
    status: "active",
    price: 12500000,
    price_per_sqm: 147059,
    currency: "THB",
    bedrooms: 2,
    bathrooms: 2,
    area_sqm: 85,
    land_sqm: null,
    floor_number: 8,
    total_floors: 20,
    year_built: 2022,
    latitude: 7.8909,
    longitude: 98.2953,
    location_id: "phuket",
    agent_id: null,
    address_en: "Patong Beach, Phuket",
    address_th: "หาดป่าตอง ภูเก็ต",
    is_featured: true,
    is_new_project: false,
    project_name: "The Andaman Residences",
    amenities: ["Pool", "Gym", "Parking", "Sea View"],
    images: [],
    thumbnail_url:
      "https://images.unsplash.com/photo-1582407947092-ff88a23b3eed?w=800&q=80",
    source_url: null,
    source_site: null,
    created_at: "2026-01-15T10:00:00Z",
    updated_at: "2026-03-01T10:00:00Z",
  },
  {
    id: "2",
    title_en: "Modern Pool Villa in Rawai",
    title_th: "วิลล่าสระว่ายน้ำ รวาย ภูเก็ต",
    title_zh: "拉威现代泳池别墅",
    description_en:
      "Elegant 3-bedroom pool villa with lush tropical gardens in the quiet Rawai area.",
    description_th: null,
    description_zh: null,
    property_type: "villa",
    listing_type: "sale",
    status: "active",
    price: 18900000,
    price_per_sqm: 94500,
    currency: "THB",
    bedrooms: 3,
    bathrooms: 3,
    area_sqm: 200,
    land_sqm: 400,
    floor_number: null,
    total_floors: 1,
    year_built: 2021,
    latitude: 7.7824,
    longitude: 98.3252,
    location_id: "phuket",
    agent_id: null,
    address_en: "Rawai, Phuket",
    address_th: "รวาย ภูเก็ต",
    is_featured: true,
    is_new_project: false,
    project_name: null,
    amenities: ["Private Pool", "Garden", "Parking", "Maid's Quarter"],
    images: [],
    thumbnail_url:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    source_url: null,
    source_site: null,
    created_at: "2026-01-20T10:00:00Z",
    updated_at: "2026-03-05T10:00:00Z",
  },
  {
    id: "3",
    title_en: "High-Rise Condo in Sukhumvit 11",
    title_th: "คอนโดไฮไรซ์ สุขุมวิท 11",
    title_zh: "素坤逸11高层公寓",
    description_en:
      "Stylish 1-bedroom condo on the 22nd floor with Bangkok city views. Steps from BTS Asok.",
    description_th: null,
    description_zh: null,
    property_type: "condo",
    listing_type: "sale",
    status: "active",
    price: 7800000,
    price_per_sqm: 156000,
    currency: "THB",
    bedrooms: 1,
    bathrooms: 1,
    area_sqm: 50,
    land_sqm: null,
    floor_number: 22,
    total_floors: 35,
    year_built: 2023,
    latitude: 13.7439,
    longitude: 100.5601,
    location_id: "bangkok",
    agent_id: null,
    address_en: "Sukhumvit Soi 11, Bangkok",
    address_th: "สุขุมวิท ซอย 11 กรุงเทพฯ",
    is_featured: false,
    is_new_project: true,
    project_name: "Rhythm Sukhumvit 11",
    amenities: ["Pool", "Gym", "Co-working", "Rooftop"],
    images: [],
    thumbnail_url:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    source_url: null,
    source_site: null,
    created_at: "2026-02-01T10:00:00Z",
    updated_at: "2026-03-10T10:00:00Z",
  },
  {
    id: "4",
    title_en: "Beachfront Condo for Rent – Jomtien",
    title_th: "คอนโดติดหาด ให้เช่า จอมเทียน",
    title_zh: "芭提雅宗天海滨公寓出租",
    description_en:
      "Fully furnished 2-bedroom beachfront condo in Jomtien, Pattaya. Perfect for long stay.",
    description_th: null,
    description_zh: null,
    property_type: "condo",
    listing_type: "rent",
    status: "active",
    price: 35000,
    price_per_sqm: null,
    currency: "THB",
    bedrooms: 2,
    bathrooms: 2,
    area_sqm: 75,
    land_sqm: null,
    floor_number: 5,
    total_floors: 12,
    year_built: 2019,
    latitude: 12.8882,
    longitude: 100.8824,
    location_id: "pattaya",
    agent_id: null,
    address_en: "Jomtien Beach Road, Pattaya",
    address_th: "ถนนหาดจอมเทียน พัทยา",
    is_featured: false,
    is_new_project: false,
    project_name: "Jomtien Beach Residence",
    amenities: ["Pool", "Beach Access", "Parking", "Security"],
    images: [],
    thumbnail_url:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    source_url: null,
    source_site: null,
    created_at: "2026-01-28T10:00:00Z",
    updated_at: "2026-02-20T10:00:00Z",
  },
  {
    id: "5",
    title_en: "Hilltop Sea View Villa, Koh Samui",
    title_th: "วิลล่าวิวทะเล บนเนินเขา เกาะสมุย",
    title_zh: "苏梅岛山顶海景别墅",
    description_en:
      "Spectacular 4-bedroom villa perched on a hillside with 270° sea views over the Gulf of Thailand.",
    description_th: null,
    description_zh: null,
    property_type: "villa",
    listing_type: "sale",
    status: "active",
    price: 45000000,
    price_per_sqm: 112500,
    currency: "THB",
    bedrooms: 4,
    bathrooms: 4,
    area_sqm: 400,
    land_sqm: 1200,
    floor_number: null,
    total_floors: 2,
    year_built: 2020,
    latitude: 9.5652,
    longitude: 100.0601,
    location_id: "koh-samui",
    agent_id: null,
    address_en: "Chaweng Noi, Koh Samui",
    address_th: "เฉวงน้อย เกาะสมุย",
    is_featured: true,
    is_new_project: false,
    project_name: null,
    amenities: ["Infinity Pool", "Home Theater", "Sea View", "Staff Quarters"],
    images: [],
    thumbnail_url:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    source_url: null,
    source_site: null,
    created_at: "2026-01-10T10:00:00Z",
    updated_at: "2026-02-28T10:00:00Z",
  },
  {
    id: "6",
    title_en: "Single House in Nimman Road, Chiang Mai",
    title_th: "บ้านเดี่ยว ถนนนิมมานเหมินท์ เชียงใหม่",
    title_zh: "清迈尼曼路独栋别墅",
    description_en:
      "Charming 3-bedroom Thai-Lanna style house near Nimman Road, walking distance to restaurants and cafes.",
    description_th: null,
    description_zh: null,
    property_type: "house",
    listing_type: "sale",
    status: "active",
    price: 6500000,
    price_per_sqm: 43333,
    currency: "THB",
    bedrooms: 3,
    bathrooms: 2,
    area_sqm: 150,
    land_sqm: 250,
    floor_number: null,
    total_floors: 2,
    year_built: 2018,
    latitude: 18.8018,
    longitude: 98.9668,
    location_id: "chiang-mai",
    agent_id: null,
    address_en: "Nimman Road, Chiang Mai",
    address_th: "ถนนนิมมานเหมินท์ เชียงใหม่",
    is_featured: false,
    is_new_project: false,
    project_name: null,
    amenities: ["Garden", "Parking", "Sala"],
    images: [],
    thumbnail_url:
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80",
    source_url: null,
    source_site: null,
    created_at: "2026-02-05T10:00:00Z",
    updated_at: "2026-03-08T10:00:00Z",
  },
  {
    id: "7",
    title_en: "Seaview Condo Studio for Rent – Hua Hin",
    title_th: "คอนโดสตูดิโอวิวทะเล ให้เช่า หัวหิน",
    title_zh: "华欣海景单间公寓出租",
    description_en: "Cosy studio condo with partial sea view on Hua Hin beach road. Fully furnished.",
    description_th: null,
    description_zh: null,
    property_type: "condo",
    listing_type: "rent",
    status: "active",
    price: 18000,
    price_per_sqm: null,
    currency: "THB",
    bedrooms: 0,
    bathrooms: 1,
    area_sqm: 32,
    land_sqm: null,
    floor_number: 4,
    total_floors: 8,
    year_built: 2017,
    latitude: 12.5778,
    longitude: 99.9577,
    location_id: "hua-hin",
    agent_id: null,
    address_en: "Hua Hin Beach Road, Hua Hin",
    address_th: "ถนนชายทะเล หัวหิน",
    is_featured: false,
    is_new_project: false,
    project_name: "Baan Hua Hin",
    amenities: ["Pool", "Beach Access", "Parking"],
    images: [],
    thumbnail_url:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    source_url: null,
    source_site: null,
    created_at: "2026-02-10T10:00:00Z",
    updated_at: "2026-03-01T10:00:00Z",
  },
  {
    id: "8",
    title_en: "New Launch Condo – Thonglor BTS",
    title_th: "คอนโดเปิดใหม่ ทองหล่อ BTS",
    title_zh: "通罗BTS新盘公寓",
    description_en:
      "Brand-new 2-bedroom condo in the trendy Thonglor district. Walking distance to BTS Thong Lo.",
    description_th: null,
    description_zh: null,
    property_type: "condo",
    listing_type: "sale",
    status: "active",
    price: 16500000,
    price_per_sqm: 188571,
    currency: "THB",
    bedrooms: 2,
    bathrooms: 2,
    area_sqm: 87.5,
    land_sqm: null,
    floor_number: 15,
    total_floors: 30,
    year_built: 2026,
    latitude: 13.7295,
    longitude: 100.5845,
    location_id: "bangkok",
    agent_id: null,
    address_en: "Thonglor, Bangkok",
    address_th: "ทองหล่อ กรุงเทพฯ",
    is_featured: true,
    is_new_project: true,
    project_name: "Noble Ploenchit",
    amenities: ["Sky Pool", "Co-working", "Gym", "EV Charger"],
    images: [],
    thumbnail_url:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    source_url: null,
    source_site: null,
    created_at: "2026-03-01T10:00:00Z",
    updated_at: "2026-03-20T10:00:00Z",
  },
  {
    id: "9",
    title_en: "Townhouse Near Central Festival Pattaya",
    title_th: "ทาวน์เฮาส์ ใกล้เซ็นทรัลเฟสติวัล พัทยา",
    title_zh: "芭提雅中央节庆附近联排别墅",
    description_en:
      "3-bedroom townhouse in a gated compound, 5 minutes to Central Festival Pattaya Beach.",
    description_th: null,
    description_zh: null,
    property_type: "townhouse",
    listing_type: "sale",
    status: "active",
    price: 4200000,
    price_per_sqm: 30000,
    currency: "THB",
    bedrooms: 3,
    bathrooms: 2,
    area_sqm: 140,
    land_sqm: 60,
    floor_number: null,
    total_floors: 3,
    year_built: 2016,
    latitude: 12.9297,
    longitude: 100.8754,
    location_id: "pattaya",
    agent_id: null,
    address_en: "North Pattaya, Pattaya",
    address_th: "พัทยาเหนือ พัทยา",
    is_featured: false,
    is_new_project: false,
    project_name: "The Scenery",
    amenities: ["Communal Pool", "Clubhouse", "24h Security"],
    images: [],
    thumbnail_url:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    source_url: null,
    source_site: null,
    created_at: "2026-01-25T10:00:00Z",
    updated_at: "2026-02-15T10:00:00Z",
  },
  {
    id: "10",
    title_en: "Land for Sale – Chalong, Phuket",
    title_th: "ที่ดินขาย ฉลอง ภูเก็ต",
    title_zh: "普吉岛差龙土地出售",
    description_en:
      "Prime land plot of 800 sq.m. in Chalong with mountain views. Ready to build your dream villa.",
    description_th: null,
    description_zh: null,
    property_type: "land",
    listing_type: "sale",
    status: "active",
    price: 9600000,
    price_per_sqm: 12000,
    currency: "THB",
    bedrooms: null,
    bathrooms: null,
    area_sqm: null,
    land_sqm: 800,
    floor_number: null,
    total_floors: null,
    year_built: null,
    latitude: 7.8355,
    longitude: 98.3491,
    location_id: "phuket",
    agent_id: null,
    address_en: "Chalong, Phuket",
    address_th: "ฉลอง ภูเก็ต",
    is_featured: false,
    is_new_project: false,
    project_name: null,
    amenities: [],
    images: [],
    thumbnail_url:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    source_url: null,
    source_site: null,
    created_at: "2026-02-18T10:00:00Z",
    updated_at: "2026-03-05T10:00:00Z",
  },
  {
    id: "11",
    title_en: "Luxury Penthouse – Silom Road, Bangkok",
    title_th: "เพนท์เฮาส์หรู ถนนสีลม กรุงเทพฯ",
    title_zh: "曼谷是隆路豪华顶层公寓",
    description_en:
      "Exclusive duplex penthouse on the 40th floor with wrap-around Bangkok skyline views. Private rooftop terrace.",
    description_th: null,
    description_zh: null,
    property_type: "condo",
    listing_type: "sale",
    status: "active",
    price: 58000000,
    price_per_sqm: 290000,
    currency: "THB",
    bedrooms: 3,
    bathrooms: 3,
    area_sqm: 200,
    land_sqm: null,
    floor_number: 40,
    total_floors: 41,
    year_built: 2024,
    latitude: 13.7234,
    longitude: 100.5257,
    location_id: "bangkok",
    agent_id: null,
    address_en: "Silom Road, Bangkok",
    address_th: "ถนนสีลม กรุงเทพฯ",
    is_featured: true,
    is_new_project: false,
    project_name: "Magnolias Waterfront Residences",
    amenities: ["Private Rooftop", "Butler Service", "Concierge", "Spa"],
    images: [],
    thumbnail_url:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    source_url: null,
    source_site: null,
    created_at: "2026-01-05T10:00:00Z",
    updated_at: "2026-03-15T10:00:00Z",
  },
  {
    id: "12",
    title_en: "Long-Term Rental Villa – Bang Tao Beach, Phuket",
    title_th: "วิลล่าให้เช่าระยะยาว บางเทา ภูเก็ต",
    title_zh: "普吉岛邦涛海滩长租别墅",
    description_en:
      "Beautifully furnished 4-bedroom pool villa in the prestigious Laguna area, Bang Tao Beach.",
    description_th: null,
    description_zh: null,
    property_type: "villa",
    listing_type: "rent",
    status: "active",
    price: 120000,
    price_per_sqm: null,
    currency: "THB",
    bedrooms: 4,
    bathrooms: 4,
    area_sqm: 380,
    land_sqm: 800,
    floor_number: null,
    total_floors: 2,
    year_built: 2019,
    latitude: 8.0068,
    longitude: 98.2981,
    location_id: "phuket",
    agent_id: null,
    address_en: "Bang Tao Beach, Phuket",
    address_th: "หาดบางเทา ภูเก็ต",
    is_featured: true,
    is_new_project: false,
    project_name: null,
    amenities: ["Private Pool", "Chef's Kitchen", "Beach Access", "Staff"],
    images: [],
    thumbnail_url:
      "https://images.unsplash.com/photo-1540541338537-1220059b5cbb?w=800&q=80",
    source_url: null,
    source_site: null,
    created_at: "2026-02-22T10:00:00Z",
    updated_at: "2026-03-18T10:00:00Z",
  },
];

function applyFilters(
  properties: Property[],
  searchParams: URLSearchParams
): Property[] {
  let result = [...properties];

  const location = searchParams.get("location");
  if (location) {
    result = result.filter((p) => p.location_id === location);
  }

  const types = searchParams.get("types");
  if (types) {
    const typeList = types.split(",");
    result = result.filter((p) => typeList.includes(p.property_type));
  }

  const listing = searchParams.get("listing");
  if (listing) {
    result = result.filter((p) => p.listing_type === listing);
  }

  const minPrice = searchParams.get("minPrice");
  if (minPrice) {
    result = result.filter((p) => p.price >= Number(minPrice));
  }

  const maxPrice = searchParams.get("maxPrice");
  if (maxPrice) {
    result = result.filter((p) => p.price <= Number(maxPrice));
  }

  const bedrooms = searchParams.get("bedrooms");
  if (bedrooms) {
    const n = Number(bedrooms);
    result = result.filter(
      (p) => p.bedrooms != null && (n >= 5 ? p.bedrooms >= 5 : p.bedrooms === n)
    );
  }

  const bathrooms = searchParams.get("bathrooms");
  if (bathrooms) {
    const n = Number(bathrooms);
    result = result.filter(
      (p) =>
        p.bathrooms != null &&
        (n >= 5 ? p.bathrooms >= 5 : p.bathrooms === n)
    );
  }

  const minArea = searchParams.get("minArea");
  if (minArea) {
    result = result.filter(
      (p) => p.area_sqm != null && p.area_sqm >= Number(minArea)
    );
  }

  const maxArea = searchParams.get("maxArea");
  if (maxArea) {
    result = result.filter(
      (p) => p.area_sqm != null && p.area_sqm <= Number(maxArea)
    );
  }

  const sort = searchParams.get("sort") ?? "relevant";
  if (sort === "newest") {
    result.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } else if (sort === "price_asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    result.sort((a, b) => b.price - a.price);
  } else {
    // relevant: featured first, then newest
    result.sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }

  return result;
}

export default function SearchPage() {
  const t = useTranslations("search");
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const currentPage = Number(searchParams.get("page") ?? "1");

  const filtered = applyFilters(MOCK_PROPERTIES, searchParams);
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const paginatedPage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (paginatedPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  function buildPageUrl(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `?${params.toString()}`;
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Mobile filter backdrop */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        />
      )}

      {/* Mobile filter drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl overflow-y-auto transition-transform duration-300 lg:hidden",
          mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-heading font-bold text-brand-dark text-lg">
            {t("filters")}
          </h2>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-brand-dark" />
          </button>
        </div>
        <div className="p-5">
          <FilterPanel />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-brand-dark mb-1">
            {t("title")}
          </h1>
          <p className="text-brand-slate text-sm">
            {t("resultsCount", { count: totalCount })}
          </p>
        </div>

        {/* Top bar: mobile filter toggle + sort */}
        <div className="flex items-center justify-between mb-6 gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-brand-dark hover:border-brand-dark transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t("filters")}
          </button>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:block text-sm text-brand-slate">
              {t("sort")}:
            </span>
            <SortDropdown />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-heading font-bold text-brand-dark text-lg mb-6">
                {t("filters")}
              </h2>
              <FilterPanel />
            </div>
          </aside>

          {/* Results grid */}
          <div className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <SlidersHorizontal className="w-7 h-7 text-gray-400" />
                </div>
                <p className="text-xl font-heading font-semibold text-brand-dark mb-2">
                  No properties found
                </p>
                <p className="text-brand-slate text-sm">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginated.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <a
                  href={paginatedPage > 1 ? buildPageUrl(paginatedPage - 1) : "#"}
                  aria-disabled={paginatedPage <= 1}
                  className={cn(
                    "p-2.5 rounded-xl border transition-colors",
                    paginatedPage <= 1
                      ? "border-gray-100 text-gray-300 pointer-events-none"
                      : "border-gray-200 text-brand-dark hover:border-brand-dark bg-white"
                  )}
                >
                  <ChevronLeft className="w-4 h-4" />
                </a>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <a
                      key={page}
                      href={buildPageUrl(page)}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium border transition-colors",
                        page === paginatedPage
                          ? "bg-brand-dark text-white border-brand-dark"
                          : "bg-white text-brand-dark border-gray-200 hover:border-brand-dark"
                      )}
                    >
                      {page}
                    </a>
                  )
                )}

                <a
                  href={
                    paginatedPage < totalPages
                      ? buildPageUrl(paginatedPage + 1)
                      : "#"
                  }
                  aria-disabled={paginatedPage >= totalPages}
                  className={cn(
                    "p-2.5 rounded-xl border transition-colors",
                    paginatedPage >= totalPages
                      ? "border-gray-100 text-gray-300 pointer-events-none"
                      : "border-gray-200 text-brand-dark hover:border-brand-dark bg-white"
                  )}
                >
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
