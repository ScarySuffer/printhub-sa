import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DesignCalculator } from "@/components/DesignCalculator";
import { DesignArtboardMockup } from "@/components/Mockups";

export default function DesignPage() {
  return (
    <main>
      <Header />
      <section className="px-6 pt-12 pb-8 border-b rule">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-3">
              Layout file · design
            </p>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-stock">
              Scope it. Quote it. Brief it.
            </h1>
            <p className="font-body text-stock-dim text-sm mt-4 max-w-sm leading-relaxed">
              Select what you need, how many revision rounds, and whether you need it rushed.
            </p>
          </div>
          <DesignArtboardMockup className="w-full max-w-[280px] mx-auto opacity-80" aria-hidden />
        </div>
      </section>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <DesignCalculator />
        </div>
      </section>
      <Footer />
    </main>
  );
}
