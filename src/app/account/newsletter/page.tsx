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
