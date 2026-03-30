-- Property Thailand - Initial Schema
-- Supabase PostgreSQL with PostGIS

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Enum types
CREATE TYPE property_type AS ENUM ('condo', 'house', 'villa', 'townhouse', 'land', 'commercial');
CREATE TYPE listing_type AS ENUM ('sale', 'rent');
CREATE TYPE property_status AS ENUM ('active', 'sold', 'rented', 'pending');

-- Locations (regions/areas)
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en TEXT NOT NULL,
    name_th TEXT NOT NULL,
    name_zh TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    region TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    property_count INTEGER DEFAULT 0, -- Set once in seed script
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agents / Developers
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    email TEXT,
    avatar_url TEXT,
    bio_en TEXT,
    bio_th TEXT,
    bio_zh TEXT,
    listing_count INTEGER DEFAULT 0, -- Set once in seed script
    is_developer BOOLEAN DEFAULT FALSE,
    website TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Properties (main listing table)
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_th TEXT NOT NULL,
    title_zh TEXT,
    description_en TEXT,
    description_th TEXT,
    description_zh TEXT,
    property_type property_type NOT NULL,
    listing_type listing_type NOT NULL,
    status property_status DEFAULT 'active',
    price BIGINT NOT NULL, -- Price in whole THB (e.g. 3500000 = 3.5M baht, NOT satang)
    price_per_sqm BIGINT,
    currency TEXT DEFAULT 'THB',
    bedrooms INTEGER,
    bathrooms INTEGER,
    area_sqm DOUBLE PRECISION,
    land_sqm DOUBLE PRECISION,
    floor_number INTEGER,
    total_floors INTEGER,
    year_built INTEGER,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    location_id UUID REFERENCES locations(id),
    agent_id UUID REFERENCES agents(id),
    address_en TEXT,
    address_th TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_new_project BOOLEAN DEFAULT FALSE,
    project_name TEXT,
    amenities TEXT[],
    images TEXT[] NOT NULL,
    thumbnail_url TEXT,
    source_url TEXT,
    source_site TEXT,
    scraped_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for search performance
CREATE INDEX idx_properties_listing_type ON properties(listing_type);
CREATE INDEX idx_properties_property_type ON properties(property_type);
CREATE INDEX idx_properties_location ON properties(location_id);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_bedrooms ON properties(bedrooms);
CREATE INDEX idx_properties_featured ON properties(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_geo ON properties USING GIST (
    ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
);

-- Row Level Security (public read, no write from client)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Public read locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Public read agents" ON agents FOR SELECT USING (true);
