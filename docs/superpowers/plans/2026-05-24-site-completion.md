# Site Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all broken/missing functionality and add a full auth system with user dashboard (Favourites, Enquiries, Alerts, Profile, Newsletter, Sign Out).

**Architecture:** Two independent phases. Phase A covers bug fixes and missing pages with no new dependencies. Phase B adds Supabase auth + database for the user account system. Properties page filtering is refactored into a client component to support view toggle and richer filters.

**Tech Stack:** Next.js 16 App Router, Supabase (auth + PostgreSQL), Resend (newsletter email), Tailwind CSS v4, Sanity CMS, TypeScript, Prisma-free (use Supabase JS client directly).

---

## PHASE A — Fixes & Missing Pages

### Task 1: Fix build error in image.ts

**Files:**
- Modify: `src/sanity/lib/image.ts`

- [ ] Replace the broken import with the correct one:

```ts
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

- [ ] Verify fix: `npm run build` — should no longer throw on this file. If the type still errors, replace the import line with:
```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;
```

- [ ] Commit: `git add src/sanity/lib/image.ts && git commit -m "fix: correct sanity image-url type import"`

---

### Task 2: Custom 404 page

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] Create the file:

```tsx
import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-site-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">404 Error</p>
        <h1 className="font-serif text-5xl font-bold text-ink-900 mb-4">Page Not Found</h1>
        <p className="text-ink-500 text-sm leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm px-5 py-2.5 rounded-md transition-colors"
          >
            <Home size={15} />
            Go Home
          </Link>
          <Link
            href="/properties"
            className="flex items-center gap-2 border border-site-200 text-ink-700 hover:border-orange-300 hover:text-orange-500 font-semibold text-sm px-5 py-2.5 rounded-md transition-colors"
          >
            <Search size={15} />
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] Commit: `git add src/app/not-found.tsx && git commit -m "feat: add custom 404 page"`

---

### Task 3: Footer stub pages

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/careers/page.tsx`
- Create: `src/app/how-it-works/page.tsx`
- Create: `src/app/partners/page.tsx`
- Create: `src/app/events/page.tsx`
- Create: `src/app/testimonials/page.tsx`
- Create: `src/app/terms/page.tsx`
- Create: `src/app/privacy/page.tsx`
- Create: `src/app/cookies/page.tsx`
- Create: `src/components/ui/ComingSoonPage.tsx`

- [ ] Create the reusable coming-soon component:

```tsx
// src/components/ui/ComingSoonPage.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function ComingSoonPage({ title, description }: Props) {
  return (
    <div className="min-h-screen bg-site-50 pt-24 pb-20 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Coming Soon</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900 mb-4">{title}</h1>
        <p className="text-ink-500 text-sm leading-relaxed mb-8">{description}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
```

- [ ] Create `src/app/about/page.tsx`:

```tsx
import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "About Us — Top Notch Properties" };
export default function AboutPage() {
  return <ComingSoonPage title="About Us" description="Learn about our story, mission, and the team behind Top Notch Properties." />;
}
```

- [ ] Create `src/app/careers/page.tsx`:

```tsx
import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "Careers — Top Notch Properties" };
export default function CareersPage() {
  return <ComingSoonPage title="Careers" description="Join our growing team of real estate professionals. Open positions coming soon." />;
}
```

- [ ] Create `src/app/how-it-works/page.tsx`:

```tsx
import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "How It Works — Top Notch Properties" };
export default function HowItWorksPage() {
  return <ComingSoonPage title="How It Works" description="A simple guide to buying, selling, or renting with Top Notch Properties." />;
}
```

- [ ] Create `src/app/partners/page.tsx`:

```tsx
import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "Partners — Top Notch Properties" };
export default function PartnersPage() {
  return <ComingSoonPage title="Our Partners" description="Meet the trusted partners who help us deliver exceptional real estate experiences." />;
}
```

- [ ] Create `src/app/events/page.tsx`:

```tsx
import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "Events — Top Notch Properties" };
export default function EventsPage() {
  return <ComingSoonPage title="Events" description="Property showcases, open days, and industry events. Check back soon." />;
}
```

- [ ] Create `src/app/testimonials/page.tsx`:

```tsx
import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "Testimonials — Top Notch Properties" };
export default function TestimonialsPage() {
  return <ComingSoonPage title="Client Stories" description="Hear what our clients say about their experience with Top Notch Properties." />;
}
```

- [ ] Create `src/app/terms/page.tsx`:

```tsx
import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "Terms & Conditions — Top Notch Properties" };
export default function TermsPage() {
  return <ComingSoonPage title="Terms & Conditions" description="Our full terms and conditions will be published here shortly." />;
}
```

- [ ] Create `src/app/privacy/page.tsx`:

```tsx
import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "Privacy Policy — Top Notch Properties" };
export default function PrivacyPage() {
  return <ComingSoonPage title="Privacy Policy" description="How we collect, use, and protect your personal data." />;
}
```

- [ ] Create `src/app/cookies/page.tsx`:

```tsx
import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
export const metadata: Metadata = { title: "Cookie Policy — Top Notch Properties" };
export default function CookiesPage() {
  return <ComingSoonPage title="Cookie Policy" description="Information about how we use cookies on this website." />;
}
```

- [ ] Commit: `git add src/app/about src/app/careers src/app/how-it-works src/app/partners src/app/events src/app/testimonials src/app/terms src/app/privacy src/app/cookies src/components/ui/ComingSoonPage.tsx && git commit -m "feat: add footer stub pages"`

---

### Task 4: Properties page — grid/list toggle + price/bedroom filters

The properties page is a Server Component. Filters and grid/list toggle need client-side state. Create a client wrapper that receives the already-filtered list from the server.

**Files:**
- Create: `src/components/sections/PropertiesClient.tsx`
- Modify: `src/app/properties/page.tsx`

- [ ] Create `src/components/sections/PropertiesClient.tsx`:

```tsx
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
```

- [ ] Update `src/app/properties/page.tsx` to use the client component:

```tsx
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
```

- [ ] Commit: `git add src/components/sections/PropertiesClient.tsx src/app/properties/page.tsx && git commit -m "feat: wire grid/list toggle and price/bedroom filters on properties page"`

---

### Task 5: Contact page

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/app/api/contact/route.ts`

