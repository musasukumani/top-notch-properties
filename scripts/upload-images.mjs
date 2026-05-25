import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const propertyImages = {
  "One Madison Residences": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  "The Kensington Residences": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  "Southbank Sky Residences": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  "Grand Canal Apartments": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  "Peninsula Apartments": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  "Eaton Garth Penthouse": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
  "Malibu Cliff Villa": "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
  "Desert Rose Estate": "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80",
  "Lakefront Haven Villa": "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=800&q=80",
  "Midtown Commerce Tower": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  "Sunset Strip Retail Plaza": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "The Exchange Business Hub": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
  "Fremont Innovation Campus": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
  "Ironworks Distribution Centre": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
  "Steelyard Industrial Complex": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  "Apex Cold Storage Facility": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  "Pacific Rim Logistics Hub": "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
};

const agentImages = {
  "Savannah Nguyen": "https://i.pravatar.cc/300?img=47",
  "Annette Black": "https://i.pravatar.cc/300?img=48",
  "Kathryn Murphy": "https://i.pravatar.cc/300?img=49",
  "David Hardson": "https://i.pravatar.cc/300?img=15",
};

const testimonialImages = {
  "Kristin Watson": "https://i.pravatar.cc/100?img=44",
  "Wade Warren": "https://i.pravatar.cc/100?img=12",
  "Jessica Brown": "https://i.pravatar.cc/100?img=45",
  "David Anderson": "https://i.pravatar.cc/100?img=13",
};

const blogImages = {
  "Top 8 Amazing Places to Stay in California": "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=80",
  "The Modern Buyer's Guide to Luxury Real Estate": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
  "Top 5 Investment Destinations for 2025": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "Most Beautiful Waterfront Homes in the World": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
  "How to Stage Your Home for a Premium Sale": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "The Rise of Smart Homes in Luxury Real Estate": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
};

const locationImages = {
  "California": "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=600&q=80",
  "Las Vegas": "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=600&q=80",
  "Melbourne": "https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=600&q=80",
  "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
};

async function uploadImage(url, label) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const asset = await client.assets.upload("image", buffer, {
    filename: label.replace(/\s+/g, "-").toLowerCase() + ".jpg",
    contentType,
  });
  return asset._id;
}

async function patchImage(docId, field, assetId) {
  await client.patch(docId).set({
    [field]: { _type: "image", asset: { _type: "reference", _ref: assetId } },
  }).commit();
}

async function processDocuments(type, nameField, imageMap, imageField) {
  const docs = await client.fetch(`*[_type == $type]{ _id, "${nameField}": ${nameField} }`, { type });
  console.log(`\nUploading images for ${docs.length} ${type} documents...`);
  for (const doc of docs) {
    const key = doc[nameField];
    const imageUrl = imageMap[key];
    if (!imageUrl) {
      console.log(`  ⚠ No image mapping for: ${key}`);
      continue;
    }
    try {
      const assetId = await uploadImage(imageUrl, key);
      await patchImage(doc._id, imageField, assetId);
      console.log(`  ✓ ${key}`);
    } catch (err) {
      console.log(`  ✗ ${key}: ${err.message}`);
    }
  }
}

async function main() {
  await processDocuments("property", "title", propertyImages, "image");
  await processDocuments("agent", "name", agentImages, "photo");
  await processDocuments("testimonial", "name", testimonialImages, "avatar");
  await processDocuments("blogPost", "title", blogImages, "image");
  await processDocuments("location", "city", locationImages, "image");
  console.log("\nDone! All images uploaded.");
}

main().catch(console.error);
