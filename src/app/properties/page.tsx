export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProperties } from "@/sanity/lib/queries";
import PropertiesClient from "@/components/sections/PropertiesClient";

export const metadata: Metadata = {
  title: "Properties — Top Notch Properties",
  description: "Browse our full selection of luxury properties for sale and rent.",
};

interface SearchParams {
  type?: string;
  status?: string;
  city?: string;
  sort?: string;
}

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const allProperties = await getAllProperties();
  const params = await searchParams;
  const { type, status, city, sort } = params;

  let filtered = [...allProperties];
  if (type && type !== "all") filtered = filtered.filter((p) => p.type === type);
  if (status) filtered = filtered.filter((p) => p.status === status);
  if (city) filtered = filtered.filter((p) => p.city.toLowerCase().includes(city.toLowerCase()));
  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  else if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-site-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900 mb-2">All Properties</h1>
        </div>
        <Suspense fallback={null}>
          <PropertiesClient
            properties={filtered}
            currentType={type}
            currentStatus={status}
            currentSort={sort}
          />
        </Suspense>
      </div>
    </div>
  );
}
