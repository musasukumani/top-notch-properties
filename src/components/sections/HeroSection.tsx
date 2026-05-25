"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, MapPin, SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryTabs = ["General", "Villa", "Apartment", "Penthouse", "Commercial"];
const categories = ["Select Category", "Apartment", "Villa", "Penthouse", "Commercial", "Warehouse"];

interface HeroProps {
  headline?: string;
  subheading?: string;
  heroImage?: string;
  stats?: { value: string; label: string }[];
}

const defaultStats = [
  { value: "20.5K", label: "Featured Projects" },
  { value: "100.5K", label: "Luxury Houses" },
  { value: "150.5K", label: "Satisfied Clients" },
  { value: "700+", label: "Properties Listed" },
];

export default function HeroSection({ headline, subheading, heroImage, stats }: HeroProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("General");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [location, setLocation] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (category !== "Select Category") params.set("type", category.toLowerCase());
    if (location) params.set("location", location);
    if (activeTab !== "General") params.set("type", activeTab.toLowerCase());
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage ?? "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=85"}
          alt="Luxury real estate"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/75 via-navy-900/65 to-navy-900/85" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 text-center">
        <p
          className="inline-flex items-center gap-2 text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase mb-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(12px)",
            transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: "0ms",
          }}
        >
          <span className="w-8 h-px bg-orange-400" />
          Premium Real Estate
          <span className="w-8 h-px bg-orange-400" />
        </p>

        <h1
          className="font-serif text-[2.85rem] sm:text-[3.56rem] lg:text-[4.275rem] font-bold text-white leading-tight mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(16px)",
            transition: "opacity 1000ms cubic-bezier(0.16,1,0.3,1), transform 1000ms cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: "120ms",
          }}
        >
          {headline ?? "Journey To Your"}
          <br />
          <span className="text-orange-400">{subheading ?? "Perfect Luxury Home"}</span>
        </h1>

        <div
          className="max-w-3xl mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(14px)",
            transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: "360ms",
          }}
        >
          {/* Category tabs */}
          <div className="flex gap-1 mb-0 w-fit">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-2.5 text-sm font-semibold rounded-t-md transition-all duration-200 cursor-pointer",
                  activeTab === tab
                    ? "bg-orange-500 text-white"
                    : "bg-black/30 text-white/60 hover:text-white hover:bg-black/40",
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div
            className="rounded-b-2xl rounded-tr-2xl flex flex-col sm:flex-row items-stretch sm:items-center border border-white/20 pr-3"
            style={{
              background: visible ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
              backdropFilter: visible ? "blur(8px) saturate(120%)" : "blur(0px) saturate(100%)",
              transition: "background 900ms cubic-bezier(0.16,1,0.3,1), backdrop-filter 900ms cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: "360ms",
            }}
          >
            {/* Keyword */}
            <div className="flex-1 px-5 py-3.5 border-b sm:border-b-0 sm:border-r border-white/20">
              <div className="text-xs font-semibold text-white/60 mb-0.5">Keyword</div>
              <input
                type="text"
                placeholder="Looking For?"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full bg-transparent text-sm font-semibold text-white placeholder:text-white/40 placeholder:font-normal focus:outline-none"
              />
            </div>

            {/* Category */}
            <div className="flex-1 px-5 py-3.5 border-b sm:border-b-0 sm:border-r border-white/20 relative">
              <div className="text-xs font-semibold text-white/60 mb-0.5">Category</div>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer pr-5"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-neutral-900 text-white">{c}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
              </div>
            </div>

            {/* Location */}
            <div className="flex-1 px-5 py-3.5 border-b sm:border-b-0 sm:border-r border-white/20">
              <div className="text-xs font-semibold text-white/60 mb-0.5">Location</div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 bg-transparent text-sm font-semibold text-white placeholder:text-white/40 placeholder:font-normal focus:outline-none"
                />
                <MapPin size={14} className="text-white/40 shrink-0" />
              </div>
            </div>

            {/* More + Search */}
            <div className="flex items-center shrink-0 gap-2 pl-3 py-2">
              <button className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-white/70 hover:text-orange-400 transition-colors cursor-pointer whitespace-nowrap">
                <SlidersHorizontal size={14} />
                More
              </button>
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm px-5 py-2.5 rounded-md transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                <Search size={15} />
                Search
              </button>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(12px)",
            transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: "500ms",
          }}
        >
          {(stats?.length ? stats : defaultStats).map((stat) => (
            <div key={stat.label} className="glass-dark rounded-xl py-4 px-3 text-center">
              <div className="font-serif text-2xl font-bold text-orange-400 mb-0.5">{stat.value}</div>
              <div className="text-white/60 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-orange-400/50 to-transparent" />
      </div>
    </section>
  );
}
