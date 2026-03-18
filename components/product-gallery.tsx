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

  return (
    <div>
      {/* Main display */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={allImages[selected].src}
          alt={allImages[selected].alt || `${productName} — zdjęcie ${selected + 1}`}
          className="w-full h-[300px] sm:h-[400px] object-contain p-6"
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`shrink-0 rounded-xl border overflow-hidden transition-all ${
                selected === i
                  ? "border-white/40 ring-1 ring-white/20"
                  : "border-white/10 opacity-50 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt || `${productName} — miniatura ${i + 1}`}
                className="w-16 h-14 sm:w-20 sm:h-16 object-contain p-1 bg-white/5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
