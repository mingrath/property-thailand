import type { Property, Agent, Location } from "@/types/property";
import scrapedData from "../../scripts/scraped-data.json";
import { REGIONS } from "./constants";

// Generate stable IDs from index
function makeId(prefix: string, index: number): string {
  return `${prefix}-${String(index).padStart(4, "0")}`;
}

// Transform scraped data into Property objects
const allProperties: Property[] = scrapedData.listings.map((raw, i) => ({
  id: makeId("prop", i),
  title_en: raw.title_en || "Untitled Property",
  title_th: raw.title_th || raw.title_en || "ทรัพย์สิน",
  title_zh: null,
  description_en: raw.description_en || null,
  description_th: raw.description_th || null,
  description_zh: null,
  property_type: (raw.property_type as Property["property_type"]) || "condo",
  listing_type: (raw.listing_type as Property["listing_type"]) || "sale",
  status: "active" as const,
  price: raw.price || 0,
  price_per_sqm: raw.area_sqm && raw.price ? Math.round(raw.price / raw.area_sqm) : null,
  currency: "THB",
  bedrooms: raw.bedrooms ?? null,
  bathrooms: raw.bathrooms ?? null,
  area_sqm: raw.area_sqm ?? null,
  land_sqm: null,
  floor_number: null,
  total_floors: null,
  year_built: null,
  latitude: getRegionCoords(raw.region).lat + (Math.random() - 0.5) * 0.1,
  longitude: getRegionCoords(raw.region).lng + (Math.random() - 0.5) * 0.1,
  location_id: raw.region || null,
  agent_id: makeId("agent", i % 15),
  address_en: raw.location || null,
  address_th: null,
  is_featured: i < 8,
  is_new_project: raw.property_type === "condo" && raw.price > 10000000,
  project_name: null,
  amenities: ["swimming-pool", "fitness", "parking", "security", "wifi"],
  images: raw.images?.length > 0 ? raw.images : ["/images/static/placeholder.jpg"],
  thumbnail_url: raw.images?.[0] || null,
  source_url: raw.source_url || null,
  source_site: raw.source_site || null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

// Generate mock agents
const AGENT_NAMES = [
  { name: "Somchai Pradiphat", company: "Phuket Premier Properties" },
  { name: "Narisa Wongsakul", company: "Bangkok Luxury Realty" },
  { name: "Thanakorn Srisuk", company: "Pattaya Elite Properties" },
  { name: "Ploy Charoensri", company: "Samui Island Homes" },
  { name: "Wichai Promphun", company: "Golden Coast Realty" },
  { name: "Kannika Thaweerat", company: "Andaman Properties" },
  { name: "Pichit Somboon", company: "Capital City Real Estate" },
  { name: "Sasithorn Wilaiporn", company: "Tropical Living Co." },
  { name: "Aroon Rattanakul", company: "Sea Breeze Properties" },
  { name: "Duangporn Chaiwat", company: "Royal Thai Estate" },
  { name: "Kittipong Supachai", company: "Prime Asia Property" },
  { name: "Mayuree Songkran", company: "Siam Luxury Homes" },
  { name: "Prasert Wongchai", company: "East Coast Realty" },
  { name: "Apinya Thongdee", company: "Thai Heritage Properties" },
  { name: "Nattapong Suwannarat", company: "Island View Estate" },
];

const allAgents: Agent[] = AGENT_NAMES.map((a, i) => ({
  id: makeId("agent", i),
  name: a.name,
  company: a.company,
  phone: `+66 ${80 + i} ${String(Math.floor(Math.random() * 900 + 100))} ${String(Math.floor(Math.random() * 9000 + 1000))}`,
  email: `${a.name.split(" ")[0].toLowerCase()}@${a.company.toLowerCase().replace(/\s+/g, "").slice(0, 12)}.com`,
  avatar_url: null,
  bio_en: `Experienced real estate professional at ${a.company} specializing in premium properties across Thailand.`,
  bio_th: `ตัวแทนอสังหาริมทรัพย์ผู้เชี่ยวชาญที่ ${a.company} เชี่ยวชาญด้านอสังหาริมทรัพย์ระดับพรีเมียมทั่วประเทศไทย`,
  bio_zh: null,
  listing_count: allProperties.filter((p) => p.agent_id === makeId("agent", i)).length,
  is_developer: i % 5 === 0,
  website: null,
}));

// Generate locations from regions
const allLocations: Location[] = REGIONS.map((r) => ({
  id: r.slug,
  name_en: r.name_en,
  name_th: r.name_th,
  name_zh: r.name_zh,
  slug: r.slug,
  region: r.slug,
  latitude: r.lat,
  longitude: r.lng,
  property_count: allProperties.filter((p) => p.location_id === r.slug).length,
}));

function getRegionCoords(region: string): { lat: number; lng: number } {
  const found = REGIONS.find((r) => r.slug === region);
  return found ? { lat: found.lat, lng: found.lng } : { lat: 13.7563, lng: 100.5018 };
}

// Query functions
export function getProperties(filters?: {
  listing_type?: string;
  property_type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  featured?: boolean;
  limit?: number;
  offset?: number;
  sort?: string;
}): { data: Property[]; total: number } {
  let filtered = [...allProperties];

  if (filters?.listing_type) {
    filtered = filtered.filter((p) => p.listing_type === filters.listing_type);
  }
  if (filters?.property_type) {
    filtered = filtered.filter((p) => p.property_type === filters.property_type);
  }
  if (filters?.location) {
    filtered = filtered.filter((p) => p.location_id === filters.location);
  }
  if (filters?.minPrice) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters?.maxPrice) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters?.bedrooms) {
    filtered = filtered.filter((p) => p.bedrooms != null && p.bedrooms >= filters.bedrooms!);
  }
  if (filters?.bathrooms) {
    filtered = filtered.filter((p) => p.bathrooms != null && p.bathrooms >= filters.bathrooms!);
  }
  if (filters?.featured) {
    filtered = filtered.filter((p) => p.is_featured);
  }

  // Sort
  if (filters?.sort === "price_asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filters?.sort === "price_desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  const total = filtered.length;
  const offset = filters?.offset || 0;
  const limit = filters?.limit || 12;
  const data = filtered.slice(offset, offset + limit);

  // Attach agent and location
  return {
    data: data.map((p) => ({
      ...p,
      agent: allAgents.find((a) => a.id === p.agent_id),
      location: allLocations.find((l) => l.id === p.location_id),
    })),
    total,
  };
}

export function getPropertyById(id: string): Property | null {
  const property = allProperties.find((p) => p.id === id);
  if (!property) return null;
  return {
    ...property,
    agent: allAgents.find((a) => a.id === property.agent_id),
    location: allLocations.find((l) => l.id === property.location_id),
  };
}

export function getAgentById(id: string): (Agent & { properties: Property[] }) | null {
  const agent = allAgents.find((a) => a.id === id);
  if (!agent) return null;
  return {
    ...agent,
    properties: allProperties.filter((p) => p.agent_id === id).slice(0, 8),
  };
}

export function getFeaturedProperties(limit = 6): Property[] {
  return getProperties({ featured: true, limit }).data;
}

export function getLocations(): Location[] {
  return allLocations;
}

export function getAllAgents(): Agent[] {
  return allAgents;
}
