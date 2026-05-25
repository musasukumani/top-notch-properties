import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ExternalLink, TrendingUp, Building2, BarChart3, DollarSign, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Market Updates — Top Notch Properties",
  description: "The latest US real estate and property market news, curated for buyers, sellers, and investors.",
};

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  source: string;
  sourceUrl: string;
  category: string;
  CategoryIcon: React.ComponentType<{ size?: number; className?: string }>;
}

const news: NewsArticle[] = [
  {
    id: "1",
    title: "Should I Buy a House Now? What Experts Say About Real Estate Today",
    excerpt:
      "Experts remain divided on whether now is the right time to buy. With mortgage rates holding near 6.75% and national list prices down 2.2% year-over-year, buyers face a complex market where affordability remains strained — but price adjustments are creating fresh opportunities in select cities. Analysts at Bloomberg spoke to leading economists about the risk-reward calculus for prospective homeowners in the current climate.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    date: "May 21, 2026",
    source: "Bloomberg",
    sourceUrl: "https://www.bloomberg.com/news/newsletters/2026-05-21/should-i-buy-a-house-now-what-experts-say-about-real-estate-today",
    category: "Market Analysis",
    CategoryIcon: BarChart3,
  },
  {
    id: "2",
    title: "May Homebuilder Sentiment Improves on Late Spring Surge in Demand",
    excerpt:
      "Builder confidence improved in May as a late-spring demand surge provided a meaningful lift to the sector. Current sales conditions rose to 40, buyer traffic jumped to 25, and future sales expectations climbed to 45. Critically, the share of builders cutting prices fell from 36% in April to 32% in May — a signal that the new-construction segment is stabilising after months of margin pressure.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    date: "May 18, 2026",
    source: "CNBC",
    sourceUrl: "https://www.cnbc.com/2026/05/18/may-homebuilder-sentiment-improves.html",
    category: "New Construction",
    CategoryIcon: Building2,
  },
  {
    id: "3",
    title: "US Housing Market Waits for Its Spring Rebound",
    excerpt:
      "The spring selling season is showing tentative signs of life, but the rebound remains fragile. Pending home sales are up 10% month-over-month, yet elevated mortgage rates and persistent affordability challenges continue to limit the scale of recovery. Bloomberg's housing correspondent reports that sellers in coastal metros are finally accepting lower bids, unlocking inventory that had been frozen since late 2025.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
    date: "May 13, 2026",
    source: "Bloomberg",
    sourceUrl: "https://www.bloomberg.com/news/newsletters/2026-05-13/us-housing-market-waits-for-its-spring-rebound",
    category: "Market Trends",
    CategoryIcon: TrendingUp,
  },
  {
    id: "4",
    title: "Inventory Is Rising as Homes Sell Faster in the 2026 Housing Market",
    excerpt:
      "A rare combination of rising inventory and accelerating sales times is emerging across major US markets. Homes are spending fewer days on market as realistic pricing by sellers draws more buyers off the sidelines. Price cuts remain elevated at roughly 36% nationally, but that adjustment is exactly what's helping transactions close — a dynamic HousingWire analysts describe as a 'healthy correction' rather than a distressed market.",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80",
    date: "May 9, 2026",
    source: "HousingWire",
    sourceUrl: "https://www.housingwire.com/articles/2026-housing-market-homes-selling-faster/",
    category: "Market Data",
    CategoryIcon: BarChart3,
  },
  {
    id: "5",
    title: "Affordability Takes Center Stage in the 2026 Housing Market",
    excerpt:
      "Affordability has emerged as the defining challenge of the 2026 housing market. National median list prices are down 2.2% year-over-year as sellers adjust expectations, but with average 30-year fixed rates near 6.75%, monthly payments on a median-priced home remain well above historical norms — keeping an estimated 4 million potential first-time buyers on the sidelines, according to HousingWire's latest affordability index.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    date: "May 5, 2026",
    source: "HousingWire",
    sourceUrl: "https://www.housingwire.com/articles/affordability-takes-center-stage-in-the-2026-housing-market/",
    category: "Affordability",
    CategoryIcon: DollarSign,
  },
];

const sourceBadgeColors: Record<string, string> = {
  Bloomberg: "bg-black text-white",
  CNBC: "bg-[#0a3a5c] text-white",
  HousingWire: "bg-orange-600 text-white",
};

export default function NewsPage() {
  const [featured, ...rest] = news;

  return (
    <div className="min-h-screen bg-site-50 pt-20">

      {/* Page header */}
      <div className="bg-white border-b border-site-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Latest Updates
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
                US Real Estate News
              </h1>
              <p className="text-ink-500 text-sm mt-2 max-w-lg">
                Curated market intelligence from Bloomberg, CNBC, and HousingWire — updated May 2026.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-400 shrink-0">
              <Home size={13} className="text-orange-400" />
              <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-ink-700 font-medium">News</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Featured story */}
        <a
          href={featured.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block mb-10"
        >
          <article className="bg-white border border-site-200 rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover hover:border-orange-200 transition-all duration-300 grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[320px] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:block hidden" />
              <span className="absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1.5 rounded tracking-widest uppercase text-white bg-orange-500">
                Featured
              </span>
            </div>
            <div className="p-7 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-4">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded tracking-widest uppercase ${sourceBadgeColors[featured.source]}`}>
                  {featured.source}
                </span>
                <span className="flex items-center gap-1 text-xs text-ink-400">
                  <featured.CategoryIcon size={11} />
                  {featured.category}
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink-900 leading-snug mb-4 group-hover:text-orange-500 transition-colors duration-200">
                {featured.title}
              </h2>
              <p className="text-ink-500 text-sm leading-relaxed line-clamp-4 mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-ink-400">
                  <CalendarDays size={11} />
                  {featured.date}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 group-hover:text-orange-600 transition-colors">
                  Read Full Article
                  <ExternalLink size={11} />
                </span>
              </div>
            </div>
          </article>
        </a>

        {/* Remaining 4 articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((article) => (
            <a
              key={article.id}
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <article className="bg-white border border-site-200 rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover hover:border-orange-200 transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute top-3 left-3 text-[9px] font-bold px-2 py-1 rounded tracking-widest uppercase ${sourceBadgeColors[article.source]}`}>
                    {article.source}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-ink-400 mb-2.5">
                    <article.CategoryIcon size={10} />
                    <span>{article.category}</span>
                    <span className="ml-auto flex items-center gap-1">
                      <CalendarDays size={10} />
                      {article.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-sm font-semibold text-ink-900 leading-snug mb-2.5 group-hover:text-orange-500 transition-colors duration-200 line-clamp-3 flex-1">
                    {article.title}
                  </h3>

                  <p className="text-ink-400 text-xs leading-relaxed line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>

                  <span className="flex items-center gap-1 text-xs font-semibold text-orange-500 group-hover:text-orange-600 transition-colors mt-auto">
                    Read on {article.source}
                    <ExternalLink size={10} />
                  </span>
                </div>
              </article>
            </a>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-ink-300 mt-10">
          News articles are sourced from Bloomberg, CNBC, and HousingWire. Top Notch Properties does not own this content — clicking any article opens the original source.
        </p>
      </div>
    </div>
  );
}
