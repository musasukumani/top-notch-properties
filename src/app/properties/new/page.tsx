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
