import Link from "next/link";
import { Building2, Home, Building, Warehouse, ArrowUpRight } from "lucide-react";
import type { CategoryCount } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  apartment: Building2,
  villa: Home,
  commercial: Building,
  warehouse: Warehouse,
};

const descriptionMap: Record<string, string> = {
  apartment: "Modern urban living",
  villa: "Luxury estates",
  commercial: "Premium office spaces",
  warehouse: "Industrial & storage",
};

export default function PropertyCategories({ counts }: { counts: CategoryCount[] }) {
  return (
    <section className="section-padding bg-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Browse by Category
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Explore by Property Type
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {counts.map(({ type, label, count }) => {
            const Icon = iconMap[type] ?? Building2;
            const description = descriptionMap[type] ?? "";
            return (
              <Link
                key={type}
                href={`/properties?type=${type}`}
                className="group relative bg-white border border-site-200 card-shadow rounded-2xl p-6 text-center hover:card-shadow-hover hover:border-orange-200 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <ArrowUpRight
                  size={14}
                  className="absolute top-4 right-4 text-ink-300 opacity-0 group-hover:opacity-100 group-hover:text-orange-400 transition-all duration-200"
                />
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                  <Icon size={22} className="text-orange-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-base font-semibold text-ink-900 mb-1 group-hover:text-orange-500 transition-colors duration-200">
                  {label}
                </h3>
                <p className="text-ink-400 text-xs mb-3 leading-relaxed">{description}</p>
                <span className="inline-block bg-orange-50 text-orange-500 border border-orange-100 text-xs font-semibold px-3 py-1 rounded group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300">
                  {count} Properties
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
