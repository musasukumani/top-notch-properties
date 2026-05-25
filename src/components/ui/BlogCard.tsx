import Image from "next/image";
import Link from "next/link";
import { CalendarDays, User } from "lucide-react";
import type { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white border border-site-200 card-shadow rounded-2xl overflow-hidden hover:card-shadow-hover hover:border-orange-200 transition-all duration-300">
      <Link href={`/news/${post.slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded">
            {post.category}
          </span>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-4 text-ink-400 text-xs mb-3">
          <span className="flex items-center gap-1">
            <CalendarDays size={11} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <User size={11} />
            {post.author}
          </span>
        </div>

        <Link href={`/news/${post.slug}`}>
          <h3 className="font-serif text-sm font-semibold text-ink-900 mb-2 leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-ink-500 text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>

        <Link
          href={`/news/${post.slug}`}
          className="inline-flex items-center gap-1 mt-4 text-xs text-orange-500 hover:text-orange-600 transition-colors font-semibold"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
