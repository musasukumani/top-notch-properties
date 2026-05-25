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
