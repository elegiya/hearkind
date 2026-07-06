import Image from "next/image";

export default function StartSection() {
  return (
    <section id="start" className="bg-[#fffaf4] px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="relative h-72 overflow-hidden rounded-[2rem]">
          <Image
            src="/images/landscape.png"
            alt="A peaceful path through a warm landscape"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c66f4b]">
            Start your journey
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-tight">
            Start with one honest sentence.
          </h2>

          <p className="mt-5 max-w-md leading-8 text-[#6f6254]">
            Soon you’ll be able to describe what you’re carrying and get matched
            with someone who has been through something similar.
          </p>

          <a
            href="#"
            className="mt-8 inline-flex rounded-full bg-[#3f4734] px-7 py-4 text-sm font-medium text-white"
          >
            Join the waitlist
          </a>
        </div>
      </div>
    </section>
  );
}