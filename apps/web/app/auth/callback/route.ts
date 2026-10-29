import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function getSafePath(value: string | null, fallback: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

function getErrorRedirect(origin: string, path: string, error: string) {
  const redirectUrl = new URL(path, origin);
  redirectUrl.searchParams.set("error", error);
  return NextResponse.redirect(redirectUrl);
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextPath = getSafePath(
    requestUrl.searchParams.get("next"),
    "/onboarding",
  );
  const errorPath = getSafePath(
    requestUrl.searchParams.get("error_redirect"),
    "/login",
  );

  if (!code) {
    return getErrorRedirect(
      requestUrl.origin,
      errorPath,
      requestUrl.searchParams.has("error")
        ? "auth_callback_failed"
        : "missing_auth_code",
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return getErrorRedirect(
      requestUrl.origin,
      errorPath,
      "auth_callback_failed",
    );
  }

  return NextResponse.redirect(new URL(nextPath, requestUrl.origin));
}
