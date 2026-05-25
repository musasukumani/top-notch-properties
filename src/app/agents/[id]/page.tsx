export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, Mail, Star, ArrowLeft, Building2 } from "lucide-react";
import { getAgentById, getAllProperties } from "@/sanity/lib/queries";
import PropertyCard from "@/components/ui/PropertyCard";

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
