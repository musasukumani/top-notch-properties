# Sanity CMS Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all static data in `src/lib/data.ts` with a Sanity-powered CMS, giving the site owner a no-code editor at `/studio` to manage every property, agent, blog post, testimonial, location, and site setting.

**Architecture:** Section components are refactored from direct `data.ts` imports to accepting typed props; the parent page fetches data via typed GROQ query functions in `src/sanity/lib/queries.ts`. Images stay on Sanity's CDN and are projected to URL strings in GROQ, so existing `<Image>` usage barely changes. Static `data.ts` is preserved until Task 14 seeds Sanity, then page imports are swapped in Tasks 9–13.

**Tech Stack:** `sanity`, `next-sanity`, `@sanity/image-url` — all integrated into the existing Next.js 16 App Router project.

---

## File Map

**Create:**
- `sanity.config.ts` — Studio config (schemas, project ID, dataset, plugins)
- `src/sanity/schemas/property.ts`
- `src/sanity/schemas/agent.ts`
- `src/sanity/schemas/blog-post.ts`
- `src/sanity/schemas/testimonial.ts`
- `src/sanity/schemas/location.ts`
- `src/sanity/schemas/homepage-settings.ts`
- `src/sanity/schemas/site-settings.ts`
- `src/sanity/schemas/index.ts`
- `src/sanity/lib/client.ts`
- `src/sanity/lib/image.ts`
- `src/sanity/lib/queries.ts`
- `src/app/studio/[[...tool]]/page.tsx`
- `.env.local.example`
- `scripts/migrate-to-sanity.mjs`

**Modify:**
- `next.config.ts` — add `cdn.sanity.io` remote pattern
- `src/lib/types.ts` — add `PropertyWithGallery`, `HomepageSettings`, `CategoryCount`
- `src/app/page.tsx` — async, fetch all homepage data, pass as props
- `src/components/sections/FeaturedProperties.tsx` — accept `properties` prop
- `src/components/sections/PropertyCategories.tsx` — accept `counts` prop
- `src/components/sections/FeaturedLocations.tsx` — accept `locations` prop
- `src/components/sections/AgentsSection.tsx` — accept `agents` prop
- `src/components/sections/TestimonialsSection.tsx` — accept `testimonials` prop
- `src/components/sections/BlogSection.tsx` — accept `posts` prop
- `src/app/properties/page.tsx` — swap static import for Sanity query
- `src/app/properties/[id]/page.tsx` — swap static import for Sanity query, use Sanity gallery
- `src/app/agents/page.tsx` — make async, swap static import for Sanity query

---

## Task 1: Install packages

**Files:** none (package.json updated by npm)

- [ ] **Step 1: Install Sanity packages**

```bash
cd "c:\Users\user\Documents\Portfolio projects\top-notch-properties"
npm install sanity next-sanity @sanity/image-url
```

Expected: packages added to node_modules, package.json updated.

- [ ] **Step 2: Verify install**

```bash
node -e "require('next-sanity'); require('@sanity/image-url'); console.log('ok')"
```

Expected output: `ok`

---

## Task 2: Create Sanity project and env vars

The Sanity project must exist before any code can connect to it.

- [ ] **Step 1: Create the project interactively**

Run in the project terminal (requires user interaction — do NOT run in background):

```bash
npx sanity@latest init --env
```

When prompted:
- **Create new project** → yes
- **Project name** → `top-notch-properties`
- **Dataset** → `production`
- **Output env file** → `.env.local` (accept default)

This writes `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to `.env.local`.

- [ ] **Step 2: Add write token to .env.local**

Go to https://sanity.io/manage → your project → API → Tokens → Add API Token.
Name it `migrate`, set permissions to **Editor**. Copy the token.

Add to `.env.local`:
```
SANITY_API_WRITE_TOKEN=your_token_here
```

- [ ] **Step 3: Create .env.local.example**

Create `c:\Users\user\Documents\Portfolio projects\top-notch-properties\.env.local.example`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_write_token
```

---

## Task 3: Create all Sanity schemas

**Files:** `src/sanity/schemas/*.ts`

- [ ] **Step 1: Create property schema**

Create `src/sanity/schemas/property.ts`:

```ts
import { defineField, defineType } from "sanity";

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", type: "number", validation: (r) => r.required() }),
    defineField({
      name: "priceUnit",
      type: "string",
      options: { list: [{ title: "Per month", value: "month" }, { title: "Per year", value: "year" }, { title: "Total (sale)", value: "" }] },
    }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["for-sale", "for-rent"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      options: { list: ["apartment", "villa", "commercial", "warehouse", "penthouse", "house"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "city", type: "reference", to: [{ type: "location" }] }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "bedrooms", type: "number" }),
    defineField({ name: "bathrooms", type: "number" }),
    defineField({ name: "area", type: "number" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "rating", type: "number", validation: (r) => r.min(0).max(5) }),
    defineField({ name: "reviewCount", type: "number" }),
    defineField({ name: "yearBuilt", type: "number" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "amenities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "image", title: "Main image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      title: "Gallery images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "image" },
  },
});
```

