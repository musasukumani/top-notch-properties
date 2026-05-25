import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, phone, subject, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  console.log("Contact form submission:", { name, email, phone, subject, message });
  return NextResponse.json({ success: true });
}
