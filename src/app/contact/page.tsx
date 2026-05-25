"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <div className="min-h-screen bg-site-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Get In Touch</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900 mb-4">Contact Us</h1>
          <p className="text-ink-500 text-sm max-w-md mx-auto leading-relaxed">
            Have a question about a property or our services? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-6">
            {[
              { Icon: MapPin, label: "Address", value: "6391 Elgin St. Celina, Delaware 10299" },
              { Icon: Phone, label: "Phone", value: "+88 0123 654 99", href: "tel:+8801236549" },
              { Icon: Mail, label: "Email", value: "contact@topnotchproperties.com", href: "mailto:contact@topnotchproperties.com" },
            ].map(({ Icon, label, value, href }) => (
              <div key={label} className="flex gap-4 bg-white border border-site-200 rounded-2xl p-5 card-shadow">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-ink-400 mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-semibold text-ink-900 hover:text-orange-500 transition-colors">{value}</a>
                  ) : (
                    <p className="text-sm font-semibold text-ink-900">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white border border-site-200 rounded-2xl p-8 card-shadow">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={48} className="text-orange-500 mb-4" />
                <h3 className="font-serif text-xl font-bold text-ink-900 mb-2">Message Sent</h3>
                <p className="text-ink-500 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-ink-500 mb-1.5 block">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-site-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-ink-500 mb-1.5 block">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-site-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-ink-500 mb-1.5 block">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-site-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-ink-500 mb-1.5 block">Subject</label>
                    <input
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-site-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="Property enquiry"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-ink-500 mb-1.5 block">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-site-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-500 text-xs">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors"
                >
                  <Send size={15} />
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
