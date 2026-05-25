import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function ComingSoonPage({ title, description }: Props) {
  return (
    <div className="min-h-screen bg-site-50 pt-24 pb-20 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Coming Soon</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900 mb-4">{title}</h1>
        <p className="text-ink-500 text-sm leading-relaxed mb-8">{description}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
