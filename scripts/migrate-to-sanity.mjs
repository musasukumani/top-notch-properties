import { createClient } from "@sanity/client";
import "dotenv/config";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const locationData = [
  { city: "California", country: "US", listingsCount: 7 },
  { city: "Las Vegas", country: "US", listingsCount: 3 },
  { city: "Melbourne", country: "AU", listingsCount: 13 },
  { city: "New York", country: "US", listingsCount: 3 },
];

const agentData = [
  { name: "Savannah Nguyen", title: "Senior Property Consultant", phone: "+1 (555) 234-5678", email: "savannah@topnotchproperties.com", propertiesCount: 42, rating: 4.9 },
  { name: "Annette Black", title: "Luxury Homes Specialist", phone: "+1 (555) 345-6789", email: "annette@topnotchproperties.com", propertiesCount: 38, rating: 4.8 },
  { name: "Kathryn Murphy", title: "Commercial Real Estate Expert", phone: "+1 (555) 456-7890", email: "kathryn@topnotchproperties.com", propertiesCount: 55, rating: 5.0 },
  { name: "David Hardson", title: "Investment Property Advisor", phone: "+1 (555) 567-8901", email: "david@topnotchproperties.com", propertiesCount: 61, rating: 4.7 },
];

const testimonialData = [
  { name: "Kristin Watson", role: "Web Designer", content: "Top Notch Properties made finding our dream home effortless. The team was professional, knowledgeable, and genuinely cared about finding us the right property. We couldn't be happier with our new home.", rating: 5 },
  { name: "Wade Warren", role: "President of Sales", content: "Outstanding service from start to finish. The property recommendations were spot on and the process was completely transparent. I've already referred three colleagues who had equally great experiences.", rating: 5 },
  { name: "Jessica Brown", role: "Founder & CEO", content: "As a first-time buyer I was nervous, but the Top Notch Properties team guided me every step of the way. Their market knowledge is exceptional and the app made tracking listings incredibly easy.", rating: 5 },
  { name: "David Anderson", role: "Customer", content: "Sold my property 20% above asking price within two weeks. The marketing strategy and buyer network at Top Notch Properties is truly second to none. Highly recommend for any serious seller.", rating: 5 },
];

const blogPostData = [
  { title: "Top 8 Amazing Places to Stay in California", excerpt: "Discover the most exclusive and breathtaking luxury properties California has to offer, from Malibu beachfront estates to Napa Valley wine country retreats.", authorIndex: 0, category: "Destinations", slug: "top-places-california", publishedAt: "2024-11-04T00:00:00Z" },
  { title: "The Modern Buyer's Guide to Luxury Real Estate", excerpt: "Everything you need to know before purchasing a luxury property in today's market, from financing strategies to due diligence checklists.", authorIndex: 1, category: "Buying Guide", slug: "luxury-buyers-guide", publishedAt: "2024-11-04T00:00:00Z" },
  { title: "Top 5 Investment Destinations for 2025", excerpt: "Our market analysts identify the five real estate markets poised for exceptional growth, with exclusive data on rental yields and capital appreciation.", authorIndex: 2, category: "Investment", slug: "investment-destinations-2025", publishedAt: "2024-11-04T00:00:00Z" },
  { title: "Most Beautiful Waterfront Homes in the World", excerpt: "A curated collection of the world's most spectacular waterfront residences, showcasing extraordinary architecture and unparalleled natural settings.", authorIndex: 3, category: "Lifestyle", slug: "beautiful-waterfront-homes", publishedAt: "2024-11-04T00:00:00Z" },
  { title: "How to Stage Your Home for a Premium Sale", excerpt: "Professional staging advice from top interior designers that can increase your property value by up to 15% and reduce time on the market.", authorIndex: 0, category: "Selling Tips", slug: "home-staging-premium-sale", publishedAt: "2024-11-04T00:00:00Z" },
  { title: "The Rise of Smart Homes in Luxury Real Estate", excerpt: "How AI and automation are transforming luxury living spaces, and why smart home technology is now a must-have for high-end buyers.", authorIndex: 1, category: "Technology", slug: "smart-homes-luxury-real-estate", publishedAt: "2024-11-04T00:00:00Z" },
];

