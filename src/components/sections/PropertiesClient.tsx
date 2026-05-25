"use client";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid3X3, List } from "lucide-react";
import PropertyCard from "@/components/ui/PropertyCard";
import type { Property } from "@/lib/types";

const propertyTypes = ["All", "Apartment", "Villa", "Penthouse", "Commercial", "Warehouse"];
const statusOptions = ["All", "For Sale", "For Rent"];
const sortOptions = [
  { label: "Newest First", value: "" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
];
const priceRanges = [
  { label: "Under $200K", min: 0, max: 200000 },
  { label: "$200K–$500K", min: 200000, max: 500000 },
  { label: "$500K–$1M", min: 500000, max: 1000000 },
  { label: "$1M+", min: 1000000, max: Infinity },
];
const bedroomOptions = ["Any", "1+", "2+", "3+", "4+"];

interface Props {
  properties: Property[];
  currentType?: string;
  currentStatus?: string;
  currentSort?: string;
}

export default function PropertiesClient({ properties, currentType, currentStatus, currentSort }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [minBeds, setMinBeds] = useState<number>(0);

  const filtered = properties.filter((p) => {
    if (priceRange) {
      const range = priceRanges.find((r) => r.label === priceRange);
      if (range && (p.price < range.min || p.price > range.max)) return false;
    }
    if (minBeds > 0 && p.bedrooms < minBeds) return false;
    return true;
  });

  function pushParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="lg:w-64 shrink-0">
        <div className="bg-white border border-site-200 rounded-2xl p-5 sticky top-24 card-shadow">
          <h3 className="font-serif text-sm font-semibold text-ink-900 mb-4 flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-orange-500" />
            Filters
          </h3>
          <div className="space-y-5">
            {/* Type */}
            <div>
              <label className="text-xs text-ink-500 uppercase tracking-wider mb-2 block">Property Type</label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => pushParam("type", t === "All" ? "" : t.toLowerCase())}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      (currentType ?? "").toLowerCase() === t.toLowerCase() || (t === "All" && !currentType)
                        ? "bg-orange-500/10 border-orange-400/40 text-orange-500"
                        : "border-site-200 text-ink-500 hover:border-orange-300 hover:text-orange-500"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {/* Status */}
            <div>
              <label className="text-xs text-ink-500 uppercase tracking-wider mb-2 block">Status</label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((s) => {
                  const val = s === "All" ? "" : s.toLowerCase().replace(/ /g, "-");
                  return (
                    <button
                      key={s}
                      onClick={() => pushParam("status", val)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                        (currentStatus ?? "") === val || (s === "All" && !currentStatus)
                          ? "bg-orange-500/10 border-orange-400/40 text-orange-500"
                          : "border-site-200 text-ink-500 hover:border-orange-300 hover:text-orange-500"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Price Range */}
            <div>
              <label className="text-xs text-ink-500 uppercase tracking-wider mb-2 block">Price Range</label>
              <div className="space-y-1.5">
                {priceRanges.map((r) => (
                  <label key={r.label} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={priceRange === r.label}
                      onChange={() => setPriceRange(priceRange === r.label ? null : r.label)}
                      className="w-4 h-4 rounded border-site-300 accent-orange-500 cursor-pointer"
                    />
                    <span className="text-xs text-ink-500 group-hover:text-ink-700 transition-colors">{r.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Bedrooms */}
            <div>
              <label className="text-xs text-ink-500 uppercase tracking-wider mb-2 block">Bedrooms</label>
              <div className="flex gap-2">
                {bedroomOptions.map((b) => {
                  const val = b === "Any" ? 0 : parseInt(b);
                  return (
                    <button
                      key={b}
                      onClick={() => setMinBeds(val)}
                      className={`flex-1 text-xs py-1.5 rounded-lg border transition-colors cursor-pointer ${
                        minBeds === val
                          ? "bg-orange-500/10 border-orange-400/40 text-orange-500"
                          : "border-site-200 text-ink-500 hover:border-orange-300 hover:text-orange-500"
                      }`}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${view === "grid" ? "bg-orange-500/10 border-orange-400/30 text-orange-500" : "border-site-200 text-ink-500 hover:border-orange-300 hover:text-orange-500"}`}
            >
              <Grid3X3 size={15} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${view === "list" ? "bg-orange-500/10 border-orange-400/30 text-orange-500" : "border-site-200 text-ink-500 hover:border-orange-300 hover:text-orange-500"}`}
            >
              <List size={15} />
            </button>
          </div>
          <select
            value={currentSort ?? ""}
            onChange={(e) => pushParam("sort", e.target.value)}
            className="bg-white border border-site-200 rounded-xl px-4 py-2 text-sm text-ink-700 focus:outline-none focus:border-orange-400 cursor-pointer"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <p className="text-ink-500 text-sm mb-5">{filtered.length} properties found</p>

        {filtered.length > 0 ? (
          <div className={view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
            : "flex flex-col gap-4"
          }>
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-ink-500 text-sm">No properties match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
