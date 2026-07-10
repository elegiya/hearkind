import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  console.log("AUTH CALLBACK URL:", requestUrl.toString());
  console.log("AUTH CALLBACK HAS CODE:", Boolean(code));

  if (!code) {
    console.error("AUTH CALLBACK ERROR: missing code");

    return NextResponse.redirect(
      new URL("/login?error=missing_auth_code", requestUrl.origin),
    );
  }

  const supabase = await createClient();

  const { data, error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("AUTH CALLBACK EXCHANGE ERROR:", {
      message: error.message,
      code: error.code,
      status: error.status,
    });

    return NextResponse.redirect(
      new URL("/login?error=auth_callback_failed", requestUrl.origin),
    );
  }

  console.log("AUTH CALLBACK SUCCESS:", {
    userId: data.user?.id,
    hasSession: Boolean(data.session),
  });

  return NextResponse.redirect(
    new URL("/onboarding", requestUrl.origin),
  );
}