import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/onboarding");
  }

  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#fbf5ed] px-6 py-16">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm font-medium text-neutral-500">
          HearKind
        </p>

        <h1 className="text-3xl font-semibold text-neutral-900">
          Find someone who understands
        </h1>

        <p className="mt-3 text-neutral-600">
          Sign in to start your private onboarding.
        </p>

        {params.error && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            We couldn&apos;t sign you in. Please try again.
          </p>
        )}

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}