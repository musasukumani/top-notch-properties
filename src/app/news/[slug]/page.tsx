import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ArrowLeft, User } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return { title: `${post.title} — Top Notch Properties`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-site-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/news" className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-orange-500 transition-colors mb-8">
          <ArrowLeft size={15} />
          Back to News
        </Link>

        {post.image && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
            <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
          </div>
        )}

        <div className="flex items-center gap-4 mb-6 text-xs text-ink-400">
          {post.category && (
            <span className="bg-orange-50 text-orange-500 border border-orange-100 px-3 py-1 rounded-full font-semibold">
              {post.category}
            </span>
          )}
          {post.date && (
            <span className="flex items-center gap-1.5">
              <CalendarDays size={12} />
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          )}
          {post.author && (
            <span className="flex items-center gap-1.5">
              <User size={12} />
              {post.author}
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900 leading-snug mb-6">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-ink-500 text-base leading-relaxed border-l-4 border-orange-400 pl-5 mb-8 italic">
            {post.excerpt}
          </p>
        )}

        <div className="bg-white border border-site-200 rounded-2xl p-8 card-shadow text-center">
          <p className="text-ink-400 text-sm">Full article content can be added via the Studio CMS editor.</p>
        </div>
      </div>
    </div>
  );
}
