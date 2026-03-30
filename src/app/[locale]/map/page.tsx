"use client";

import { useTranslations } from "next-intl";
import { Map, MapPin } from "lucide-react";

export default function MapPage() {
  const t = useTranslations("map");
  const tCommon = useTranslations("common");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Map placeholder - will be replaced with Mapbox */}
      <div className="flex-1 relative bg-gray-100 min-h-[calc(100vh-4rem)]">
        {/* Map placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Map className="w-16 h-16 text-brand-slate/40 mx-auto mb-4" />
            <h2 className="text-xl font-heading font-bold text-brand-navy mb-2">
              {t("title")}
            </h2>
            <p className="text-brand-slate max-w-md mx-auto mb-6">
              Interactive map search powered by Mapbox. Connect your Mapbox token to enable.
            </p>
            <div className="inline-flex items-center gap-2 bg-brand-cream px-4 py-2 rounded-xl text-sm text-brand-slate">
              <MapPin className="w-4 h-4" />
              <span>Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local</span>
            </div>
          </div>
        </div>

        {/* Sample pins overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { name: "Bangkok", top: "45%", left: "58%" },
            { name: "Phuket", top: "75%", left: "42%" },
            { name: "Pattaya", top: "50%", left: "62%" },
            { name: "Koh Samui", top: "65%", left: "52%" },
          ].map((pin) => (
            <div
              key={pin.name}
              className="absolute"
              style={{ top: pin.top, left: pin.left }}
            >
              <div className="bg-brand-gold text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg whitespace-nowrap">
                <MapPin className="w-3 h-3 inline mr-1" />
                {pin.name}
              </div>
            </div>
          ))}
        </div>

        {/* Filter overlay */}
        <div className="absolute top-4 left-4 right-4 md:right-auto md:w-80">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <input
              type="text"
              placeholder={tCommon("searchPlaceholder")}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
            <div className="flex gap-2 mt-3">
              <button className="flex-1 px-3 py-2 text-xs font-medium bg-brand-navy text-white rounded-lg">
                {tCommon("beds")}
              </button>
              <button className="flex-1 px-3 py-2 text-xs font-medium bg-gray-100 text-brand-navy rounded-lg">
                {tCommon("price")}
              </button>
              <button className="flex-1 px-3 py-2 text-xs font-medium bg-gray-100 text-brand-navy rounded-lg">
                Type
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
