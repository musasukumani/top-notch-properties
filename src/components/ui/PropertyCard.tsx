"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Maximize2, MapPin, Heart } from "lucide-react";
import { cn, formatArea } from "@/lib/utils";
import StarRating from "./StarRating";
import type { Property } from "@/lib/types";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
  const isRent = property.status === "for-rent";
  const [faved, setFaved] = useState(false);

  return (
    <Link href={`/properties/${property.id}`}>
      <article
        className={cn(
          "group cursor-pointer rounded-2xl overflow-hidden bg-white border border-site-200 card-shadow",
          "hover:card-shadow-hover hover:border-orange-200",
          "transition-all duration-300",
          className,
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
          <span
            className={cn(
              "absolute top-3.5 left-3.5 text-[10px] font-semibold px-2.5 py-1 rounded tracking-[0.12em] uppercase text-white",
              isRent ? "bg-orange-500" : "bg-black/60 backdrop-blur-sm",
            )}
          >
            {isRent ? "For Rent" : "For Sale"}
          </span>
          <button
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              setFaved((f) => !f);
              await fetch("/api/favorites", {
                method: faved ? "DELETE" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  property_id: property.id,
                  property_title: property.title,
                  property_image: property.image,
                  property_price: property.price,
                }),
              });
            }}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors cursor-pointer"
          >
            <Heart size={14} className={faved ? "fill-orange-500 text-orange-500" : "text-ink-400"} />
          </button>
          <div className="absolute bottom-3.5 right-3.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white bg-orange-500 px-3 py-1.5 rounded">
              View Details
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between mb-1.5">
            <h3 className="font-serif text-base font-semibold text-ink-900 group-hover:text-orange-500 transition-colors duration-200 line-clamp-1 leading-snug">
              {property.title}
            </h3>
            <StarRating rating={property.rating} size={12} className="shrink-0 ml-2 mt-0.5" />
          </div>

          <div className="flex items-center gap-1.5 text-ink-400 text-xs mb-4">
            <MapPin size={11} className="text-orange-400 shrink-0" />
            <span className="truncate">{property.address}, {property.city}</span>
          </div>

          <div className="flex items-center justify-between pt-3.5 border-t border-site-100">
            <div className="flex items-center gap-3.5 text-ink-400 text-xs">
              <span className="flex items-center gap-1.5">
                <BedDouble size={13} className="text-ink-300" />
                {property.bedrooms}
              </span>
              <span className="flex items-center gap-1.5">
                <Bath size={13} className="text-ink-300" />
                {property.bathrooms}
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize2 size={13} className="text-ink-300" />
                {formatArea(property.area)}
              </span>
            </div>
            <span className="font-serif text-orange-500 font-bold text-sm tracking-tight">
              ${property.price.toLocaleString()}
              {property.priceUnit && (
                <span className="text-ink-400 font-sans font-normal text-xs tracking-normal">
                  /{property.priceUnit}
                </span>
              )}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
