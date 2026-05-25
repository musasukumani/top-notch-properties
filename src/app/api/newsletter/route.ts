import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json(null, { status: 401 });
  const { data } = await supabase.from("newsletter_subscribers").select("*").eq("user_id", user.id).single();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { subscribed } = await req.json();
  await supabase.from("newsletter_subscribers").upsert({
    user_id: user.id,
    email: user.email!,
    subscribed,
    subscribed_at: new Date().toISOString(),
  });
  return NextResponse.json({ success: true });
}
