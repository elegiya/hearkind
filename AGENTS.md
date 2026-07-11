# Repository Guidelines

## Project Structure & Module Organization

HearKind is a private peer-support platform organized as a small monorepo. The active product code lives in `apps/web`, a Next.js App Router application built with TypeScript and Tailwind CSS. Route files are in `apps/web/app`, reusable components in `apps/web/components`, shared utilities in `apps/web/lib`, and static assets in `apps/web/public`. Landing sections are under `components/landing`; analytics helpers are in `lib/analytics`; Supabase clients are in `lib/supabase`.

There is no dedicated test directory yet. When adding tests, colocate narrow tests near the code they cover or create a clearly named `__tests__` directory.

## Build, Test, and Development Commands

Run commands from `apps/web`:

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Serves the built production app.

```bash
npm run lint
```

Runs ESLint.

After every implementation, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Coding Style & Naming Conventions

Use TypeScript and React function components. Name components in `PascalCase` (`BrandLogo.tsx`, `WaitlistModal.tsx`) and utility files by domain (`email.ts`, `events.ts`). Prefer existing Tailwind patterns and use scoped route styles only where the page already follows that approach. Keep imports using the `@/` alias.

Reuse existing components before creating new ones. Do not introduce a new UI library unless explicitly requested.

Before changing Next.js routing or framework APIs, read `apps/web/AGENTS.md`; this repo uses a modern Next.js version with breaking changes.

## Design & UX Guidelines

Preserve the warm watercolor visual language. Use the established cream backgrounds, soft cards, warm accents, and dark-green primary buttons. Keep pages responsive across desktop and mobile, and verify that text, cards, and buttons do not overlap or overflow.

## Testing Guidelines

No test framework is configured yet. For now, validate changes with `npm run lint`, `npx tsc --noEmit`, and `npm run build`. If adding tests, document the command in `apps/web/package.json` and use descriptive names such as `WaitlistModal.test.tsx` or `email.test.ts`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative messages, for example `Add Supabase authentication and onboarding foundation` and `Improve responsive landing layout`. Follow that style: start with a verb, keep the subject concise, and describe the user-facing change.

Do not commit or push automatically. Pull requests should include a short summary, screenshots for UI changes, Supabase or environment notes, and verification commands. After each implementation, summarize changed files and remaining risks.

## Security & Configuration Tips

Do not commit `.env.local` or service-role secrets. Browser-safe Supabase values use `NEXT_PUBLIC_` variables; `SUPABASE_SERVICE_ROLE_KEY` must remain server-only. Do not modify Supabase configuration or environment variables unless explicitly requested.