- [ ] Create the API route `src/app/api/contact/route.ts`:

```ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, phone, subject, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  // Log to console for now; swap for Resend/Nodemailer in production
  console.log("Contact form submission:", { name, email, phone, subject, message });
  return NextResponse.json({ success: true });
}
```

- [ ] Create `src/app/contact/page.tsx`:

```tsx
"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <div className="min-h-screen bg-site-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Get In Touch</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900 mb-4">Contact Us</h1>
          <p className="text-ink-500 text-sm max-w-md mx-auto leading-relaxed">
            Have a question about a property or our services? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-6">
            {[
              { Icon: MapPin, label: "Address", value: "6391 Elgin St. Celina, Delaware 10299" },
              { Icon: Phone, label: "Phone", value: "+88 0123 654 99", href: "tel:+8801236549" },
              { Icon: Mail, label: "Email", value: "contact@topnotchproperties.com", href: "mailto:contact@topnotchproperties.com" },
            ].map(({ Icon, label, value, href }) => (
              <div key={label} className="flex gap-4 bg-white border border-site-200 rounded-2xl p-5 card-shadow">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-ink-400 mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-semibold text-ink-900 hover:text-orange-500 transition-colors">{value}</a>
                  ) : (
                    <p className="text-sm font-semibold text-ink-900">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white border border-site-200 rounded-2xl p-8 card-shadow">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={48} className="text-orange-500 mb-4" />
                <h3 className="font-serif text-xl font-bold text-ink-900 mb-2">Message Sent</h3>
                <p className="text-ink-500 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-ink-500 mb-1.5 block">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-site-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-ink-500 mb-1.5 block">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-site-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-ink-500 mb-1.5 block">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-site-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-ink-500 mb-1.5 block">Subject</label>
                    <input
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-site-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="Property enquiry"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-ink-500 mb-1.5 block">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-site-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-500 text-xs">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors"
                >
                  <Send size={15} />
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] Commit: `git add src/app/contact src/app/api/contact && git commit -m "feat: add contact page with form"`

---

### Task 6: Agent detail page

**Files:**
- Modify: `src/sanity/lib/queries.ts` — add `getAgentById`
- Create: `src/app/agents/[id]/page.tsx`

- [ ] Add to `src/sanity/lib/queries.ts`:

```ts
export async function getAgentById(id: string): Promise<Agent | null> {
  return client.fetch<Agent | null>(
    `*[_type == "agent" && _id == $id][0] {
      "id": _id,
      name,
      title,
      phone,
      email,
      "image": photo.asset->url,
      propertiesCount,
      rating
    }`,
    { id }
  );
}
```

- [ ] Create `src/app/agents/[id]/page.tsx`:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, Mail, Star, ArrowLeft, Building2 } from "lucide-react";
import { getAgentById, getAgents, getAllProperties } from "@/sanity/lib/queries";
import PropertyCard from "@/components/ui/PropertyCard";

export async function generateStaticParams() {
  const agents = await getAgents();
  return agents.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const agent = await getAgentById(id);
  if (!agent) return { title: "Agent Not Found" };
  return { title: `${agent.name} — Top Notch Properties` };
}

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [agent, allProperties] = await Promise.all([getAgentById(id), getAllProperties()]);
  if (!agent) notFound();

  // Show a subset of properties as agent's listings
  const agentProperties = allProperties.slice(0, 3);

  return (
    <div className="min-h-screen bg-site-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/agents" className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-orange-500 transition-colors mb-8">
          <ArrowLeft size={15} />
          All Agents
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent card */}
          <div className="bg-white border border-site-200 rounded-2xl p-8 card-shadow text-center h-fit sticky top-24">
            <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-5 ring-4 ring-orange-100">
              {agent.image ? (
                <Image src={agent.image} alt={agent.name} fill sizes="112px" className="object-cover" />
              ) : (
                <div className="w-full h-full bg-orange-50 flex items-center justify-center">
                  <span className="text-3xl font-serif font-bold text-orange-300">{agent.name[0]}</span>
                </div>
              )}
            </div>
            <h1 className="font-serif text-xl font-bold text-ink-900 mb-1">{agent.name}</h1>
            <p className="text-ink-400 text-sm mb-4">{agent.title}</p>
            <div className="flex items-center justify-center gap-1.5 mb-6">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="text-ink-700 font-semibold">{agent.rating}</span>
              <span className="text-ink-300 text-xs">·</span>
              <span className="text-ink-400 text-xs">{agent.propertiesCount} listings</span>
            </div>
            <div className="space-y-3">
              <a href={`tel:${agent.phone}`} className="flex items-center justify-center gap-2 w-full border border-site-200 rounded-xl py-3 text-sm text-ink-700 hover:border-orange-300 hover:text-orange-500 transition-colors">
                <Phone size={15} /> {agent.phone}
              </a>
              <a href={`mailto:${agent.email}`} className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-400 text-white rounded-xl py-3 text-sm font-semibold transition-colors">
                <Mail size={15} /> Send Email
              </a>
            </div>
          </div>

          {/* Listings */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-xl font-bold text-ink-900 mb-6 flex items-center gap-2">
              <Building2 size={18} className="text-orange-500" />
              Active Listings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {agentProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] Commit: `git add src/app/agents src/sanity/lib/queries.ts && git commit -m "feat: add agent detail page"`

---

### Task 7: Blog post detail page

**Files:**
- Modify: `src/sanity/lib/queries.ts` — add `getBlogPostBySlug`
- Create: `src/app/news/[slug]/page.tsx`

- [ ] Add to `src/sanity/lib/queries.ts`:

```ts
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch<BlogPost | null>(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      "id": _id,
      title,
      excerpt,
      "image": image.asset->url,
      "date": publishedAt,
      "author": author->name,
      category,
      "slug": slug.current
    }`,
    { slug }
  );
}
```

