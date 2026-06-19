import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DocumentPrintingCalculator } from "@/components/DocumentPrintingCalculator";
import { BrochureMockup } from "@/components/Mockups";

export default function DocumentPrintingPage() {
  return (
    <main>
      <Header />
      <section className="px-6 pt-12 pb-8 border-b rule">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-3">
              80gsm bond · document printing
            </p>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-stock">
              Upload. Configure. Get quoted.
            </h1>
            <p className="font-body text-stock-dim text-sm mt-4 max-w-sm leading-relaxed">
              Set your paper size, colour mode and finishing. The price updates live as you go.
            </p>
          </div>
          <BrochureMockup className="w-full max-w-[240px] mx-auto opacity-80" aria-hidden />
        </div>
      </section>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <DocumentPrintingCalculator />
        </div>
      </section>
      <Footer />
    </main>
  );
}
