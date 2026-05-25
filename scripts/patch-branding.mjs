import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  // Fix testimonial content
  const testimonials = await client.fetch(
    `*[_type == "testimonial" && content match "HomiRX"]{ _id, name, content }`
  );
  console.log(`Patching ${testimonials.length} testimonials...`);
  for (const t of testimonials) {
    const updated = t.content.replace(/HomiRX/g, "Top Notch Properties");
    await client.patch(t._id).set({ content: updated }).commit();
    console.log(`  ✓ ${t.name}`);
  }

  // Fix agent emails
  const agents = await client.fetch(
    `*[_type == "agent" && email match "*homirx*"]{ _id, name, email }`
  );
  console.log(`\nPatching ${agents.length} agent emails...`);
  for (const a of agents) {
    const updated = a.email.replace(/homirx\.com/g, "topnotchproperties.com");
    await client.patch(a._id).set({ email: updated }).commit();
    console.log(`  ✓ ${a.name}: ${updated}`);
  }

  console.log("\nDone.");
}

main().catch(console.error);