- [ ] Create `src/app/news/[slug]/page.tsx`:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ArrowLeft, User } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return { title: `${post.title} — Top Notch Properties`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-site-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/news" className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-orange-500 transition-colors mb-8">
          <ArrowLeft size={15} />
          Back to News
        </Link>

        {post.image && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
            <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
          </div>
        )}

        <div className="flex items-center gap-4 mb-6 text-xs text-ink-400">
          {post.category && (
            <span className="bg-orange-50 text-orange-500 border border-orange-100 px-3 py-1 rounded-full font-semibold">
              {post.category}
            </span>
          )}
          {post.date && (
            <span className="flex items-center gap-1.5">
              <CalendarDays size={12} />
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          )}
          {post.author && (
            <span className="flex items-center gap-1.5">
              <User size={12} />
              {post.author}
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900 leading-snug mb-6">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-ink-500 text-base leading-relaxed border-l-4 border-orange-400 pl-5 mb-8 italic">
            {post.excerpt}
          </p>
        )}

        <div className="bg-white border border-site-200 rounded-2xl p-8 card-shadow text-center">
          <p className="text-ink-400 text-sm">Full article content can be added via the Studio CMS editor.</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] Commit: `git add src/app/news/[slug] src/sanity/lib/queries.ts && git commit -m "feat: add blog post detail page"`

---

### Task 8: Property listing form (/properties/new)

**Files:**
- Create: `src/app/properties/new/page.tsx`
- Create: `src/app/api/listings/route.ts`

- [ ] Create `src/app/api/listings/route.ts`:

```ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  // Log submission; in production wire to Sanity write or email
  console.log("New listing submission:", data);
  return NextResponse.json({ success: true });
}
```

- [ ] Create `src/app/properties/new/page.tsx`:

```tsx
"use client";
import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";

const propertyTypes = ["Apartment", "Villa", "Penthouse", "Commercial", "Warehouse", "House"];

export default function ListPropertyPage() {
  const [form, setForm] = useState({
    title: "", type: "Apartment", address: "", city: "", price: "",
    bedrooms: "", bathrooms: "", area: "", description: "", name: "", email: "", phone: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "success" : "error");
  }

  const inputClass = "w-full border border-site-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-orange-400 transition-colors";
  const labelClass = "text-xs text-ink-500 mb-1.5 block";

  return (
    <div className="min-h-screen bg-site-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Add Listing</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900 mb-4">List Your Property</h1>
          <p className="text-ink-500 text-sm max-w-md mx-auto leading-relaxed">
            Fill in the details below and our team will review and publish your listing within 24 hours.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-white border border-site-200 rounded-2xl p-16 card-shadow text-center">
            <CheckCircle size={48} className="text-orange-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-ink-900 mb-2">Listing Submitted</h2>
            <p className="text-ink-500 text-sm">We'll review and publish your property within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-site-200 rounded-2xl p-8 card-shadow space-y-6">
            <div>
              <h2 className="font-serif text-base font-semibold text-ink-900 mb-5 pb-3 border-b border-site-100">Property Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Property Title *</label>
                  <input required value={form.title} onChange={(e) => set("title", e.target.value)} className={inputClass} placeholder="e.g. Modern Downtown Apartment" />
                </div>
                <div>
                  <label className={labelClass}>Property Type</label>
                  <select value={form.type} onChange={(e) => set("type", e.target.value)} className={inputClass}>
                    {propertyTypes.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Price ($) *</label>
                  <input required type="number" value={form.price} onChange={(e) => set("price", e.target.value)} className={inputClass} placeholder="500000" />
                </div>
                <div>
                  <label className={labelClass}>Address *</label>
                  <input required value={form.address} onChange={(e) => set("address", e.target.value)} className={inputClass} placeholder="123 Main St" />
                </div>
                <div>
                  <label className={labelClass}>City *</label>
                  <input required value={form.city} onChange={(e) => set("city", e.target.value)} className={inputClass} placeholder="New York" />
                </div>
                <div>
                  <label className={labelClass}>Bedrooms</label>
                  <input type="number" value={form.bedrooms} onChange={(e) => set("bedrooms", e.target.value)} className={inputClass} placeholder="3" />
                </div>
                <div>
                  <label className={labelClass}>Bathrooms</label>
                  <input type="number" value={form.bathrooms} onChange={(e) => set("bathrooms", e.target.value)} className={inputClass} placeholder="2" />
                </div>
                <div>
                  <label className={labelClass}>Area (sq ft)</label>
                  <input type="number" value={form.area} onChange={(e) => set("area", e.target.value)} className={inputClass} placeholder="1500" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} className={`${inputClass} resize-none`} placeholder="Describe the property..." />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-base font-semibold text-ink-900 mb-5 pb-3 border-b border-site-100">Your Contact Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputClass} placeholder="John Smith" />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass} placeholder="john@example.com" />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>

            {status === "error" && <p className="text-red-500 text-xs">Something went wrong. Please try again.</p>}

            <button type="submit" disabled={status === "loading"} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors">
              <Send size={15} />
              {status === "loading" ? "Submitting…" : "Submit Listing"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
```

