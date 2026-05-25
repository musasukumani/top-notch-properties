import Image from "next/image";
import { Smartphone, Star, Download } from "lucide-react";

interface AppCTAProps {
  heading?: string;
  subheading?: string;
  body?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export default function AppCTASection({ heading, subheading, body, appStoreUrl, playStoreUrl }: AppCTAProps) {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-navy-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-500 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-amber-500 blur-3xl" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 sm:p-12 lg:p-16 items-center">
            <div>
              <p className="text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Mobile App
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
                {heading ?? "Search Properties"}
                <br />
                <span className="text-orange-400">{subheading ?? "On the Go"}</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
                {body ?? "Download the Top Notch Properties app and get instant access to thousands of premium listings, virtual tours, and direct agent contact. Available on iOS and Android."}
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-white/50 text-sm">4.9/5 from 450+ reviews</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={appStoreUrl ?? "#"}
                  className="flex items-center gap-3 bg-white/8 hover:bg-white/12 border border-white/15 hover:border-orange-400/40 rounded-lg px-5 py-3.5 transition-all duration-200 cursor-pointer"
                >
                  <Smartphone size={20} className="text-orange-400 shrink-0" />
                  <div>
                    <div className="text-xs text-white/40 mb-0.5">Download on</div>
                    <div className="text-sm font-semibold text-white">App Store</div>
                  </div>
                </a>
                <a
                  href={playStoreUrl ?? "#"}
                  className="flex items-center gap-3 bg-white/8 hover:bg-white/12 border border-white/15 hover:border-orange-400/40 rounded-lg px-5 py-3.5 transition-all duration-200 cursor-pointer"
                >
                  <Download size={20} className="text-orange-400 shrink-0" />
                  <div>
                    <div className="text-xs text-white/40 mb-0.5">Get it on</div>
                    <div className="text-sm font-semibold text-white">Google Play</div>
                  </div>
                </a>
              </div>

              <p className="text-orange-400 text-xs font-semibold mt-5">
                🎉 15% off your first booking with the app
              </p>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-60 h-[460px] animate-float">
                <div className="absolute inset-0 rounded-[2.5rem] bg-orange-500/20 blur-2xl" />
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/10 bg-navy-800">
                  <Image
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=90"
                    alt="Top Notch Properties mobile app"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                  <div className="absolute bottom-5 left-3 right-3 bg-navy-900/90 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                    <div className="text-xs text-white/40 mb-0.5">Property of the day</div>
                    <div className="text-sm font-semibold text-white font-serif">Eaton Garth Penthouse</div>
                    <div className="text-orange-400 text-xs mt-1">$1,200,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
