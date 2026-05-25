import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "@/components/ui/BlogCard";
import type { BlogPost } from "@/lib/types";

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="section-padding bg-site-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Insights & Advice
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
              Latest News & Articles
            </h2>
          </div>
          <Link
            href="/news"
            className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 transition-colors font-semibold shrink-0"
          >
            View All Articles <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