- [ ] **Step 2: Create agent schema**

Create `src/sanity/schemas/agent.ts`:

```ts
import { defineField, defineType } from "sanity";

export const agent = defineType({
  name: "agent",
  title: "Agent",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "propertiesCount", type: "number" }),
    defineField({ name: "rating", type: "number", validation: (r) => r.min(0).max(5) }),
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "photo" },
  },
});
```

- [ ] **Step 3: Create blog post schema**

Create `src/sanity/schemas/blog-post.ts`:

```ts
import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Featured image", type: "image", options: { hotspot: true } }),
    defineField({ name: "author", type: "reference", to: [{ type: "agent" }] }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "publishedAt", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
```

- [ ] **Step 4: Create testimonial schema**

Create `src/sanity/schemas/testimonial.ts`:

```ts
import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "avatar", type: "image", options: { hotspot: true } }),
    defineField({ name: "content", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "rating", type: "number", validation: (r) => r.required().min(1).max(5) }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" },
  },
});
```

- [ ] **Step 5: Create location schema**

Create `src/sanity/schemas/location.ts`:

```ts
import { defineField, defineType } from "sanity";

export const location = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({ name: "city", type: "string", validation: (r) => r.required() }),
    defineField({ name: "country", type: "string", validation: (r) => r.required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "listingsCount", type: "number" }),
  ],
  preview: {
    select: { title: "city", subtitle: "country", media: "image" },
  },
});
```

- [ ] **Step 6: Create homepage settings schema**

Create `src/sanity/schemas/homepage-settings.ts`:

```ts
import { defineField, defineType } from "sanity";

export const homepageSettings = defineType({
  name: "homepageSettings",
  title: "Homepage Settings",
  type: "document",
  fields: [
    defineField({ name: "heroImage", title: "Hero background image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroHeadline", type: "string" }),
    defineField({ name: "heroSubheading", type: "text", rows: 2 }),
    defineField({
      name: "stats",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", type: "string" }),
          defineField({ name: "label", type: "string" }),
        ],
        preview: { select: { title: "value", subtitle: "label" } },
      }],
    }),
    defineField({ name: "ctaHeading", type: "string" }),
    defineField({ name: "ctaBody", type: "text", rows: 2 }),
    defineField({ name: "appStoreUrl", type: "url" }),
    defineField({ name: "playStoreUrl", type: "url" }),
  ],
});
```

- [ ] **Step 7: Create site settings schema**

Create `src/sanity/schemas/site-settings.ts`:

```ts
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({ name: "contactPhone", type: "string" }),
    defineField({ name: "footerTagline", type: "string" }),
    defineField({ name: "twitterUrl", type: "url" }),
    defineField({ name: "instagramUrl", type: "url" }),
    defineField({ name: "facebookUrl", type: "url" }),
    defineField({ name: "linkedinUrl", type: "url" }),
  ],
});
```

- [ ] **Step 8: Create schema index**

Create `src/sanity/schemas/index.ts`:

```ts
import { property } from "./property";
import { agent } from "./agent";
import { blogPost } from "./blog-post";
import { testimonial } from "./testimonial";
import { location } from "./location";
import { homepageSettings } from "./homepage-settings";
import { siteSettings } from "./site-settings";

export const schemas = [property, agent, blogPost, testimonial, location, homepageSettings, siteSettings];
```

---

## Task 4: Sanity client and image builder

**Files:** `src/sanity/lib/client.ts`, `src/sanity/lib/image.ts`

- [ ] **Step 1: Create Sanity client**

Create `src/sanity/lib/client.ts`:

```ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});
```

- [ ] **Step 2: Create image URL builder**

Create `src/sanity/lib/image.ts`:

```ts
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

---

## Task 5: GROQ query functions

**Files:** `src/sanity/lib/queries.ts`, `src/lib/types.ts`

- [ ] **Step 1: Extend types.ts**

Add to `src/lib/types.ts` (append after the existing exports):

```ts
export interface PropertyWithGallery extends Property {
  gallery: string[];
}

export interface CategoryCount {
  type: string;
  label: string;
  count: number;
}

export interface HomepageSettings {
  heroImage?: string;
  heroHeadline?: string;
  heroSubheading?: string;
  stats?: { value: string; label: string }[];
  ctaHeading?: string;
  ctaBody?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}
```

- [ ] **Step 2: Create query functions**

Create `src/sanity/lib/queries.ts`:

```ts
import { client } from "./client";
import type { Property, PropertyWithGallery, Agent, Testimonial, BlogPost, Location, CategoryCount, HomepageSettings } from "@/lib/types";

