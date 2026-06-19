import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SignageCalculator } from "@/components/SignageCalculator";
import { SignBoardMockup } from "@/components/Mockups";

export default function SignagePage() {
  return (
    <main>
      <Header />
      <section className="px-6 pt-12 pb-8 border-b rule">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-3">
              3mm ACM board · signage
            </p>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-stock">
              Set the size. Cut the board.
            </h1>
            <p className="font-body text-stock-dim text-sm mt-4 max-w-sm leading-relaxed">
              Enter your dimensions in millimetres — pricing is per square metre by material grade.
            </p>
          </div>
          <SignBoardMockup className="w-full max-w-[240px] mx-auto opacity-80" aria-hidden />
        </div>
      </section>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <SignageCalculator />
        </div>
      </section>
      <Footer />
    </main>
  );
}
