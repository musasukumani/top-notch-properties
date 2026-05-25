import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  Home,
  ChevronRight,
  Phone,
  Mail,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { getAllProperties, getPropertyById, getAgents } from "@/sanity/lib/queries";
import { formatArea } from "@/lib/utils";
import PropertyCard from "@/components/ui/PropertyCard";
import StarRating from "@/components/ui/StarRating";
import DetailFavoriteButton from "@/components/ui/DetailFavoriteButton";
import EnquiryModal from "@/components/ui/EnquiryModal";


interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) return { title: "Property Not Found" };
  return {
    title: `${property.title} — Top Notch Properties`,
    description: property.description,
  };
}

export async function generateStaticParams() {
  try {
    const properties = await getAllProperties();
    return properties.map((p) => ({ id: p.id }));
  } catch {
    return [];
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const [property, allAgents, allProperties] = await Promise.all([
    getPropertyById(id),
    getAgents(),
    getAllProperties(),
  ]);
  if (!property) notFound();

  const agentIndex = id.charCodeAt(id.length - 1) % allAgents.length;
  const agent = allAgents[agentIndex] ?? allAgents[0];
  const related = allProperties.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);
  const fallbackRelated = allProperties.filter((p) => p.id !== property.id).slice(0, 3);
  const relatedProperties = related.length >= 2 ? related : fallbackRelated;

  const FALLBACK_IMAGES: Record<string, string[]> = {
    villa: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    penthouse: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    ],
    apartment: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=800&q=80",
      "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=800&q=80",
    ],
    default: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
  };

  const rawGallery: string[] = property.gallery?.filter(Boolean).length
    ? property.gallery.filter(Boolean)
    : [property.image];

  const fallbacks = FALLBACK_IMAGES[property.type] ?? FALLBACK_IMAGES.default;
  const gallery = [...rawGallery];
  while (gallery.length < 5) {
    gallery.push(fallbacks[(gallery.length - 1) % fallbacks.length]);
  }

  const isRent = property.status === "for-rent";

  const specs = [
    { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms },
    { icon: Maximize2, label: "Floor Area", value: formatArea(property.area) },
    { icon: Calendar, label: "Year Built", value: property.yearBuilt },
    { icon: Home, label: "Property Type", value: property.type.charAt(0).toUpperCase() + property.type.slice(1) },
    { icon: MapPin, label: "City", value: property.city },
  ];

  return (
    <div className="min-h-screen bg-site-50 pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-site-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-1.5 text-xs text-ink-400">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/properties" className="hover:text-orange-500 transition-colors">Properties</Link>
            <ChevronRight size={12} />
            <span className="text-ink-700 font-medium truncate max-w-[200px]">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Main column ── */}
          <div className="flex-1 min-w-0">

            {/* Gallery */}
            <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden mb-8 h-[420px]">
              <div className="col-span-2 row-span-2 relative">
                <Image
                  src={gallery[0]}
                  alt={property.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {gallery.slice(1, 5).map((src, i) => (
                <div key={i} className="relative overflow-hidden">
                  <Image
                    src={src}
                    alt={`${property.title} — view ${i + 2}`}
                    fill
                    sizes="25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {i === 3 && gallery.length > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">+{gallery.length - 5} more</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Title row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded tracking-[0.12em] uppercase text-white ${isRent ? "bg-orange-500" : "bg-navy-900"}`}>
                    {isRent ? "For Rent" : "For Sale"}
                  </span>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded tracking-[0.12em] uppercase text-orange-500 bg-orange-50 border border-orange-100 capitalize">
                    {property.type}
                  </span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 leading-tight mb-1.5">
                  {property.title}
                </h1>
                <div className="flex items-center gap-1.5 text-ink-400 text-sm">
                  <MapPin size={13} className="text-orange-400 shrink-0" />
                  {property.address}, {property.city}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-orange-500">
                  ${property.price.toLocaleString()}
                  {property.priceUnit && (
                    <span className="text-ink-400 font-sans font-normal text-base">/{property.priceUnit}</span>
                  )}
                </div>
                <StarRating rating={property.rating} size={13} />
                <div className="flex items-center gap-2">
                  <DetailFavoriteButton property={property} />
                  <button className="p-2 rounded-lg border border-site-200 text-ink-400 hover:text-orange-500 hover:border-orange-200 transition-colors cursor-pointer">
                    <Share2 size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white border border-site-200 rounded-xl px-4 py-3.5 flex items-center gap-3 card-shadow">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-orange-500" />
                  </div>
                  <div>
                    <div className="text-[10px] text-ink-400 uppercase tracking-wider mb-0.5">{label}</div>
                    <div className="text-sm font-semibold text-ink-900">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white border border-site-200 rounded-2xl p-6 mb-6 card-shadow">
              <h2 className="font-serif text-lg font-bold text-ink-900 mb-4 pb-3 border-b border-site-100">
                Property Overview
              </h2>
              <p className="text-ink-500 text-sm leading-relaxed mb-4">
                {property.description}
              </p>
              <p className="text-ink-500 text-sm leading-relaxed">
                This exceptional property offers an unparalleled living experience in one of {property.city}&apos;s most sought-after locations. Built in {property.yearBuilt}, it combines contemporary design with timeless elegance, featuring {property.bedrooms} generously sized bedrooms and {property.bathrooms} premium bathrooms across {formatArea(property.area)} of refined living space.
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white border border-site-200 rounded-2xl p-6 card-shadow">
              <h2 className="font-serif text-lg font-bold text-ink-900 mb-5 pb-3 border-b border-site-100">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2.5 text-sm text-ink-600">
                    <CheckCircle2 size={15} className="text-orange-500 shrink-0" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:w-80 shrink-0 space-y-5">

            {/* Price card */}
            <div className="bg-navy-900 rounded-2xl p-6 text-white">
              <div className="font-serif text-2xl font-bold text-orange-400 mb-0.5">
                ${property.price.toLocaleString()}
                {property.priceUnit && (
                  <span className="text-white/40 font-sans font-normal text-sm">/{property.priceUnit}</span>
                )}
              </div>
              <p className="text-white/50 text-xs mb-5">Estimated price — contact agent for final offer</p>
              <a
                href={`tel:${agent.phone}`}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm py-3 rounded-md transition-colors duration-200 mb-2.5"
              >
                <Phone size={14} />
                Schedule a Viewing
              </a>
              <EnquiryModal
                propertyId={property.id}
                propertyTitle={property.title}
                agentName={agent.name}
              />
            </div>

            {/* Agent card */}
            <div className="bg-white border border-site-200 rounded-2xl p-5 card-shadow">
              <p className="text-[10px] font-semibold text-ink-400 uppercase tracking-widest mb-4">Listed by</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-orange-100 shrink-0">
                  <Image src={agent.image} alt={agent.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <div className="font-serif text-sm font-bold text-ink-900">{agent.name}</div>
                  <div className="text-xs text-ink-400 mt-0.5">{agent.title}</div>
                  <StarRating rating={agent.rating} size={11} className="mt-1" />
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t border-site-100">
                <a href={`tel:${agent.phone}`} className="flex items-center gap-2.5 text-xs text-ink-500 hover:text-orange-500 transition-colors">
                  <Phone size={12} className="text-orange-400 shrink-0" />
                  {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="flex items-center gap-2.5 text-xs text-ink-500 hover:text-orange-500 transition-colors">
                  <Mail size={12} className="text-orange-400 shrink-0" />
                  {agent.email}
                </a>
              </div>
              <Link
                href={`/agents/${agent.id}`}
                className="mt-4 flex items-center justify-center text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors"
              >
                View Agent Profile
              </Link>
            </div>

            {/* Quick facts */}
            <div className="bg-white border border-site-200 rounded-2xl p-5 card-shadow">
              <p className="text-[10px] font-semibold text-ink-400 uppercase tracking-widest mb-4">Property Details</p>
              <dl className="space-y-3">
                {[
                  { label: "Property ID", value: `TNP-${property.id.padStart(4, "0")}` },
                  { label: "Status", value: isRent ? "For Rent" : "For Sale" },
                  { label: "Type", value: property.type.charAt(0).toUpperCase() + property.type.slice(1) },
                  { label: "Year Built", value: property.yearBuilt },
                  { label: "Bedrooms", value: property.bedrooms },
                  { label: "Bathrooms", value: property.bathrooms },
                  { label: "Floor Area", value: formatArea(property.area) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center text-xs border-b border-site-50 pb-3 last:border-0 last:pb-0">
                    <span className="text-ink-400">{label}</span>
                    <span className="font-semibold text-ink-700">{value}</span>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>

        {/* Related properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-2">More Like This</p>
                <h2 className="font-serif text-2xl font-bold text-ink-900">Similar Properties</h2>
              </div>
              <Link href="/properties" className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