const PROPERTY_FIELDS = `
  "id": _id,
  title,
  price,
  priceUnit,
  area,
  bedrooms,
  bathrooms,
  rating,
  reviewCount,
  address,
  "city": city->city,
  type,
  status,
  "image": image.asset->url,
  featured,
  yearBuilt,
  description,
  amenities
`;

export async function getFeaturedProperties(): Promise<Property[]> {
  return client.fetch(
    `*[_type == "property" && featured == true] | order(_createdAt desc) [0...6] { ${PROPERTY_FIELDS} }`
  );
}

export async function getAllProperties(): Promise<Property[]> {
  return client.fetch(
    `*[_type == "property"] | order(_createdAt desc) { ${PROPERTY_FIELDS} }`
  );
}

export async function getPropertyById(id: string): Promise<PropertyWithGallery | null> {
  return client.fetch(
    `*[_type == "property" && _id == $id][0] {
      ${PROPERTY_FIELDS},
      "gallery": [image.asset->url, ...gallery[].asset->url]
    }`,
    { id }
  );
}

export async function getAgents(): Promise<Agent[]> {
  return client.fetch(
    `*[_type == "agent"] | order(_createdAt asc) {
      "id": _id,
      name,
      title,
      phone,
      email,
      "image": photo.asset->url,
      propertiesCount,
      rating
    }`
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] | order(_createdAt asc) {
      "id": _id,
      name,
      role,
      "avatar": avatar.asset->url,
      content,
      rating
    }`
  );
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      "id": _id,
      title,
      excerpt,
      "image": image.asset->url,
      "date": publishedAt,
      "author": author->name,
      category,
      "slug": slug.current
    }`
  );
}

export async function getLocations(): Promise<Location[]> {
  return client.fetch(
    `*[_type == "location"] | order(city asc) {
      city,
      country,
      listingsCount,
      "image": image.asset->url
    }`
  );
}

export async function getCategoryCounts(): Promise<CategoryCount[]> {
  const types = ["apartment", "villa", "commercial", "warehouse"];
  const labels: Record<string, string> = {
    apartment: "Apartment",
    villa: "Villa",
    commercial: "Commercial",
    warehouse: "Warehouse",
  };
  const counts = await client.fetch<Record<string, number>>(
    `{
      "apartment": count(*[_type == "property" && type == "apartment"]),
      "villa": count(*[_type == "property" && type == "villa"]),
      "commercial": count(*[_type == "property" && type == "commercial"]),
      "warehouse": count(*[_type == "property" && type == "warehouse"])
    }`
  );
  return types.map((type) => ({ type, label: labels[type], count: counts[type] ?? 0 }));
}

export async function getHomepageSettings(): Promise<HomepageSettings | null> {
  return client.fetch(
    `*[_type == "homepageSettings"][0] {
      "heroImage": heroImage.asset->url,
      heroHeadline,
      heroSubheading,
      stats,
      ctaHeading,
      ctaBody,
      appStoreUrl,
      playStoreUrl
    }`
  );
}
```

---

## Task 6: Studio config and route

**Files:** `sanity.config.ts`, `src/app/studio/[[...tool]]/page.tsx`

- [ ] **Step 1: Create sanity.config.ts**

Create `sanity.config.ts` at the project root:

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemas } from "./src/sanity/schemas";

export default defineConfig({
  name: "top-notch-properties",
  title: "Top Notch Properties CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemas },
});
```

- [ ] **Step 2: Create the Studio page route**

Create directory `src/app/studio/[[...tool]]/` then create `page.tsx`:

