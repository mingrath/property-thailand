export type PropertyType = "condo" | "house" | "villa" | "townhouse" | "land" | "commercial";
export type ListingType = "sale" | "rent";
export type PropertyStatus = "active" | "sold" | "rented" | "pending";

export interface Property {
  id: string;
  title_en: string;
  title_th: string;
  title_zh: string | null;
  description_en: string | null;
  description_th: string | null;
  description_zh: string | null;
  property_type: PropertyType;
  listing_type: ListingType;
  status: PropertyStatus;
  price: number;
  price_per_sqm: number | null;
  currency: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqm: number | null;
  land_sqm: number | null;
  floor_number: number | null;
  total_floors: number | null;
  year_built: number | null;
  latitude: number;
  longitude: number;
  location_id: string | null;
  agent_id: string | null;
  address_en: string | null;
  address_th: string | null;
  is_featured: boolean;
  is_new_project: boolean;
  project_name: string | null;
  amenities: string[];
  images: string[];
  thumbnail_url: string | null;
  source_url: string | null;
  source_site: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  location?: Location;
  agent?: Agent;
}

export interface Location {
  id: string;
  name_en: string;
  name_th: string;
  name_zh: string;
  slug: string;
  region: string;
  latitude: number | null;
  longitude: number | null;
  property_count: number;
}

export interface Agent {
  id: string;
  name: string;
  company: string | null;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  bio_en: string | null;
  bio_th: string | null;
  bio_zh: string | null;
  listing_count: number;
  is_developer: boolean;
  website: string | null;
}
