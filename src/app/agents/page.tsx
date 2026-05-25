import type { Metadata } from "next";
import AgentCard from "@/components/ui/AgentCard";
import { getAgents } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Our Agents — Top Notch Properties",
  description: "Meet our team of experienced luxury real estate professionals.",
};

export default async function AgentsPage() {
  const agents = await getAgents();
  return (
    <div className="min-h-screen bg-site-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Our Team
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900 mb-4">
            Meet Our Expert Agents
          </h1>
          <p className="text-ink-500 text-sm max-w-md mx-auto leading-relaxed">
            Our team of experienced professionals is dedicated to helping you find the perfect property or achieve the best sale price.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-navy-900 p-10 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange-500 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-amber-500 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="font-serif text-2xl font-bold text-white mb-3">
              Join Our Team
            </h2>
            <p className="text-white/55 text-sm max-w-sm mx-auto mb-6">
              Are you a passionate real estate professional? We&apos;re always looking for exceptional talent to join our growing team.
            </p>
            <a
              href="/careers"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors duration-200"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
