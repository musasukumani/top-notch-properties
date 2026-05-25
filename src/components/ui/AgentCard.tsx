import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Star } from "lucide-react";
import type { Agent } from "@/lib/types";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <article className="group relative bg-white border border-site-200 card-shadow rounded-2xl overflow-hidden hover:card-shadow-hover hover:border-orange-200 transition-all duration-300 text-center">
      <div className="h-0.5 bg-gradient-to-r from-orange-500/40 via-orange-400 to-amber-400/40 group-hover:from-orange-500 group-hover:to-amber-400 transition-all duration-300" />

      <div className="p-6">
        <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-site-100 group-hover:ring-orange-300 transition-all duration-300">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <h3 className="font-serif text-base font-semibold text-ink-900 mb-0.5 group-hover:text-orange-500 transition-colors duration-200">
          {agent.name}
        </h3>
        <p className="text-ink-400 text-xs mb-3 tracking-wide">{agent.title}</p>

        <div className="flex items-center justify-center gap-1.5 mb-5">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-ink-700 text-sm font-semibold">{agent.rating}</span>
          <span className="text-ink-300 text-xs">·</span>
          <span className="text-ink-400 text-xs">{agent.propertiesCount} listings</span>
        </div>

        <div className="pt-4 border-t border-site-100 flex items-center justify-center gap-2">
          <a
            href={`tel:${agent.phone}`}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs text-ink-500 hover:text-white hover:bg-ink-700 bg-site-50 border border-site-200 rounded-md py-2 transition-all duration-200"
          >
            <Phone size={12} />
            <span>Call</span>
          </a>
          <a
            href={`mailto:${agent.email}`}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs text-ink-500 hover:text-white hover:bg-ink-700 bg-site-50 border border-site-200 rounded-md py-2 transition-all duration-200"
          >
            <Mail size={12} />
            <span>Email</span>
          </a>
          <Link
            href={`/agents/${agent.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs text-white bg-orange-500 hover:bg-orange-400 rounded-md py-2 font-semibold transition-colors duration-200"
          >
            Profile
          </Link>
        </div>
      </div>
    </article>
  );
}
