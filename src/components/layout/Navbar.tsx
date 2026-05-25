"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Home, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Agents", href: "/agents" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const avatar = user?.user_metadata?.avatar_url;

  return (
    <header className={cn("fixed top-0 inset-x-0 z-50 bg-navy-900 transition-shadow duration-300", scrolled ? "shadow-[0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.35)]" : "shadow-[0_1px_0_rgba(255,255,255,0.05)]")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center group-hover:bg-orange-400 transition-colors">
              <Home size={17} className="text-white" />
            </span>
            <span className="font-serif font-bold text-sm sm:text-base leading-tight text-white">
              Top Notch<span className="text-orange-400"> Properties</span>
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200", pathname === link.href ? "text-orange-400 bg-orange-500/15" : "text-white/70 hover:text-white hover:bg-white/10")}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link href="/account" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                {avatar ? (
                  <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-white/20">
                    <Image src={avatar} alt="Avatar" fill sizes="28px" className="object-cover" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
                    <User size={13} className="text-white" />
                  </div>
                )}
                My Account
              </Link>
            ) : (
              <Link href="/signin" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2">
                Sign In
              </Link>
            )}
            <Link href="/properties/new" className="text-sm font-semibold bg-orange-500 hover:bg-orange-400 text-white px-5 py-2.5 rounded-md transition-colors duration-200">
              List Property
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors" aria-label="Toggle menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-navy-950 border-t border-white/10">
          <ul className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setMobileOpen(false)} className={cn("block px-4 py-3 text-sm font-medium rounded-lg transition-colors", pathname === link.href ? "text-orange-400 bg-orange-500/15" : "text-white/70 hover:text-white hover:bg-white/10")}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 border-t border-white/10 mt-2 flex flex-col gap-2">
              {user ? (
                <Link href="/account" onClick={() => setMobileOpen(false)} className="text-sm text-center text-white/70 hover:text-white py-2.5 rounded-md border border-white/15 hover:border-white/30 transition-colors">
                  My Account
                </Link>
              ) : (
                <Link href="/signin" onClick={() => setMobileOpen(false)} className="text-sm text-center text-white/70 hover:text-white py-2.5 rounded-md border border-white/15 hover:border-white/30 transition-colors">
                  Sign In
                </Link>
              )}
              <Link href="/properties/new" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-center bg-orange-500 hover:bg-orange-400 text-white py-2.5 rounded-md transition-colors">
                List Property
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
