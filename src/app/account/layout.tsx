import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AccountSidebar from "@/components/layout/AccountSidebar";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const name = user.user_metadata?.full_name ?? user.email ?? "My Account";

  return (
    <div className="min-h-screen bg-site-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-2xl font-bold text-ink-900 mb-8">My Account</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <AccountSidebar userName={name} />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