const propertyData = [
  { title: "One Madison Residences", price: 8500, priceUnit: "month", area: 1869, bedrooms: 3, bathrooms: 2, rating: 4.9, reviewCount: 24, address: "1 Madison Avenue", cityName: "New York", propertyType: "apartment", status: "for-rent", featured: true, yearBuilt: 2020, description: "White-glove full-service residences above Madison Square Park with triple-aspect floor plans, chef's kitchen, and in-unit laundry.", amenities: ["Doorman", "Concierge", "Rooftop Lounge", "Gym", "Bike Storage", "Package Room"] },
  { title: "The Kensington Residences", price: 12500, priceUnit: "month", area: 2100, bedrooms: 3, bathrooms: 3, rating: 5.0, reviewCount: 47, address: "210 Central Park South", cityName: "New York", propertyType: "apartment", status: "for-rent", featured: true, yearBuilt: 2021, description: "Landmark tower apartments with direct Central Park views, bespoke Italian kitchens, and private residents' club on the 42nd floor.", amenities: ["Private Club Floor", "Valet Parking", "Spa", "Screening Room", "Concierge", "Wine Storage"] },
  { title: "Southbank Sky Residences", price: 7200, priceUnit: "month", area: 1650, bedrooms: 2, bathrooms: 2, rating: 4.8, reviewCount: 18, address: "88 Southbank Boulevard", cityName: "Melbourne", propertyType: "apartment", status: "for-rent", featured: true, yearBuilt: 2019, description: "High-rise sky residences with floor-to-ceiling glazing overlooking the Yarra River, engineered oak floors, and premium integrated appliances.", amenities: ["Concierge", "Infinity Pool", "Residents' Lounge", "Gym", "EV Charging", "Storage Cage"] },
  { title: "Grand Canal Apartments", price: 2850000, priceUnit: "sale", area: 2400, bedrooms: 3, bathrooms: 2, rating: 5.0, reviewCount: 33, address: "44 Collins Street", cityName: "Melbourne", propertyType: "apartment", status: "for-sale", featured: true, yearBuilt: 2022, description: "Architecturally awarded whole-floor apartment with private lift access, 270-degree city panorama, and custom joinery throughout.", amenities: ["Private Lift", "Wraparound Terrace", "Smart Home", "Wine Cellar", "2 Car Parks", "Storage"] },
  { title: "Peninsula Apartments", price: 380000, priceUnit: "sale", area: 1860, bedrooms: 6, bathrooms: 3, rating: 4.0, reviewCount: 29, address: "18 Broklyn Street", cityName: "New York", propertyType: "villa", status: "for-sale", featured: true, yearBuilt: 2021, description: "Waterfront villa with breathtaking views and private dock access.", amenities: ["Private Dock", "Pool", "Home Theater", "Gym"] },
  { title: "Eaton Garth Penthouse", price: 1200000, priceUnit: "sale", area: 1860, bedrooms: 6, bathrooms: 3, rating: 5.0, reviewCount: 56, address: "18 Broklyn Street", cityName: "New York", propertyType: "penthouse", status: "for-sale", featured: true, yearBuilt: 2023, description: "Exclusive penthouse with 360-degree city views, private terrace and helipad.", amenities: ["Helipad", "Private Pool", "Butler Service", "Cinema Room"] },
  { title: "Malibu Cliff Villa", price: 2850000, priceUnit: "sale", area: 3200, bedrooms: 5, bathrooms: 4, rating: 4.8, reviewCount: 31, address: "42 Ocean View Drive", cityName: "California", propertyType: "villa", status: "for-sale", featured: false, yearBuilt: 2019, description: "Dramatic cliffside villa with floor-to-ceiling ocean views and a private infinity pool overlooking the Pacific.", amenities: ["Infinity Pool", "Private Gym", "Home Theater", "Wine Cellar", "3-Car Garage"] },
  { title: "Desert Rose Estate", price: 1750000, priceUnit: "sale", area: 2800, bedrooms: 4, bathrooms: 3, rating: 4.7, reviewCount: 19, address: "18 Sunstone Lane", cityName: "Las Vegas", propertyType: "villa", status: "for-sale", featured: false, yearBuilt: 2021, description: "Contemporary desert villa blending indoor-outdoor living with a resort-style backyard and mountain backdrop.", amenities: ["Pool & Spa", "Outdoor Kitchen", "Smart Home", "Solar Panels", "Guest Suite"] },
  { title: "Lakefront Haven Villa", price: 3400000, priceUnit: "sale", area: 4100, bedrooms: 6, bathrooms: 5, rating: 5.0, reviewCount: 44, address: "7 Lakeshore Boulevard", cityName: "Melbourne", propertyType: "villa", status: "for-sale", featured: false, yearBuilt: 2022, description: "Architecturally striking lakefront villa with private pontoon, heated pool and panoramic water views from every room.", amenities: ["Private Pontoon", "Heated Pool", "Rooftop Terrace", "Butler Quarters", "Home Gym"] },
  { title: "Midtown Commerce Tower", price: 4200000, priceUnit: "sale", area: 8500, bedrooms: 0, bathrooms: 6, rating: 4.8, reviewCount: 22, address: "310 Fifth Avenue", cityName: "New York", propertyType: "commercial", status: "for-sale", featured: false, yearBuilt: 2018, description: "Premium grade-A office tower in the heart of Midtown Manhattan with floor plates of up to 1,700 sq ft, 24/7 concierge, and direct subway access.", amenities: ["24/7 Concierge", "Conference Rooms", "Server Room", "Rooftop Terrace", "Underground Parking", "Fiber Internet"] },
  { title: "Sunset Strip Retail Plaza", price: 2750000, priceUnit: "sale", area: 5200, bedrooms: 0, bathrooms: 4, rating: 4.6, reviewCount: 17, address: "8800 Sunset Boulevard", cityName: "California", propertyType: "commercial", status: "for-sale", featured: false, yearBuilt: 2020, description: "High-visibility retail and office plaza on one of LA's most trafficked corridors, featuring 12 ground-floor retail units and 3 upper-floor office suites.", amenities: ["High Foot Traffic", "Shared Lobby", "Loading Bay", "CCTV", "Ample Parking", "Signage Rights"] },
  { title: "The Exchange Business Hub", price: 6800000, priceUnit: "sale", area: 12000, bedrooms: 0, bathrooms: 10, rating: 5.0, reviewCount: 38, address: "22 Collins Street", cityName: "Melbourne", propertyType: "commercial", status: "for-sale", featured: false, yearBuilt: 2023, description: "Melbourne's newest landmark commercial hub, offering open-plan floors with city views, co-working zones, and a ground-floor dining precinct.", amenities: ["Co-working Zones", "Boardrooms", "Bike Storage", "Shower Facilities", "Café Precinct", "EV Charging"] },
  { title: "Fremont Innovation Campus", price: 5100000, priceUnit: "sale", area: 9800, bedrooms: 0, bathrooms: 8, rating: 4.9, reviewCount: 29, address: "45 Innovation Drive", cityName: "Las Vegas", propertyType: "commercial", status: "for-sale", featured: false, yearBuilt: 2021, description: "Purpose-built technology and innovation campus with flexible open floor plans, dedicated server infrastructure, and collaborative break-out areas.", amenities: ["Dedicated Server Rooms", "Open Floor Plans", "Break-out Areas", "Helipad", "24/7 Security", "On-site Gym"] },
  { title: "Ironworks Distribution Centre", price: 1850000, priceUnit: "sale", area: 18000, bedrooms: 0, bathrooms: 4, rating: 4.7, reviewCount: 14, address: "220 Industrial Parkway", cityName: "Las Vegas", propertyType: "warehouse", status: "for-sale", featured: false, yearBuilt: 2017, description: "High-clearance distribution centre with 12m internal height, 6 dock-leveller bays, and direct freeway access.", amenities: ["6 Dock Levellers", "12m Clearance", "Freeway Access", "Sprinkler System", "Staff Amenities", "CCTV"] },
  { title: "Steelyard Industrial Complex", price: 2300000, priceUnit: "sale", area: 24000, bedrooms: 0, bathrooms: 6, rating: 4.5, reviewCount: 9, address: "88 Forge Road", cityName: "Melbourne", propertyType: "warehouse", status: "for-sale", featured: false, yearBuilt: 2016, description: "Expansive multi-unit industrial complex with heavy-duty concrete flooring, three-phase power, and a secure yard of 4,000 sq ft for container storage.", amenities: ["Three-Phase Power", "Concrete Flooring", "Secure Yard", "Container Storage", "Office Fitout", "Roller Doors"] },
  { title: "Apex Cold Storage Facility", price: 3100000, priceUnit: "sale", area: 15000, bedrooms: 0, bathrooms: 4, rating: 4.9, reviewCount: 21, address: "5 Refrigeration Way", cityName: "New York", propertyType: "warehouse", status: "for-sale", featured: false, yearBuilt: 2020, description: "State-of-the-art cold storage and food-grade warehouse with independently controlled temperature zones, solar power, and FDA-compliant fit-out.", amenities: ["Cold Storage Zones", "FDA Compliant", "Solar Power", "Generator Backup", "Loading Docks", "Office Block"] },
  { title: "Pacific Rim Logistics Hub", price: 4600000, priceUnit: "sale", area: 32000, bedrooms: 0, bathrooms: 8, rating: 4.8, reviewCount: 33, address: "300 Harbor Industrial Drive", cityName: "California", propertyType: "warehouse", status: "for-sale", featured: false, yearBuilt: 2022, description: "Premium port-adjacent logistics hub with cross-dock capability, automated conveyor infrastructure, and a 2,000 sq ft mezzanine office overlooking the floor.", amenities: ["Cross-Dock Capability", "Automated Conveyors", "Mezzanine Office", "Port Access", "EV Truck Charging", "24/7 Security"] },
];

