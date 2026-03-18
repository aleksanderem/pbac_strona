"use client";

import { useState } from "react";

interface GalleryItem {
  src: string;
  alt?: string;
}

interface ProductGalleryProps {
  images: GalleryItem[];
  mainImage: string;
  productName: string;
}

export default function ProductGallery({
  images,
  mainImage,
  productName,
}: ProductGalleryProps) {
  const allImages = [{ src: mainImage, alt: productName }, ...images];
  const [selected, setSelected] = useState(0);

  if (allImages.length <= 1) return null;

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main display */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={allImages[selected].src}
            alt={allImages[selected].alt || `${productName} — zdjęcie ${selected + 1}`}
            className="w-full h-[350px] sm:h-[450px] object-contain p-6"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`shrink-0 rounded-xl border overflow-hidden transition-all ${
                selected === i
                  ? "border-white/40 ring-1 ring-white/20"
                  : "border-white/10 opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt || `${productName} — miniatura ${i + 1}`}
                className="w-20 h-16 sm:w-24 sm:h-20 object-contain p-1 bg-white/5"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