```tsx
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Step 3: Verify studio loads**

With the dev server running, open http://localhost:3000/studio in a browser. You should see the Sanity Studio login / editor. Log in with your Sanity account.

---

## Task 7: Update next.config.ts

**Files:** `next.config.ts`

- [ ] **Step 1: Add Sanity CDN hostname**

Replace the full contents of `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
```

---

## Task 8: Migrate section components to accept props

**Files:** 6 section components

These changes make components pure presentation — no data fetching inside them. The page becomes the single data boundary.

- [ ] **Step 1: Update FeaturedProperties.tsx**

Replace `src/components/sections/FeaturedProperties.tsx` entirely:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/ui/PropertyCard";
import type { Property } from "@/lib/types";

export default function FeaturedProperties({ properties }: { properties: Property[] }) {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Hand-picked for you
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
              Featured Properties
            </h2>
          </div>
          <Link
            href="/properties"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            View All
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500"
          >
            View All Properties
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

Note: preserve whatever JSX the existing component has — the key change is the prop signature `{ properties }: { properties: Property[] }` replacing the static import. Copy the existing JSX from the file rather than using the snippet above if the original has different UI.

- [ ] **Step 2: Update PropertyCategories.tsx**

Edit `src/components/sections/PropertyCategories.tsx` — change the top of the file from the hardcoded `categories` array to accepting a prop, and derive counts from the prop:

```tsx
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
```

- [ ] **Step 3: Update FeaturedLocations.tsx**

Open `src/components/sections/FeaturedLocations.tsx`. Remove the `import { locations } from "@/lib/data"` line. Change the function signature to `({ locations }: { locations: Location[] })` and add `import type { Location } from "@/lib/types"` at the top. The rest of the JSX stays identical.

- [ ] **Step 4: Update AgentsSection.tsx**

Open `src/components/sections/AgentsSection.tsx`. Remove the `import { agents } from "@/lib/data"` line. Change the function signature to `({ agents }: { agents: Agent[] })` and add `import type { Agent } from "@/lib/types"` at the top. The rest of the JSX stays identical.

- [ ] **Step 5: Update TestimonialsSection.tsx**

Open `src/components/sections/TestimonialsSection.tsx`. Remove the `import { testimonials } from "@/lib/data"` line. Change the function signature to `({ testimonials }: { testimonials: Testimonial[] })` and add `import type { Testimonial } from "@/lib/types"` at the top. The rest of the JSX stays identical.

- [ ] **Step 6: Update BlogSection.tsx**

Open `src/components/sections/BlogSection.tsx`. Remove the `import { blogPosts } from "@/lib/data"` line. Change the function signature to `({ posts }: { posts: BlogPost[] })` and add `import type { BlogPost } from "@/lib/types"` at the top. Any reference to `blogPosts` inside the JSX changes to `posts`. The rest of the JSX stays identical.

---

## Task 9: Migrate homepage page.tsx

**Files:** `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

Replace `src/app/page.tsx` entirely:

```tsx
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import PropertyCategories from "@/components/sections/PropertyCategories";
import FeaturedLocations from "@/components/sections/FeaturedLocations";
import AgentsSection from "@/components/sections/AgentsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import AppCTASection from "@/components/sections/AppCTASection";
import {
  getFeaturedProperties,
  getCategoryCounts,
  getLocations,
  getAgents,
  getTestimonials,
  getBlogPosts,
} from "@/sanity/lib/queries";

export default async function Home() {
  const [featuredProperties, categoryCounts, locations, agents, testimonials, blogPosts] =
    await Promise.all([
      getFeaturedProperties(),
      getCategoryCounts(),
      getLocations(),
      getAgents(),
      getTestimonials(),
      getBlogPosts(),
    ]);

  return (
    <>
      <HeroSection />
      <FeaturedProperties properties={featuredProperties} />
      <PropertyCategories counts={categoryCounts} />
      <FeaturedLocations locations={locations} />
      <AgentsSection agents={agents} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection posts={blogPosts} />
      <AppCTASection />
    </>
  );
}
```

---

## Task 10: Migrate properties listing page

**Files:** `src/app/properties/page.tsx`

- [ ] **Step 1: Replace static import with Sanity query**

In `src/app/properties/page.tsx`:

1. Remove: `import { properties } from "@/lib/data";`
2. Add: `import { getAllProperties } from "@/sanity/lib/queries";`
3. Inside `PropertiesPage`, add at the top:
   ```ts
   const properties = await getAllProperties();
   ```
   (The function is already `async`, so no signature change needed.)

The rest of the file (filtering, sorting, JSX) stays identical — `properties` is still a `Property[]` array.

---

## Task 11: Migrate property detail page

**Files:** `src/app/properties/[id]/page.tsx`

The detail page currently uses hardcoded `galleryExtras` by ID. After this task, gallery images come from Sanity.

- [ ] **Step 1: Replace static imports**

In `src/app/properties/[id]/page.tsx`:

1. Remove: `import { properties, agents } from "@/lib/data";`
2. Add:
   ```ts
   import { getAllProperties, getPropertyById, getAgents } from "@/sanity/lib/queries";
   ```

- [ ] **Step 2: Update generateMetadata**

Replace the `generateMetadata` function:

```ts
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) return { title: "Property Not Found" };
  return {
    title: `${property.title} — Top Notch Properties`,
    description: property.description,
  };
}
```

- [ ] **Step 3: Update generateStaticParams**

Replace `generateStaticParams`:

```ts
export async function generateStaticParams() {
  const properties = await getAllProperties();
  return properties.map((p) => ({ id: p.id }));
}
```

- [ ] **Step 4: Update page function**

Replace the top of `PropertyDetailPage` (data fetching block only):

```ts
export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const [property, allAgents] = await Promise.all([
    getPropertyById(id),
    getAgents(),
  ]);
  if (!property) notFound();

  const agent = allAgents[Number(id.slice(-1)) % allAgents.length] ?? allAgents[0];
  const allProperties = await getAllProperties();
  const related = allProperties.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);
  const fallbackRelated = allProperties.filter((p) => p.id !== property.id).slice(0, 3);
  const relatedProperties = related.length >= 2 ? related : fallbackRelated;

  const gallery = property.gallery?.length ? property.gallery : [property.image];
  // ... rest of the function unchanged
```

