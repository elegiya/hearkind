import Image from "next/image";

export default function SafetySection() {
  return (
    <section id="safety" className="bg-[#fffaf4] px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-[#4a503d] p-10 text-white md:grid-cols-[280px_1fr] md:p-14">
        <div className="flex items-center justify-center">
          <div className="relative h-64 w-64">
            <Image
              src="/images/hands-heart.png"
              alt="Hands holding a heart"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0c2a6]">
            Safety first
          </p>

          <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight">
            Not therapy. Not a crisis line. A safer way to find peer support.
          </h2>

          <p className="mt-6 max-w-2xl leading-8 text-[#f4e5d4]">
            HearKind is designed for supportive peer conversations. For medical
            emergencies, self-harm risk, or immediate danger, please contact
            local emergency services or a crisis hotline.
          </p>
        </div>
      </div>
    </section>
  );
}