import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Location } from "@/lib/types";

export default function FeaturedLocations({ locations }: { locations: Location[] }) {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Prime Markets
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
            Explore by Location
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.map((loc) => (
            <Link
              key={loc.city}
              href={`/properties?city=${loc.city.toLowerCase()}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <Image
                src={loc.image}
                alt={`${loc.city}, ${loc.country}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/30 to-transparent group-hover:from-navy-900/90 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-1.5 text-orange-400 text-xs font-semibold mb-1">
                  <MapPin size={12} />
                  {loc.country}
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-1">{loc.city}</h3>
                <p className="text-white/60 text-xs">{loc.listingsCount} Listings</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
