import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json(null, { status: 401 });
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return NextResponse.json({ ...data, email: user.email, avatar: user.user_metadata?.avatar_url });
}

export async function PATCH(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { full_name, phone } = await req.json();
  const { error } = await supabase.from("profiles").upsert({ id: user.id, full_name, phone, updated_at: new Date().toISOString() });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
