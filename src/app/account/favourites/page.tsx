import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export default async function FavouritesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: favorites } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-ink-900 mb-6 flex items-center gap-2">
        <Heart size={18} className="text-orange-500" />
        Favourites ({favorites?.length ?? 0})
      </h2>

      {!favorites?.length ? (
        <div className="bg-white border border-site-200 rounded-2xl p-12 card-shadow text-center">
          <Heart size={40} className="text-site-200 mx-auto mb-4" />
          <p className="text-ink-500 text-sm mb-4">No saved properties yet.</p>
          <Link href="/properties" className="text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors">
            Browse Properties →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {favorites.map((fav) => (
            <Link key={fav.id} href={`/properties/${fav.property_id}`} className="group bg-white border border-site-200 rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover hover:border-orange-200 transition-all duration-300 flex gap-4 p-4">
              <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0">
                {fav.property_image ? (
                  <Image src={fav.property_image} alt={fav.property_title} fill sizes="96px" className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-site-100" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-sm font-semibold text-ink-900 group-hover:text-orange-500 transition-colors truncate">{fav.property_title}</h3>
                <p className="text-orange-500 text-sm font-bold mt-1">${fav.property_price?.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
