import HeroSection from "@/components/sections/HeroSection";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import PropertyCategories from "@/components/sections/PropertyCategories";
import FeaturedLocations from "@/components/sections/FeaturedLocations";
import AgentsSection from "@/components/sections/AgentsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import AppCTASection from "@/components/sections/AppCTASection";
import {
  getFeaturedProperties,
  getCategoryCounts,
  getLocations,
  getAgents,
  getTestimonials,
  getBlogPosts,
  getHomepageSettings,
} from "@/sanity/lib/queries";

export default async function Home() {
  const [featuredProperties, categoryCounts, locations, agents, testimonials, blogPosts, settings] =
    await Promise.all([
      getFeaturedProperties().catch(() => []),
      getCategoryCounts().catch(() => []),
      getLocations().catch(() => []),
      getAgents().catch(() => []),
      getTestimonials().catch(() => []),
      getBlogPosts().catch(() => []),
      getHomepageSettings().catch(() => null),
    ]);

  return (
    <>
      <HeroSection
        headline={settings?.heroHeadline}
        subheading={settings?.heroSubheading}
        heroImage={settings?.heroImage}
        stats={settings?.stats}
      />
      <FeaturedProperties properties={featuredProperties} />
      <PropertyCategories counts={categoryCounts} />
      <FeaturedLocations locations={locations} />
      <AgentsSection agents={agents} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection posts={blogPosts} />
      <AppCTASection
        heading={settings?.ctaHeading}
        subheading={settings?.ctaSubheading}
        body={settings?.ctaBody}
        appStoreUrl={settings?.appStoreUrl}
        playStoreUrl={settings?.playStoreUrl}
      />
    </>
  );
}
