import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { name, email, phone, title, type, address, city, price, bedrooms, bathrooms, area, description } =
    await req.json();

  if (!name || !email || !title) {
    return NextResponse.json({ error: "Name, email, and title are required." }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("listing_submissions").insert({
    name,
    email,
    phone,
    title,
    type,
    address,
    city,
    price,
    bedrooms,
    bathrooms,
    area,
    description,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
