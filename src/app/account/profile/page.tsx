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