async function migrate() {
  console.log("Creating locations...");
  const locationIds = {};
  for (const loc of locationData) {
    const doc = await client.create({ _type: "location", city: loc.city, country: loc.country, listingsCount: loc.listingsCount });
    locationIds[loc.city] = doc._id;
    console.log(`  Created location: ${loc.city} → ${doc._id}`);
  }

  console.log("Creating agents...");
  const agentIds = [];
  for (const ag of agentData) {
    const doc = await client.create({ _type: "agent", name: ag.name, title: ag.title, phone: ag.phone, email: ag.email, propertiesCount: ag.propertiesCount, rating: ag.rating });
    agentIds.push(doc._id);
    console.log(`  Created agent: ${ag.name} → ${doc._id}`);
  }

  console.log("Creating testimonials...");
  for (const t of testimonialData) {
    const doc = await client.create({ _type: "testimonial", name: t.name, role: t.role, content: t.content, rating: t.rating });
    console.log(`  Created testimonial: ${t.name} → ${doc._id}`);
  }

  console.log("Creating blog posts...");
  for (const post of blogPostData) {
    const doc = await client.create({
      _type: "blogPost",
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      slug: { _type: "slug", current: post.slug },
      publishedAt: post.publishedAt,
      author: { _type: "reference", _ref: agentIds[post.authorIndex] },
    });
    console.log(`  Created blog post: ${post.title} → ${doc._id}`);
  }

  console.log("Creating properties...");
  for (const prop of propertyData) {
    const cityId = locationIds[prop.cityName];
    const doc = await client.create({
      _type: "property",
      title: prop.title,
      price: prop.price,
      priceUnit: prop.priceUnit,
      area: prop.area,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      rating: prop.rating,
      reviewCount: prop.reviewCount,
      address: prop.address,
      city: cityId ? { _type: "reference", _ref: cityId } : undefined,
      propertyType: prop.propertyType,
      status: prop.status,
      featured: prop.featured,
      yearBuilt: prop.yearBuilt,
      description: prop.description,
      amenities: prop.amenities,
    });
    console.log(`  Created property: ${prop.title} → ${doc._id}`);
  }

  console.log("\nDone. Open /studio to upload images for each document.");
}

migrate().catch((err) => { console.error(err); process.exit(1); });
