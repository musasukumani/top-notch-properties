import { client } from "./client";
import type { Property, PropertyWithGallery, Agent, Testimonial, BlogPost, Location, CategoryCount, HomepageSettings } from "@/lib/types";

const PROPERTY_FIELDS = `
  "id": _id,
  title,
  price,
  priceUnit,
  area,
  bedrooms,
  bathrooms,
  rating,
  reviewCount,
  address,
  "city": city->city,
  "type": propertyType,
  status,
  "image": image.asset->url,
  featured,
  yearBuilt,
  description,
  amenities
`;

export async function getFeaturedProperties(): Promise<Property[]> {
  return client.fetch<Property[]>(
    `*[_type == "property" && featured == true] | order(_createdAt desc) [0...6] { ${PROPERTY_FIELDS} }`
  );
}

export async function getAllProperties(): Promise<Property[]> {
  return client.fetch<Property[]>(
    `*[_type == "property"] | order(_createdAt desc) { ${PROPERTY_FIELDS} }`
  );
}

export async function getPropertyById(id: string): Promise<PropertyWithGallery | null> {
  return client.fetch<PropertyWithGallery | null>(
    `*[_type == "property" && _id == $id][0] {
      ${PROPERTY_FIELDS},
      "gallery": [image.asset->url, ...gallery[].asset->url]
    }`,
    { id }
  );
}

export async function getAgents(): Promise<Agent[]> {
  return client.fetch<Agent[]>(
    `*[_type == "agent"] | order(_createdAt asc) {
      "id": _id,
      name,
      title,
      phone,
      email,
      "image": photo.asset->url,
      propertiesCount,
      rating
    }`
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch<Testimonial[]>(
    `*[_type == "testimonial"] | order(_createdAt asc) {
      "id": _id,
      name,
      role,
      "avatar": avatar.asset->url,
      content,
      rating
    }`
  );
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      "id": _id,
      title,
      excerpt,
      "image": image.asset->url,
      "date": publishedAt,
      "author": author->name,
      category,
      "slug": slug.current
    }`
  );
}

export async function getLocations(): Promise<Location[]> {
  return client.fetch<Location[]>(
    `*[_type == "location"] | order(city asc) {
      city,
      country,
      listingsCount,
      "image": image.asset->url
    }`
  );
}

export async function getCategoryCounts(): Promise<CategoryCount[]> {
  const types = ["apartment", "villa", "commercial", "warehouse"];
  const labels: Record<string, string> = {
    apartment: "Apartment",
    villa: "Villa",
    commercial: "Commercial",
    warehouse: "Warehouse",
  };
  const counts = await client.fetch<Record<string, number>>(
    `{
      "apartment": count(*[_type == "property" && propertyType == "apartment"]),
      "villa": count(*[_type == "property" && propertyType == "villa"]),
      "commercial": count(*[_type == "property" && propertyType == "commercial"]),
      "warehouse": count(*[_type == "property" && propertyType == "warehouse"])
    }`
  );
  return types.map((type) => ({ type, label: labels[type], count: counts[type] ?? 0 }));
}

export async function getHomepageSettings(): Promise<HomepageSettings | null> {
  return client.fetch<HomepageSettings | null>(
    `*[_type == "homepageSettings"][0] {
      "heroImage": heroImage.asset->url,
      heroHeadline,
      heroSubheading,
      stats,
      ctaHeading,
      ctaSubheading,
      ctaBody,
      appStoreUrl,
      playStoreUrl
    }`
  );
}

export async function getAgentById(id: string): Promise<Agent | null> {
  return client.fetch<Agent | null>(
    `*[_type == "agent" && _id == $id][0] {
      "id": _id,
      name,
      title,
      phone,
      email,
      "image": photo.asset->url,
      propertiesCount,
      rating
    }`,
    { id }
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch<BlogPost | null>(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      "id": _id,
      title,
      excerpt,
      "image": image.asset->url,
      "date": publishedAt,
      "author": author->name,
      category,
      "slug": slug.current
    }`,
    { slug }
  );
}