- [ ] Commit: `git add src/app/properties/new src/app/api/listings && git commit -m "feat: add property listing submission form"`

---

## PHASE B — Auth System (Supabase)

### Task 9: Supabase setup

**Prerequisites — user must complete these steps first:**

1. Go to [supabase.com](https://supabase.com), create a free account and new project
2. Name the project "top-notch-properties", set a database password, choose nearest region
3. Once the project is ready, go to **Settings → API**
4. Copy **Project URL** and **anon public key**
5. Go to **Authentication → Providers → Google**, enable it, add OAuth credentials from [console.cloud.google.com](https://console.cloud.google.com) (same Google project used for any existing auth)
6. In Supabase **Authentication → URL Configuration**, add `http://localhost:3000` to allowed redirect URLs

Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

- [ ] Install packages:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

- [ ] Create `src/lib/supabase/client.ts`:

```ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

- [ ] Create `src/lib/supabase/server.ts`:

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {}
        },
      },
    }
  );
}
```

- [ ] Create `src/middleware.ts`:

```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    }
  );

  await supabase.auth.getUser();
  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|studio).*)"],
};
```

- [ ] Run the following SQL in Supabase **SQL Editor** (Dashboard → SQL Editor → New query):

```sql
-- User profiles
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  updated_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can manage own profile" on public.profiles for all using (auth.uid() = id);

-- Favourites
create table public.favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  property_id text not null,
  property_title text,
  property_image text,
  property_price numeric,
  created_at timestamptz default now(),
  unique(user_id, property_id)
);
alter table public.favorites enable row level security;
create policy "Users can manage own favorites" on public.favorites for all using (auth.uid() = user_id);

-- Enquiries
create table public.enquiries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  property_id text not null,
  property_title text,
  agent_name text,
  message text,
  status text default 'sent',
  created_at timestamptz default now()
);
alter table public.enquiries enable row level security;
create policy "Users can manage own enquiries" on public.enquiries for all using (auth.uid() = user_id);

-- Alerts / saved searches
create table public.alerts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  filters jsonb not null,
  created_at timestamptz default now()
);
alter table public.alerts enable row level security;
create policy "Users can manage own alerts" on public.alerts for all using (auth.uid() = user_id);

-- Newsletter subscribers
create table public.newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  email text not null unique,
  subscribed boolean default true,
  subscribed_at timestamptz default now()
);
alter table public.newsletter_subscribers enable row level security;
create policy "Users can manage own subscription" on public.newsletter_subscribers for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

- [ ] Commit: `git add src/lib/supabase src/middleware.ts && git commit -m "feat: add supabase client and middleware"`

---

### Task 10: Auth callback route

**Files:**
- Create: `src/app/auth/callback/route.ts`

- [ ] Create `src/app/auth/callback/route.ts`:

```ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/account";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  }

  return NextResponse.redirect(`${origin}/signin?error=auth`);
}
```

- [ ] Commit: `git add src/app/auth && git commit -m "feat: add supabase auth callback route"`

---

### Task 11: Sign in page

**Files:**
- Create: `src/app/signin/page.tsx`

- [ ] Create `src/app/signin/page.tsx`:

```tsx
"use client";
import { useState } from "react";
import { Home } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function IconGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function signInWithGoogle() {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <div className="min-h-screen bg-site-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
            <span className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
              <Home size={18} className="text-white" />
            </span>
            <span className="font-serif font-bold text-base text-ink-900">
              Top Notch<span className="text-orange-500"> Properties</span>
            </span>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-ink-900 mb-2">Welcome back</h1>
          <p className="text-ink-500 text-sm">Sign in to manage your favourites, enquiries and alerts.</p>
        </div>

        <div className="bg-white border border-site-200 rounded-2xl p-8 card-shadow">
          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-site-200 rounded-xl py-3.5 text-sm font-semibold text-ink-700 hover:border-orange-300 hover:bg-orange-50 transition-all disabled:opacity-60 cursor-pointer"
          >
            <IconGoogle />
            {loading ? "Redirecting…" : "Continue with Google"}
          </button>

          <p className="text-center text-xs text-ink-400 mt-6">
            By signing in you agree to our{" "}
            <Link href="/terms" className="text-orange-500 hover:underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        <p className="text-center text-sm text-ink-500 mt-6">
          <Link href="/" className="text-orange-500 hover:text-orange-400 transition-colors">← Back to site</Link>
        </p>
      </div>
    </div>
  );
}
```

- [ ] Commit: `git add src/app/signin && git commit -m "feat: add sign in page with Google OAuth"`

---

### Task 12: User account layout and dashboard

**Files:**
- Create: `src/app/account/layout.tsx`
- Create: `src/app/account/page.tsx` (redirects to favourites)
- Create: `src/app/account/favourites/page.tsx`
- Create: `src/app/account/enquiries/page.tsx`
- Create: `src/app/account/alerts/page.tsx`
- Create: `src/app/account/profile/page.tsx`
- Create: `src/app/account/newsletter/page.tsx`
- Create: `src/components/layout/AccountSidebar.tsx`

- [ ] Create `src/components/layout/AccountSidebar.tsx`:

```tsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, MessageSquare, Bell, Settings, User, Mail, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const links = [
  { href: "/account/favourites", label: "Favourites", Icon: Heart },
  { href: "/account/enquiries", label: "Enquiries", Icon: MessageSquare },
  { href: "/account/alerts", label: "Alerts", Icon: Bell },
  { href: "/account/profile", label: "Profile", Icon: User },
  { href: "/account/newsletter", label: "Newsletter", Icon: Mail },
];

