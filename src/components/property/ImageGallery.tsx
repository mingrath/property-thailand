"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden" />
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
        <Image
          src={images[activeIndex]}
          alt={`${title} - image ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 60vw"
          priority={activeIndex === 0}
        />
        {/* Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
          {activeIndex + 1} / {images.length}
        </div>
        {/* Prev/Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button
              onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
              aria-label="Next image"
            >
              &#8250;
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all",
                i === activeIndex
                  ? "border-brand-gold opacity-100"
                  : "border-transparent opacity-60 hover:opacity-90"
              )}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
