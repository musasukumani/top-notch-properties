"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import type { PropertyWithGallery } from "@/lib/types";

export default function DetailFavoriteButton({ property }: { property: PropertyWithGallery }) {
  const [faved, setFaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (loading) return;
    setLoading(true);
    const next = !faved;
    setFaved(next);
    await fetch("/api/favorites", {
      method: next ? "POST" : "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        property_id: property.id,
        property_title: property.title,
        property_image: property.image,
        property_price: property.price,
      }),
    });
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      aria-label={faved ? "Remove from favourites" : "Save to favourites"}
      className="p-2 rounded-lg border border-site-200 hover:border-orange-200 transition-colors cursor-pointer"
    >
      <Heart
        size={15}
        className={faved ? "fill-orange-500 text-orange-500" : "text-ink-400 hover:text-orange-500"}
      />
    </button>
  );
}