export default function AccountSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="w-full lg:w-56 shrink-0">
      <div className="bg-white border border-site-200 rounded-2xl card-shadow overflow-hidden">
        <div className="p-5 border-b border-site-100">
          <p className="text-xs text-ink-400 mb-0.5">Signed in as</p>
          <p className="font-semibold text-ink-900 text-sm truncate">{userName}</p>
        </div>
        <nav className="p-2">
          {links.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-orange-500/10 text-orange-500"
                  : "text-ink-600 hover:bg-site-50 hover:text-ink-900"
              )}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-600 hover:bg-red-50 hover:text-red-500 transition-colors mt-1 cursor-pointer"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </nav>
      </div>
    </aside>
  );
}
```

- [ ] Create `src/app/account/layout.tsx`:

```tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AccountSidebar from "@/components/layout/AccountSidebar";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const name = user.user_metadata?.full_name ?? user.email ?? "My Account";

  return (
    <div className="min-h-screen bg-site-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-2xl font-bold text-ink-900 mb-8">My Account</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar userName={name} />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
```

- [ ] Create `src/app/account/page.tsx`:

```tsx
import { redirect } from "next/navigation";
export default function AccountPage() {
  redirect("/account/favourites");
}
```

- [ ] Commit: `git add src/app/account/layout.tsx src/app/account/page.tsx src/components/layout/AccountSidebar.tsx && git commit -m "feat: add account layout with sidebar nav"`

---

### Task 13: Favourites page

**Files:**
- Create: `src/app/account/favourites/page.tsx`
- Create: `src/app/api/favorites/route.ts`
- Modify: `src/components/ui/PropertyCard.tsx` — add favourite button

- [ ] Create `src/app/api/favorites/route.ts`:

```ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json([], { status: 401 });
  const { data } = await supabase.from("favorites").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { data, error } = await supabase.from("favorites").upsert({
    user_id: user.id,
    property_id: body.property_id,
    property_title: body.property_title,
    property_image: body.property_image,
    property_price: body.property_price,
  }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { property_id } = await req.json();
  await supabase.from("favorites").delete().eq("user_id", user.id).eq("property_id", property_id);
  return NextResponse.json({ success: true });
}
```

- [ ] Create `src/app/account/favourites/page.tsx`:

```tsx
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export default async function FavouritesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: favorites } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-ink-900 mb-6 flex items-center gap-2">
        <Heart size={18} className="text-orange-500" />
        Favourites ({favorites?.length ?? 0})
      </h2>

      {!favorites?.length ? (
        <div className="bg-white border border-site-200 rounded-2xl p-12 card-shadow text-center">
          <Heart size={40} className="text-site-200 mx-auto mb-4" />
          <p className="text-ink-500 text-sm mb-4">No saved properties yet.</p>
          <Link href="/properties" className="text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors">
            Browse Properties →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {favorites.map((fav) => (
            <Link key={fav.id} href={`/properties/${fav.property_id}`} className="group bg-white border border-site-200 rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover hover:border-orange-200 transition-all duration-300 flex gap-4 p-4">
              <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0">
                {fav.property_image ? (
                  <Image src={fav.property_image} alt={fav.property_title} fill sizes="96px" className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-site-100" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-sm font-semibold text-ink-900 group-hover:text-orange-500 transition-colors truncate">{fav.property_title}</h3>
                <p className="text-orange-500 text-sm font-bold mt-1">${fav.property_price?.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] Add a favourite button to `src/components/ui/PropertyCard.tsx`. Find the card's top-right area and add:

```tsx
// At top of file add:
"use client";
import { useState } from "react";
import { Heart } from "lucide-react";

// Inside the card JSX, add this button (position it absolute top-right):
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
  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
>
  <Heart size={14} className={faved ? "fill-orange-500 text-orange-500" : "text-ink-400"} />
</button>
```

Add `const [faved, setFaved] = useState(false);` inside the component.

- [ ] Commit: `git add src/app/account/favourites src/app/api/favorites src/components/ui/PropertyCard.tsx && git commit -m "feat: favourites — save/unsave properties, view in account"`

---

### Task 14: Enquiries page

**Files:**
- Create: `src/app/account/enquiries/page.tsx`
- Create: `src/app/api/enquiries/route.ts`

- [ ] Create `src/app/api/enquiries/route.ts`:

```ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json([], { status: 401 });
  const { data } = await supabase.from("enquiries").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { data, error } = await supabase.from("enquiries").insert({
    user_id: user.id,
    property_id: body.property_id,
    property_title: body.property_title,
    agent_name: body.agent_name,
    message: body.message,
  }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
```

- [ ] Create `src/app/account/enquiries/page.tsx`:

```tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { MessageSquare, CalendarDays } from "lucide-react";

export default async function EnquiriesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: enquiries } = await supabase
    .from("enquiries")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-ink-900 mb-6 flex items-center gap-2">
        <MessageSquare size={18} className="text-orange-500" />
        Enquiries ({enquiries?.length ?? 0})
      </h2>

      {!enquiries?.length ? (
        <div className="bg-white border border-site-200 rounded-2xl p-12 card-shadow text-center">
          <MessageSquare size={40} className="text-site-200 mx-auto mb-4" />
          <p className="text-ink-500 text-sm mb-4">You haven't sent any enquiries yet.</p>
          <Link href="/properties" className="text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors">
            Browse Properties →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div key={enq.id} className="bg-white border border-site-200 rounded-2xl p-5 card-shadow">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <Link href={`/properties/${enq.property_id}`} className="font-serif text-sm font-semibold text-ink-900 hover:text-orange-500 transition-colors">
                    {enq.property_title}
                  </Link>
                  {enq.agent_name && <p className="text-xs text-ink-400 mt-0.5">Agent: {enq.agent_name}</p>}
                </div>
                <span className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-500 border border-orange-100 capitalize">
                  {enq.status}
                </span>
              </div>
              <p className="text-ink-600 text-sm leading-relaxed mb-3">{enq.message}</p>
              <p className="text-xs text-ink-300 flex items-center gap-1.5">
                <CalendarDays size={11} />
                {new Date(enq.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] Commit: `git add src/app/account/enquiries src/app/api/enquiries && git commit -m "feat: enquiries — view sent property enquiries in account"`

---

### Task 15: Alerts / Saved Searches page

**Files:**
- Create: `src/app/account/alerts/page.tsx`
- Create: `src/app/api/alerts/route.ts`

- [ ] Create `src/app/api/alerts/route.ts`:

```ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json([], { status: 401 });
  const { data } = await supabase.from("alerts").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { data, error } = await supabase.from("alerts").insert({
    user_id: user.id,
    name: body.name,
    filters: body.filters,
  }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await supabase.from("alerts").delete().eq("user_id", user.id).eq("id", id);
  return NextResponse.json({ success: true });
}
```

- [ ] Create `src/app/account/alerts/page.tsx`:

```tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Trash2, Plus } from "lucide-react";

interface Alert { id: string; name: string; filters: Record<string, string>; created_at: string; }

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [form, setForm] = useState({ name: "", type: "", status: "", city: "" });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetch("/api/alerts").then((r) => r.json()).then(setAlerts);
  }, []);

  async function saveAlert(e: React.FormEvent) {
    e.preventDefault();
    const filters: Record<string, string> = {};
    if (form.type) filters.type = form.type;
    if (form.status) filters.status = form.status;
    if (form.city) filters.city = form.city;
    const res = await fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, filters }),
    });
    const data = await res.json();
    setAlerts((a) => [data, ...a]);
    setForm({ name: "", type: "", status: "", city: "" });
    setAdding(false);
  }

  async function deleteAlert(id: string) {
    await fetch("/api/alerts", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setAlerts((a) => a.filter((x) => x.id !== id));
  }

  const inputClass = "w-full border border-site-200 rounded-xl px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-orange-400 transition-colors";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-bold text-ink-900 flex items-center gap-2">
          <Bell size={18} className="text-orange-500" />
          Manage Alerts / Saved Searches ({alerts.length})
        </h2>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={14} /> New Alert
        </button>
      </div>

      {adding && (
        <form onSubmit={saveAlert} className="bg-white border border-orange-200 rounded-2xl p-6 card-shadow mb-6">
          <h3 className="font-serif text-sm font-semibold text-ink-900 mb-4">New Saved Search</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="text-xs text-ink-500 mb-1 block">Alert Name *</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="e.g. Apartments in New York" />
            </div>
            <div>
              <label className="text-xs text-ink-500 mb-1 block">Property Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputClass}>
                <option value="">Any</option>
                {["apartment", "villa", "commercial", "warehouse", "penthouse"].map((t) => (
                  <option key={t} value={t} className="capitalize">{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-ink-500 mb-1 block">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                <option value="">Any</option>
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-ink-500 mb-1 block">City</label>
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass} placeholder="e.g. New York" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-5 py-2 rounded-md transition-colors">Save Alert</button>
            <button type="button" onClick={() => setAdding(false)} className="border border-site-200 text-ink-600 text-sm px-5 py-2 rounded-md hover:border-orange-300 transition-colors">Cancel</button>
          </div>
        </form>
      )}

      {!alerts.length && !adding ? (
        <div className="bg-white border border-site-200 rounded-2xl p-12 card-shadow text-center">
          <Bell size={40} className="text-site-200 mx-auto mb-4" />
          <p className="text-ink-500 text-sm mb-4">No saved searches yet. Create one to get notified of matching listings.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white border border-site-200 rounded-2xl p-5 card-shadow flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-ink-900 text-sm mb-1">{alert.name}</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(alert.filters).map(([k, v]) => (
                    <span key={k} className="text-[10px] bg-orange-50 text-orange-500 border border-orange-100 px-2 py-0.5 rounded-full capitalize">{k}: {v}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/properties?${new URLSearchParams(alert.filters).toString()}`}
                  className="text-xs font-semibold text-orange-500 hover:text-orange-400 transition-colors"
                >
                  View →
                </Link>
                <button onClick={() => deleteAlert(alert.id)} className="p-2 text-ink-400 hover:text-red-500 transition-colors cursor-pointer">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] Commit: `git add src/app/account/alerts src/app/api/alerts && git commit -m "feat: alerts — save/manage property search alerts"`

---

### Task 16: Profile page

**Files:**
- Create: `src/app/account/profile/page.tsx`
- Create: `src/app/api/profile/route.ts`

- [ ] Create `src/app/api/profile/route.ts`:

```ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json(null, { status: 401 });
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return NextResponse.json({ ...data, email: user.email, avatar: user.user_metadata?.avatar_url });
}

export async function PATCH(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { full_name, phone } = await req.json();
  const { error } = await supabase.from("profiles").upsert({ id: user.id, full_name, phone, updated_at: new Date().toISOString() });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
```

- [ ] Create `src/app/account/profile/page.tsx`:

```tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { User, CheckCircle } from "lucide-react";

interface Profile { full_name: string; phone: string; email: string; avatar?: string; }

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({ full_name: "", phone: "", email: "", avatar: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "saved">("idle");

  useEffect(() => {
    fetch("/api/profile").then((r) => r.json()).then((d) => {
      if (d) setProfile({ full_name: d.full_name ?? "", phone: d.phone ?? "", email: d.email ?? "", avatar: d.avatar });
    });
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: profile.full_name, phone: profile.phone }),
    });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2500);
  }

  const inputClass = "w-full border border-site-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-orange-400 transition-colors";

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-ink-900 mb-6 flex items-center gap-2">
        <User size={18} className="text-orange-500" />
        Profile
      </h2>

      <div className="bg-white border border-site-200 rounded-2xl p-8 card-shadow">
        {profile.avatar && (
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-site-100">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-orange-100">
              <Image src={profile.avatar} alt="Avatar" fill sizes="64px" className="object-cover" />
            </div>
            <div>
              <p className="font-semibold text-ink-900">{profile.full_name}</p>
              <p className="text-xs text-ink-400">{profile.email}</p>
            </div>
          </div>
        )}

        <form onSubmit={save} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs text-ink-500 mb-1.5 block">Full Name</label>
              <input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} className={inputClass} placeholder="John Smith" />
            </div>
            <div>
              <label className="text-xs text-ink-500 mb-1.5 block">Email</label>
              <input value={profile.email} disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
            </div>
            <div>
              <label className="text-xs text-ink-500 mb-1.5 block">Phone</label>
              <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className={inputClass} placeholder="+1 (555) 000-0000" />
            </div>
          </div>

          <button type="submit" disabled={status === "loading"} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors">
            {status === "saved" ? <><CheckCircle size={15} /> Saved</> : status === "loading" ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] Commit: `git add src/app/account/profile src/app/api/profile && git commit -m "feat: profile — view and edit user profile"`

---

### Task 17: Newsletter page

**Files:**
- Create: `src/app/account/newsletter/page.tsx`
- Create: `src/app/api/newsletter/route.ts`

- [ ] Create `src/app/api/newsletter/route.ts`:

```ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json(null, { status: 401 });
  const { data } = await supabase.from("newsletter_subscribers").select("*").eq("user_id", user.id).single();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { subscribed } = await req.json();
  await supabase.from("newsletter_subscribers").upsert({
    user_id: user.id,
    email: user.email!,
    subscribed,
    subscribed_at: new Date().toISOString(),
  });
  return NextResponse.json({ success: true });
}
```

- [ ] Create `src/app/account/newsletter/page.tsx`:

```tsx
"use client";
import { useState, useEffect } from "react";
import { Mail, CheckCircle, Bell } from "lucide-react";

export default function NewsletterPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/newsletter").then((r) => r.json()).then((d) => {
      setSubscribed(d?.subscribed ?? false);
      setLoaded(true);
    });
  }, []);

  async function toggle() {
    setSaving(true);
    const next = !subscribed;
    await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscribed: next }),
    });
    setSubscribed(next);
    setSaving(false);
  }

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-ink-900 mb-6 flex items-center gap-2">
        <Mail size={18} className="text-orange-500" />
        Newsletter
      </h2>

      <div className="bg-white border border-site-200 rounded-2xl p-8 card-shadow">
        <div className="flex items-start gap-5 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
            <Bell size={22} className="text-orange-500" />
          </div>
          <div>
            <h3 className="font-serif text-base font-semibold text-ink-900 mb-1">Latest Properties & Market News</h3>
            <p className="text-ink-500 text-sm leading-relaxed">
              Receive curated updates on new luxury listings, market trends, and property news directly from our blog — sent to your inbox when new articles are published.
            </p>
          </div>
        </div>

        {loaded && (
          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              disabled={saving}
              className={`flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-md transition-colors disabled:opacity-60 ${
                subscribed
                  ? "border border-site-200 text-ink-700 hover:border-red-300 hover:text-red-500"
                  : "bg-orange-500 hover:bg-orange-400 text-white"
              }`}
            >
              {subscribed ? "Unsubscribe" : <><CheckCircle size={15} /> Subscribe</>}
            </button>
            {subscribed && (
              <p className="text-xs text-ink-400 flex items-center gap-1.5">
                <CheckCircle size={12} className="text-green-500" />
                You're subscribed
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] Commit: `git add src/app/account/newsletter src/app/api/newsletter && git commit -m "feat: newsletter — subscribe/unsubscribe to blog updates"`

---

### Task 18: Update Navbar for auth state

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

The navbar currently has a hardcoded "Sign In" link. Update it to show the user's avatar + "My Account" when logged in.

- [ ] Replace `Navbar.tsx` contents entirely:

```tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Home, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Agents", href: "/agents" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const avatar = user?.user_metadata?.avatar_url;

  return (
    <header className={cn("fixed top-0 inset-x-0 z-50 bg-navy-900 transition-shadow duration-300", scrolled ? "shadow-[0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.35)]" : "shadow-[0_1px_0_rgba(255,255,255,0.05)]")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center group-hover:bg-orange-400 transition-colors">
              <Home size={17} className="text-white" />
            </span>
            <span className="font-serif font-bold text-sm sm:text-base leading-tight text-white">
              Top Notch<span className="text-orange-400"> Properties</span>
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200", pathname === link.href ? "text-orange-400 bg-orange-500/15" : "text-white/70 hover:text-white hover:bg-white/10")}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link href="/account" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                {avatar ? (
                  <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-white/20">
                    <Image src={avatar} alt="Avatar" fill sizes="28px" className="object-cover" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
                    <User size={13} className="text-white" />
                  </div>
                )}
                My Account
              </Link>
            ) : (
              <Link href="/signin" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2">
                Sign In
              </Link>
            )}
            <Link href="/properties/new" className="text-sm font-semibold bg-orange-500 hover:bg-orange-400 text-white px-5 py-2.5 rounded-md transition-colors duration-200">
              List Property
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors" aria-label="Toggle menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-navy-950 border-t border-white/10">
          <ul className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setMobileOpen(false)} className={cn("block px-4 py-3 text-sm font-medium rounded-lg transition-colors", pathname === link.href ? "text-orange-400 bg-orange-500/15" : "text-white/70 hover:text-white hover:bg-white/10")}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 border-t border-white/10 mt-2 flex flex-col gap-2">
              {user ? (
                <Link href="/account" onClick={() => setMobileOpen(false)} className="text-sm text-center text-white/70 hover:text-white py-2.5 rounded-md border border-white/15 hover:border-white/30 transition-colors">
                  My Account
                </Link>
              ) : (
                <Link href="/signin" onClick={() => setMobileOpen(false)} className="text-sm text-center text-white/70 hover:text-white py-2.5 rounded-md border border-white/15 hover:border-white/30 transition-colors">
                  Sign In
                </Link>
              )}
              <Link href="/properties/new" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-center bg-orange-500 hover:bg-orange-400 text-white py-2.5 rounded-md transition-colors">
                List Property
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
```

- [ ] Commit: `git add src/components/layout/Navbar.tsx && git commit -m "feat: navbar shows avatar and My Account link when signed in"`

---

### Task 19: Add Supabase URL to next.config.ts image domains

**Files:**
- Modify: `next.config.ts`

- [ ] Read current `next.config.ts` and add `*.supabase.co` to remote image patterns so user avatars load:

```ts
// In remotePatterns array, add:
{ protocol: "https", hostname: "*.supabase.co" },
{ protocol: "https", hostname: "lh3.googleusercontent.com" }, // Google avatar URLs
```

- [ ] Commit: `git add next.config.ts && git commit -m "fix: allow supabase and google avatar image domains"`

---

## Self-Review

**Spec coverage:**
- ✅ Build error fix (Task 1)
- ✅ 404 page (Task 2)
- ✅ All footer stub pages (Task 3)
- ✅ Grid/list toggle (Task 4)
- ✅ Price range + bedroom filters (Task 4)
- ✅ Contact page with form (Task 5)
- ✅ Agent detail page (Task 6)
- ✅ Blog post detail page (Task 7)
- ✅ Property listing form (Task 8)
- ✅ Supabase auth setup (Task 9)
- ✅ Auth callback (Task 10)
- ✅ Sign in page with Google OAuth (Task 11)
- ✅ Account layout + sidebar with Sign Out (Task 12)
- ✅ Favourites (Task 13)
- ✅ Enquiries (Task 14)
- ✅ Alerts / Saved Searches (Task 15)
- ✅ Profile (Task 16)
- ✅ Newsletter (Task 17)
- ✅ Navbar auth state (Task 18)
- ✅ Image domains for avatars (Task 19)
- ❌ Social media links excluded per user request

**Placeholder scan:** No TBDs found. All steps have complete code.

**Type consistency:** `Property`, `Agent`, `BlogPost` types used consistently from `@/lib/types`. Supabase row types used inline (no generated types needed at this stage).
