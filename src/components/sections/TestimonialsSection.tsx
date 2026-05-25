import Image from "next/image";
import { Quote } from "lucide-react";
import StarRating from "@/components/ui/StarRating";
import type { Testimonial } from "@/lib/types";

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="section-padding bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Client Experiences
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            What Our Clients Say
          </h2>
          <p className="text-white/50 text-sm mt-4 max-w-md mx-auto">
            Trusted by thousands of buyers, sellers and investors worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:border-orange-400/30 hover:bg-white/8 transition-all duration-300"
            >
              <Quote size={28} className="text-orange-400/40 mb-4 shrink-0" />
              <p className="text-white/65 text-sm leading-relaxed mb-6 flex-1">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-orange-400/25 shrink-0">
                  <Image src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
                <StarRating rating={t.rating} size={11} className="ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
