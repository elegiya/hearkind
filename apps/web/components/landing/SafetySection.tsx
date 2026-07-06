import Image from "next/image";

const safetyPoints = [
  "Anonymous by default",
  "Text before voice conversations",
  "Move at your own pace",
];

export default function SafetySection() {
  return (
    <section id="safety" className="bg-[#fffaf4] px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-4 overflow-hidden rounded-[2.5rem] bg-[#4a503d] px-8 py-6 text-white shadow-[0_24px_70px_rgba(42,36,29,0.16)] md:grid-cols-[340px_1fr] md:px-10 md:py-8">
          <div className="flex justify-center md:justify-start">
            <div className="relative h-80 w-80 md:h-[360px] md:w-[360px]">
              <Image
                src="/images/hands-heart-new.png"
                alt="Hands holding a heart"
                fill
                className="scale-110 object-contain"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f0c2a6]">
              Safety first
            </p>

            <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Every conversation
              <br />
              starts with trust
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#f4e5d4]">
              HearKind is designed for supportive peer conversations — not
              therapy, not diagnosis, and not emergency care.
            </p>

            <div className="mt-5 space-y-2">
              {safetyPoints.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f0c2a6]/20 text-sm text-[#f0c2a6]">
                    ✓
                  </span>
                  <span className="text-sm text-[#f4e5d4]">{point}</span>
                </div>
              ))}
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#d8cbbd]">
              For medical emergencies, self-harm risk, or immediate danger,
              please contact local emergency services or a crisis hotline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}