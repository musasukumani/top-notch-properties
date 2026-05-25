"use client";

import { useState } from "react";
import { Mail, X, CheckCircle, Send } from "lucide-react";

interface Props {
  propertyId: string;
  propertyTitle: string;
  agentName: string;
}

export default function EnquiryModal({ propertyId, propertyTitle, agentName }: Props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "auth">("idle");

  function close() {
    setOpen(false);
    if (status === "success") {
      setMessage("");
      setStatus("idle");
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        property_id: propertyId,
        property_title: propertyTitle,
        agent_name: agentName,
        message,
      }),
    });
    if (res.status === 401) {
      setStatus("auth");
      return;
    }
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 border border-white/15 text-white font-semibold text-sm py-3 rounded-md transition-colors duration-200"
      >
        <Mail size={14} />
        Send Enquiry
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <button
              onClick={close}
              className="absolute top-4 right-4 text-ink-400 hover:text-ink-700 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {status === "success" ? (
              <div className="text-center py-6">
                <CheckCircle size={40} className="text-orange-500 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-ink-900 mb-1">Enquiry Sent</h3>
                <p className="text-ink-500 text-sm">
                  We&apos;ll be in touch within 24 hours.
                </p>
                <button
                  onClick={close}
                  className="mt-5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink-900 mb-0.5">
                    Send Enquiry
                  </h3>
                  <p className="text-xs text-ink-400 line-clamp-1">{propertyTitle}</p>
                </div>

                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="I'm interested in this property and would like to arrange a viewing…"
                  rows={4}
                  className="w-full border border-site-200 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                />

                {status === "auth" && (
                  <p className="text-xs text-ink-500">
                    Please{" "}
                    <a href="/signin" className="text-orange-500 font-semibold hover:text-orange-600">
                      sign in
                    </a>{" "}
                    to send an enquiry.
                  </p>
                )}

                {status === "error" && (
                  <p className="text-xs text-red-500">Something went wrong — please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-md transition-colors cursor-pointer"
                >
                  <Send size={14} />
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
