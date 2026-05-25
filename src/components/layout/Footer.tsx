import Link from "next/link";
import { Home, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

function IconFacebook({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconX({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconLinkedin({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconInstagram({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Our Agents", href: "/agents" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog & News", href: "/news" },
];

const discoverLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Partners", href: "/partners" },
  { label: "Careers", href: "/careers" },
  { label: "Events", href: "/events" },
  { label: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];

const socials = [
  { label: "Facebook", href: "#", Icon: IconFacebook },
  { label: "Twitter / X", href: "#", Icon: IconX },
  { label: "LinkedIn", href: "#", Icon: IconLinkedin },
  { label: "Instagram", href: "#", Icon: IconInstagram },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <span className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
                <Home size={17} className="text-white" />
              </span>
              <span className="font-serif font-bold text-base leading-tight text-white">
                Top Notch<span className="text-orange-400"> Properties</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Your trusted partner in luxury real estate. We connect discerning buyers and sellers with exceptional properties worldwide.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-orange-400 hover:border-orange-500/40 transition-colors duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-white/40 mb-5 uppercase tracking-[0.18em]">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group/link inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-orange-400 transition-colors duration-200">
                    <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-white/40 mb-5 uppercase tracking-[0.18em]">
              Discover
            </h4>
            <ul className="space-y-2.5">
              {discoverLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group/link inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-orange-400 transition-colors duration-200">
                    <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold text-white/40 mb-5 uppercase tracking-[0.18em]">
              Contact
            </h4>
            <address className="not-italic space-y-3">
              <div className="flex gap-3 text-sm text-white/50">
                <MapPin size={15} className="text-orange-400 shrink-0 mt-0.5" />
                <span>6391 Elgin St. Celina, Delaware 10299</span>
              </div>
              <div className="flex gap-3 text-sm text-white/50">
                <Mail size={15} className="text-orange-400 shrink-0 mt-0.5" />
                <a href="mailto:contact@topnotchproperties.com" className="hover:text-orange-400 transition-colors">
                  contact@topnotchproperties.com
                </a>
              </div>
              <div className="flex gap-3 text-sm text-white/50">
                <Phone size={15} className="text-orange-400 shrink-0 mt-0.5" />
                <a href="tel:+8801236549" className="hover:text-orange-400 transition-colors">
                  +88 0123 654 99
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="py-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Top Notch Properties. All rights reserved.
          </p>
          <ul className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-white/30 hover:text-white/60 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
