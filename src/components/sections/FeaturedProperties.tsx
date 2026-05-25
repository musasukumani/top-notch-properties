import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/ui/PropertyCard";
import type { Property } from "@/lib/types";

export default function FeaturedProperties({ properties }: { properties: Property[] }) {
  const featured = properties.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Hand-Picked Selection
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
              Featured Properties
            </h2>
          </div>
          <Link
            href="/properties"
            className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 transition-colors font-semibold shrink-0"
          >
            View All Properties <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
