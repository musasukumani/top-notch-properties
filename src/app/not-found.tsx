import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-site-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">404 Error</p>
        <h1 className="font-serif text-5xl font-bold text-ink-900 mb-4">Page Not Found</h1>
        <p className="text-ink-500 text-sm leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm px-5 py-2.5 rounded-md transition-colors"
          >
            <Home size={15} />
            Go Home
          </Link>
          <Link
            href="/properties"
            className="flex items-center gap-2 border border-site-200 text-ink-700 hover:border-orange-300 hover:text-orange-500 font-semibold text-sm px-5 py-2.5 rounded-md transition-colors"
          >
            <Search size={15} />
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
