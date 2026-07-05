export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-[#1f1b16]">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full border border-[#d8cfc2] px-4 py-2 text-sm text-[#6f6254]">
          Anonymous peer support
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
          Find someone who truly understands.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6f6254]">
          HearKind helps people going through similar life challenges connect
          for safe, empathetic, peer-to-peer support.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#"
            className="rounded-full bg-[#1f1b16] px-6 py-3 text-sm font-medium text-white"
          >
            Get started
          </a>

          <a
            href="#"
            className="rounded-full border border-[#d8cfc2] px-6 py-3 text-sm font-medium text-[#1f1b16]"
          >
            Learn more
          </a>
        </div>
      </section>
    </main>
  );
}