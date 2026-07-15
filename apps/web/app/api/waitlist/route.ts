import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { validateEmail } from "@/lib/validation/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    const interest = String(body.interest || "").trim();

    const emailError = validateEmail(email);

    if (emailError) {
      return NextResponse.json({ error: emailError }, { status: 400 });
    }

    if (!interest) {
      return NextResponse.json(
        { error: "Please choose what you’re interested in." },
        { status: 400 },
      );
    }

    const { error } = await supabaseAdmin.from("waitlist").insert({
      email,
      name: name || null,
      interest,
      source: "landing",
    });

    if (error?.code === "23505") {
      return NextResponse.json(
        { error: "You’re already on the waitlist ❤️" },
        { status: 409 },
      );
    }

    if (error) {
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
