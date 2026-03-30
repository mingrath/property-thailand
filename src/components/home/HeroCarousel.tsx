"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    alt: "Modern luxury house with pool",
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    alt: "Luxury home exterior",
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
    alt: "Pool villa Thailand",
  },
  {
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
    alt: "Modern architecture",
  },
  {
    url: "https://images.unsplash.com/photo-1582407947092-ff88a23b3eed?w=1920&q=80",
    alt: "Tropical resort villa",
  },
];

const INTERVAL_MS = 6000;

interface HeroCarouselProps {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchButtonLabel: string;
}

export default function HeroCarousel({
  title,
  subtitle,
  searchPlaceholder,
  searchButtonLabel,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(id);
  }, [advance, isHovered]);

  return (
    <section
      className="relative h-[70vh] md:h-[85vh] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slide images — absolute-stacked with AnimatePresence for fade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={SLIDES[current].url}
            alt={SLIDES[current].alt}
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Soft bottom gradient for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none" />

      {/* Edge vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 tracking-tight"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)" }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-2xl text-white/90 mb-8 font-light"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.35)" }}
        >
          {subtitle}
        </motion.p>

        {/* Search card — glassmorphism white */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl max-w-3xl mx-auto flex flex-col md:flex-row gap-3"
        >
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="flex-1 px-5 py-4 text-base rounded-xl bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-brand-accent text-brand-dark placeholder:text-gray-400"
          />
          <button className="px-8 py-4 bg-brand-accent hover:bg-brand-accent-light text-white font-semibold rounded-xl transition-colors text-base whitespace-nowrap">
            {searchButtonLabel}
          </button>
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
