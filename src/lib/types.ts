export type PropertyType = "apartment" | "villa" | "commercial" | "warehouse" | "penthouse" | "house";
export type PropertyStatus = "for-sale" | "for-rent";

export interface Property {
  id: string;
  title: string;
  price: number;
  priceUnit: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  type: PropertyType;
  status: PropertyStatus;
  image: string;
  featured: boolean;
  yearBuilt: number;
  description: string;
  amenities: string[];
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  image: string;
  propertiesCount: number;
  rating: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  slug: string;
}

export interface Location {
  city: string;
  country: string;
  listingsCount: number;
  image: string;
}

export interface PropertyWithGallery extends Property {
  gallery: string[];
}

export interface CategoryCount {
  type: string;
  label: string;
  count: number;
}

export interface HomepageSettings {
  heroImage?: string;
  heroHeadline?: string;
  heroSubheading?: string;
  stats?: { value: string; label: string }[];
  ctaHeading?: string;
  ctaSubheading?: string;
  ctaBody?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}