- [ ] **Step 5: Remove galleryExtras**

Delete the `galleryExtras` constant (lines 24–55 in the original file) — gallery now comes from Sanity.

---

## Task 12: Migrate agents page

**Files:** `src/app/agents/page.tsx`

- [ ] **Step 1: Make async and swap import**

In `src/app/agents/page.tsx`:

1. Remove: `import { agents } from "@/lib/data";`
2. Add: `import { getAgents } from "@/sanity/lib/queries";`
3. Change function signature to `async`:
   ```ts
   export default async function AgentsPage() {
     const agents = await getAgents();
     // ... rest unchanged
   ```

---

## Task 13: Seed Sanity with existing data

**Files:** `scripts/migrate-to-sanity.mjs`

This one-time script creates all documents in Sanity from the static data. Run it once after the Studio is confirmed working. Images are not uploaded (Sanity can't fetch Unsplash URLs automatically) — upload images manually via Studio after running this.

- [ ] **Step 1: Create migration script**

Create `scripts/migrate-to-sanity.mjs`:

```js
import { createClient } from "@sanity/client";
import "dotenv/config";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ── Location data ──────────────────────────────────────────────
const locationData = [
  { city: "California", country: "US", listingsCount: 7 },
  { city: "Las Vegas", country: "US", listingsCount: 3 },
  { city: "Melbourne", country: "AU", listingsCount: 13 },
  { city: "New York", country: "US", listingsCount: 3 },
];

// ── Agent data ─────────────────────────────────────────────────
const agentData = [
  { name: "Savannah Nguyen", title: "Senior Property Consultant", phone: "+1 (555) 234-5678", email: "savannah@homirx.com", propertiesCount: 42, rating: 4.9 },
  { name: "Annette Black", title: "Luxury Homes Specialist", phone: "+1 (555) 345-6789", email: "annette@homirx.com", propertiesCount: 38, rating: 4.8 },
  { name: "Kathryn Murphy", title: "Commercial Real Estate Expert", phone: "+1 (555) 456-7890", email: "kathryn@homirx.com", propertiesCount: 55, rating: 5.0 },
  { name: "David Hardson", title: "Investment Property Advisor", phone: "+1 (555) 567-8901", email: "david@homirx.com", propertiesCount: 61, rating: 4.7 },
];

// ── Testimonial data ───────────────────────────────────────────
const testimonialData = [
  { name: "Kristin Watson", role: "Web Designer", content: "HomiRX made finding our dream home effortless. The team was professional, knowledgeable, and genuinely cared about finding us the right property. We couldn't be happier with our new home.", rating: 5 },
  { name: "Wade Warren", role: "President of Sales", content: "Outstanding service from start to finish. The property recommendations were spot on and the process was completely transparent. I've already referred three colleagues who had equally great experiences.", rating: 5 },
  { name: "Jessica Brown", role: "Founder & CEO", content: "As a first-time buyer I was nervous, but the HomiRX team guided me every step of the way. Their market knowledge is exceptional and the app made tracking listings incredibly easy.", rating: 5 },
  { name: "David Anderson", role: "Customer", content: "Sold my property 20% above asking price within two weeks. The marketing strategy and buyer network at HomiRX is truly second to none. Highly recommend for any serious seller.", rating: 5 },
];

// ── Blog post data ─────────────────────────────────────────────
const blogPostData = [
  { title: "Top 8 Amazing Places to Stay in California", excerpt: "Discover the most exclusive and breathtaking luxury properties California has to offer, from Malibu beachfront estates to Napa Valley wine country retreats.", authorIndex: 0, category: "Destinations", slug: "top-places-california", publishedAt: "2024-11-04T00:00:00Z" },
  { title: "The Modern Buyer's Guide to Luxury Real Estate", excerpt: "Everything you need to know before purchasing a luxury property in today's market, from financing strategies to due diligence checklists.", authorIndex: 1, category: "Buying Guide", slug: "luxury-buyers-guide", publishedAt: "2024-11-04T00:00:00Z" },
  { title: "Top 5 Investment Destinations for 2025", excerpt: "Our market analysts identify the five real estate markets poised for exceptional growth, with exclusive data on rental yields and capital appreciation.", authorIndex: 2, category: "Investment", slug: "investment-destinations-2025", publishedAt: "2024-11-04T00:00:00Z" },
  { title: "Most Beautiful Waterfront Homes in the World", excerpt: "A curated collection of the world's most spectacular waterfront residences, showcasing extraordinary architecture and unparalleled natural settings.", authorIndex: 3, category: "Lifestyle", slug: "beautiful-waterfront-homes", publishedAt: "2024-11-04T00:00:00Z" },
  { title: "How to Stage Your Home for a Premium Sale", excerpt: "Professional staging advice from top interior designers that can increase your property value by up to 15% and reduce time on the market.", authorIndex: 0, category: "Selling Tips", slug: "home-staging-premium-sale", publishedAt: "2024-11-04T00:00:00Z" },
  { title: "The Rise of Smart Homes in Luxury Real Estate", excerpt: "How AI and automation are transforming luxury living spaces, and why smart home technology is now a must-have for high-end buyers.", authorIndex: 1, category: "Technology", slug: "smart-homes-luxury-real-estate", publishedAt: "2024-11-04T00:00:00Z" },
];

// ── Property data ──────────────────────────────────────────────
const propertyData = [
  { title: "One Madison Residences", price: 8500, priceUnit: "month", area: 1869, bedrooms: 3, bathrooms: 2, rating: 4.9, reviewCount: 24, address: "1 Madison Avenue", cityName: "New York", type: "apartment", status: "for-rent", featured: true, yearBuilt: 2020, description: "White-glove full-service residences above Madison Square Park with triple-aspect floor plans, chef's kitchen, and in-unit laundry.", amenities: ["Doorman", "Concierge", "Rooftop Lounge", "Gym", "Bike Storage", "Package Room"] },
  { title: "The Kensington Residences", price: 12500, priceUnit: "month", area: 2100, bedrooms: 3, bathrooms: 3, rating: 5.0, reviewCount: 47, address: "210 Central Park South", cityName: "New York", type: "apartment", status: "for-rent", featured: true, yearBuilt: 2021, description: "Landmark tower apartments with direct Central Park views, bespoke Italian kitchens, and private residents' club on the 42nd floor.", amenities: ["Private Club Floor", "Valet Parking", "Spa", "Screening Room", "Concierge", "Wine Storage"] },
  { title: "Southbank Sky Residences", price: 7200, priceUnit: "month", area: 1650, bedrooms: 2, bathrooms: 2, rating: 4.8, reviewCount: 18, address: "88 Southbank Boulevard", cityName: "Melbourne", type: "apartment", status: "for-rent", featured: true, yearBuilt: 2019, description: "High-rise sky residences with floor-to-ceiling glazing overlooking the Yarra River, engineered oak floors, and premium integrated appliances.", amenities: ["Concierge", "Infinity Pool", "Residents' Lounge", "Gym", "EV Charging", "Storage Cage"] },
  { title: "Grand Canal Apartments", price: 2850000, priceUnit: "", area: 2400, bedrooms: 3, bathrooms: 2, rating: 5.0, reviewCount: 33, address: "44 Collins Street", cityName: "Melbourne", type: "apartment", status: "for-sale", featured: true, yearBuilt: 2022, description: "Architecturally awarded whole-floor apartment with private lift access, 270-degree city panorama, and custom joinery throughout.", amenities: ["Private Lift", "Wraparound Terrace", "Smart Home", "Wine Cellar", "2 Car Parks", "Storage"] },
  { title: "Peninsula Apartments", price: 380000, priceUnit: "", area: 1860, bedrooms: 6, bathrooms: 3, rating: 4.0, reviewCount: 29, address: "18 Broklyn Street", cityName: "New York", type: "villa", status: "for-sale", featured: true, yearBuilt: 2021, description: "Waterfront villa with breathtaking views and private dock access.", amenities: ["Private Dock", "Pool", "Home Theater", "Gym"] },
  { title: "Eaton Garth Penthouse", price: 1200000, priceUnit: "", area: 1860, bedrooms: 6, bathrooms: 3, rating: 5.0, reviewCount: 56, address: "18 Broklyn Street", cityName: "New York", type: "penthouse", status: "for-sale", featured: true, yearBuilt: 2023, description: "Exclusive penthouse with 360-degree city views, private terrace and helipad.", amenities: ["Helipad", "Private Pool", "Butler Service", "Cinema Room"] },
  { title: "Malibu Cliff Villa", price: 2850000, priceUnit: "", area: 3200, bedrooms: 5, bathrooms: 4, rating: 4.8, reviewCount: 31, address: "42 Ocean View Drive", cityName: "California", type: "villa", status: "for-sale", featured: false, yearBuilt: 2019, description: "Dramatic cliffside villa with floor-to-ceiling ocean views and a private infinity pool overlooking the Pacific.", amenities: ["Infinity Pool", "Private Gym", "Home Theater", "Wine Cellar", "3-Car Garage"] },
  { title: "Desert Rose Estate", price: 1750000, priceUnit: "", area: 2800, bedrooms: 4, bathrooms: 3, rating: 4.7, reviewCount: 19, address: "18 Sunstone Lane", cityName: "Las Vegas", type: "villa", status: "for-sale", featured: false, yearBuilt: 2021, description: "Contemporary desert villa blending indoor-outdoor living with a resort-style backyard and mountain backdrop.", amenities: ["Pool & Spa", "Outdoor Kitchen", "Smart Home", "Solar Panels", "Guest Suite"] },
  { title: "Lakefront Haven Villa", price: 3400000, priceUnit: "", area: 4100, bedrooms: 6, bathrooms: 5, rating: 5.0, reviewCount: 44, address: "7 Lakeshore Boulevard", cityName: "Melbourne", type: "villa", status: "for-sale", featured: false, yearBuilt: 2022, description: "Architecturally striking lakefront villa with private pontoon, heated pool and panoramic water views from every room.", amenities: ["Private Pontoon", "Heated Pool", "Rooftop Terrace", "Butler Quarters", "Home Gym"] },
  { title: "Midtown Commerce Tower", price: 4200000, priceUnit: "", area: 8500, bedrooms: 0, bathrooms: 6, rating: 4.8, reviewCount: 22, address: "310 Fifth Avenue", cityName: "New York", type: "commercial", status: "for-sale", featured: false, yearBuilt: 2018, description: "Premium grade-A office tower in the heart of Midtown Manhattan with floor plates of up to 1,700 sq ft, 24/7 concierge, and direct subway access.", amenities: ["24/7 Concierge", "Conference Rooms", "Server Room", "Rooftop Terrace", "Underground Parking", "Fiber Internet"] },
  { title: "Sunset Strip Retail Plaza", price: 2750000, priceUnit: "", area: 5200, bedrooms: 0, bathrooms: 4, rating: 4.6, reviewCount: 17, address: "8800 Sunset Boulevard", cityName: "California", type: "commercial", status: "for-sale", featured: false, yearBuilt: 2020, description: "High-visibility retail and office plaza on one of LA's most trafficked corridors, featuring 12 ground-floor retail units and 3 upper-floor office suites.", amenities: ["High Foot Traffic", "Shared Lobby", "Loading Bay", "CCTV", "Ample Parking", "Signage Rights"] },
  { title: "The Exchange Business Hub", price: 6800000, priceUnit: "", area: 12000, bedrooms: 0, bathrooms: 10, rating: 5.0, reviewCount: 38, address: "22 Collins Street", cityName: "Melbourne", type: "commercial", status: "for-sale", featured: false, yearBuilt: 2023, description: "Melbourne's newest landmark commercial hub, offering open-plan floors with city views, co-working zones, and a ground-floor dining precinct.", amenities: ["Co-working Zones", "Boardrooms", "Bike Storage", "Shower Facilities", "Café Precinct", "EV Charging"] },
  { title: "Fremont Innovation Campus", price: 5100000, priceUnit: "", area: 9800, bedrooms: 0, bathrooms: 8, rating: 4.9, reviewCount: 29, address: "45 Innovation Drive", cityName: "Las Vegas", type: "commercial", status: "for-sale", featured: false, yearBuilt: 2021, description: "Purpose-built technology and innovation campus with flexible open floor plans, dedicated server infrastructure, and collaborative break-out areas.", amenities: ["Dedicated Server Rooms", "Open Floor Plans", "Break-out Areas", "Helipad", "24/7 Security", "On-site Gym"] },
  { title: "Ironworks Distribution Centre", price: 1850000, priceUnit: "", area: 18000, bedrooms: 0, bathrooms: 4, rating: 4.7, reviewCount: 14, address: "220 Industrial Parkway", cityName: "Las Vegas", type: "warehouse", status: "for-sale", featured: false, yearBuilt: 2017, description: "High-clearance distribution centre with 12m internal height, 6 dock-leveller bays, and direct freeway access.", amenities: ["6 Dock Levellers", "12m Clearance", "Freeway Access", "Sprinkler System", "Staff Amenities", "CCTV"] },
  { title: "Steelyard Industrial Complex", price: 2300000, priceUnit: "", area: 24000, bedrooms: 0, bathrooms: 6, rating: 4.5, reviewCount: 9, address: "88 Forge Road", cityName: "Melbourne", type: "warehouse", status: "for-sale", featured: false, yearBuilt: 2016, description: "Expansive multi-unit industrial complex with heavy-duty concrete flooring, three-phase power, and a secure yard of 4,000 sq ft for container storage.", amenities: ["Three-Phase Power", "Concrete Flooring", "Secure Yard", "Container Storage", "Office Fitout", "Roller Doors"] },
  { title: "Apex Cold Storage Facility", price: 3100000, priceUnit: "", area: 15000, bedrooms: 0, bathrooms: 4, rating: 4.9, reviewCount: 21, address: "5 Refrigeration Way", cityName: "New York", type: "warehouse", status: "for-sale", featured: false, yearBuilt: 2020, description: "State-of-the-art cold storage and food-grade warehouse with independently controlled temperature zones, solar power, and FDA-compliant fit-out.", amenities: ["Cold Storage Zones", "FDA Compliant", "Solar Power", "Generator Backup", "Loading Docks", "Office Block"] },
  { title: "Pacific Rim Logistics Hub", price: 4600000, priceUnit: "", area: 32000, bedrooms: 0, bathrooms: 8, rating: 4.8, reviewCount: 33, address: "300 Harbor Industrial Drive", cityName: "California", type: "warehouse", status: "for-sale", featured: false, yearBuilt: 2022, description: "Premium port-adjacent logistics hub with cross-dock capability, automated conveyor infrastructure, and a 2,000 sq ft mezzanine office overlooking the floor.", amenities: ["Cross-Dock Capability", "Automated Conveyors", "Mezzanine Office", "Port Access", "EV Truck Charging", "24/7 Security"] },
];

async function migrate() {
  console.log("Creating locations...");
  const locationIds = {};
  for (const loc of locationData) {
    const doc = await client.create({ _type: "location", city: loc.city, country: loc.country, listingsCount: loc.listingsCount });
    locationIds[loc.city] = doc._id;
    console.log(`  Created location: ${loc.city} → ${doc._id}`);
  }

  console.log("Creating agents...");
  const agentIds = [];
  for (const ag of agentData) {
    const doc = await client.create({ _type: "agent", name: ag.name, title: ag.title, phone: ag.phone, email: ag.email, propertiesCount: ag.propertiesCount, rating: ag.rating });
    agentIds.push(doc._id);
    console.log(`  Created agent: ${ag.name} → ${doc._id}`);
  }

  console.log("Creating testimonials...");
  for (const t of testimonialData) {
    const doc = await client.create({ _type: "testimonial", name: t.name, role: t.role, content: t.content, rating: t.rating });
    console.log(`  Created testimonial: ${t.name} → ${doc._id}`);
  }

  console.log("Creating blog posts...");
  for (const post of blogPostData) {
    const doc = await client.create({
      _type: "blogPost",
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      slug: { _type: "slug", current: post.slug },
      publishedAt: post.publishedAt,
      author: { _type: "reference", _ref: agentIds[post.authorIndex] },
    });
    console.log(`  Created blog post: ${post.title} → ${doc._id}`);
  }

  console.log("Creating properties...");
  for (const prop of propertyData) {
    const cityId = locationIds[prop.cityName];
    const doc = await client.create({
      _type: "property",
      title: prop.title,
      price: prop.price,
      priceUnit: prop.priceUnit,
      area: prop.area,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      rating: prop.rating,
      reviewCount: prop.reviewCount,
      address: prop.address,
      city: cityId ? { _type: "reference", _ref: cityId } : undefined,
      type: prop.type,
      status: prop.status,
      featured: prop.featured,
      yearBuilt: prop.yearBuilt,
      description: prop.description,
      amenities: prop.amenities,
    });
    console.log(`  Created property: ${prop.title} → ${doc._id}`);
  }

  console.log("\nDone. Open /studio to upload images for each document.");
}

migrate().catch((err) => { console.error(err); process.exit(1); });
```

- [ ] **Step 2: Install dotenv (needed by the script)**

```bash
npm install --save-dev dotenv
```

- [ ] **Step 3: Run the migration**

```bash
node scripts/migrate-to-sanity.mjs
```

Expected: each document logged with its Sanity `_id`. Open http://localhost:3000/studio, navigate to each schema, and upload the Unsplash images by pasting the URL into the image field or uploading a downloaded copy.

---

## Post-migration checklist

- [ ] All 17 properties visible in Studio under **Property**
- [ ] All 4 agents visible under **Agent**
- [ ] All 6 blog posts visible under **Blog Post**
- [ ] All 4 testimonials visible under **Testimonial**
- [ ] All 4 locations visible under **Location**
- [ ] `/` homepage loads properties, testimonials, agents, blog posts from Sanity (not static data)
- [ ] `/properties` page shows all 17 properties, filters work
- [ ] `/properties/[id]` detail page loads and shows gallery from Sanity
- [ ] `/agents` page loads agents from Sanity
- [ ] `/studio` accessible and shows all schemas
- [ ] Add a new test property in Studio, verify it appears on `/properties` without a deploy

---

## Notes

- **`/news` page** (`src/app/news/page.tsx`) links to external Bloomberg/CNBC/HousingWire articles and is intentionally left static — it is not part of this CMS migration.
- **Images:** The migration script does not upload images. After running it, go to `/studio` and upload images for each property, agent, location, and blog post manually. Use the original Unsplash URLs as reference.
- **`SANITY_API_WRITE_TOKEN`** is only needed for the one-time migration script. It does not need to be set in production.
- **Studio auth:** `/studio` uses Sanity's own authentication. You log in with your Sanity account credentials. No additional auth layer is needed for a single-owner site.
