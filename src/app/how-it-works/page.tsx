import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { BrochureMockup, VanMockup, SignBoardMockup } from "@/components/Mockups";

const STEPS = [
  {
    number: "01",
    title: "Pick the job type",
    body: "Choose from document printing, signage, vehicle branding or design. Each flow asks the questions that actually matter for that material — nothing more.",
    cta: { label: "Browse services", href: "/services" },
    Mockup: BrochureMockup,
  },
  {
    number: "02",
    title: "Get a live quote",
    body: "The price calculator updates as you configure. When it looks right, you continue to checkout — no back-and-forth with a sales team, no waiting for a quote to land in your inbox.",
    cta: { label: "Try the calculator", href: "/services/document-printing" },
    Mockup: SignBoardMockup,
  },
  {
    number: "03",
    title: "Track it to your door",
    body: "Once you place the order, a vetted provider in your province picks it up. You get status updates from press to delivery. If it's wrong, we make it right.",
    cta: { label: "See providers", href: "/providers" },
    Mockup: VanMockup,
  },
];

export default function HowItWorksPage() {
  return (
    <main>
      <Header />

      <section className="px-6 pt-16 pb-12 border-b rule">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-4">
            Three steps, no guesswork
          </p>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight text-stock max-w-2xl">
            How PrintHub SA works.
          </h1>
        </div>
      </section>

      <section className="px-6 py-0">
        <div className="mx-auto max-w-7xl">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20 ${
                i < STEPS.length - 1 ? "border-b rule" : ""
              }`}
            >
              {/* Alternate image/text sides */}
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <span className="font-mono text-[80px] leading-none font-semibold text-ink-line select-none block mb-4">
                  {step.number}
                </span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-stock mb-4">
                  {step.title}
                </h2>
                <p className="font-body text-stock-dim text-base leading-relaxed max-w-md mb-8">
                  {step.body}
                </p>
                <Link
                  href={step.cta.href}
                  className="inline-flex font-mono text-xs uppercase tracking-wider text-signal border border-signal px-5 py-2.5 hover:bg-signal hover:text-ink transition-colors"
                >
                  {step.cta.label} →
                </Link>
              </div>

              <div className={`flex justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <step.Mockup className="w-full max-w-[320px] opacity-75" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA block */}
      <section className="border-t rule px-6 py-20">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-stock max-w-lg">
            Ready to place your first job?
          </h2>
          <Link
            href="/services"
            className="shrink-0 bg-signal text-ink font-mono text-sm font-semibold uppercase tracking-wider px-8 py-4 hover:bg-stock transition-colors"
          >
            Start a job
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
