import { createClient } from "./client";

type GoogleAuthFlow = "login" | "signup";

const FLOW_ROUTES: Record<
  GoogleAuthFlow,
  { next: string; errorRedirect: string }
> = {
  login: {
    next: "/onboarding",
    errorRedirect: "/login",
  },
  signup: {
    next: "/onboarding",
    errorRedirect: "/signup",
  },
};

export async function continueWithGoogle(flow: GoogleAuthFlow) {
  const routes = FLOW_ROUTES[flow];
  const callbackUrl = new URL("/auth/callback", window.location.origin);

  callbackUrl.searchParams.set("next", routes.next);
  callbackUrl.searchParams.set("error_redirect", routes.errorRedirect);

  const { data, error } = await createClient().auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl.toString(),
      skipBrowserRedirect: true,
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error) {
    throw error;
  }

  if (!data.url) {
    throw new Error("Google authentication URL was not returned");
  }

  window.location.assign(data.url);
}
