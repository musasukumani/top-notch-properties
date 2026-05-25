"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, MessageSquare, Bell, User, Mail, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const links = [
  { href: "/account/favourites", label: "Favourites", Icon: Heart },
  { href: "/account/enquiries", label: "Enquiries", Icon: MessageSquare },
  { href: "/account/alerts", label: "Alerts", Icon: Bell },
  { href: "/account/profile", label: "Profile", Icon: User },
  { href: "/account/newsletter", label: "Newsletter", Icon: Mail },
];

export default function AccountSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="w-full lg:w-56 shrink-0">
      <div className="bg-white border border-site-200 rounded-2xl card-shadow overflow-hidden">
        <div className="p-5 border-b border-site-100">
          <p className="text-xs text-ink-400 mb-0.5">Signed in as</p>
          <p className="font-semibold text-ink-900 text-sm truncate">{userName}</p>
        </div>
        <nav className="p-2">
          {links.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-orange-500/10 text-orange-500"
                  : "text-ink-600 hover:bg-site-50 hover:text-ink-900"
              )}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-600 hover:bg-red-50 hover:text-red-500 transition-colors mt-1 cursor-pointer"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </nav>
      </div>
    </aside>
  );
}
