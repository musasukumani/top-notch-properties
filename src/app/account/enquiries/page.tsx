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
