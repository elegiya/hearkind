import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    const interest = String(body.interest || "").trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 },
      );
    }

    if (!interest) {
      return NextResponse.json(
        { error: "Please choose what you’re interested in." },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("waitlist")
      .insert({
        email,
        name: name || null,
        interest,
        source: "landing",
      })
      .select("id")
      .single();

    if (error?.code === "23505") {
      return NextResponse.json(
        { error: "You’re already on the waitlist ❤️" },
        { status: 409 },
      );
    }

    if (error) {
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      waitlist: {
        id: data.id,
      },
    });
  } catch (error) {
    console.error("Waitlist API error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}