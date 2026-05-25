import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json([], { status: 401 });
  const { data } = await supabase.from("favorites").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { data, error } = await supabase.from("favorites").upsert({
    user_id: user.id,
    property_id: body.property_id,
    property_title: body.property_title,
    property_image: body.property_image,
    property_price: body.property_price,
  }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { property_id } = await req.json();
  await supabase.from("favorites").delete().eq("user_id", user.id).eq("property_id", property_id);
  return NextResponse.json({ success: true });
}
