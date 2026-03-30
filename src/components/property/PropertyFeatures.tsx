import {
  Waves,
  Dumbbell,
  Car,
  ShieldCheck,
  Wifi,
  AirVent,
  Trees,
  ChefHat,
  Tv,
  Refrigerator,
  WashingMachine,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AMENITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  pool: Waves,
  gym: Dumbbell,
  parking: Car,
  security: ShieldCheck,
  wifi: Wifi,
  "air conditioning": AirVent,
  garden: Trees,
  kitchen: ChefHat,
  tv: Tv,
  refrigerator: Refrigerator,
  "washing machine": WashingMachine,
  balcony: Sun,
};

function getAmenityIcon(amenity: string): React.ComponentType<{ className?: string }> {
  const key = amenity.toLowerCase();
  for (const [k, Icon] of Object.entries(AMENITY_ICONS)) {
    if (key.includes(k)) return Icon;
  }
  return ShieldCheck;
}

interface PropertyFeaturesProps {
  amenities: string[];
}

export default function PropertyFeatures({ amenities }: PropertyFeaturesProps) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {amenities.map((amenity) => {
        const Icon = getAmenityIcon(amenity);
        return (
          <div
            key={amenity}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-cream border border-gray-100"
            )}
          >
            <Icon className="w-5 h-5 text-brand-gold flex-shrink-0" />
            <span className="text-sm text-brand-dark font-medium capitalize">
              {amenity}
            </span>
          </div>
        );
      })}
    </div>
  );
}
