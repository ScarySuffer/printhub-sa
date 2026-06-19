import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VehicleBrandingCalculator } from "@/components/VehicleBrandingCalculator";
import { VanMockup } from "@/components/Mockups";

export default function VehicleBrandingPage() {
  return (
    <main>
      <Header />
      <section className="px-6 pt-12 pb-8 border-b rule">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-3">
              Cast vinyl wrap · vehicle branding
            </p>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-stock">
              Wrap it. Drive it. Be seen.
            </h1>
            <p className="font-body text-stock-dim text-sm mt-4 max-w-sm leading-relaxed">
              Fleet discounts start at 2 vehicles. Pick your coverage and vinyl finish — price updates instantly.
            </p>
          </div>
          <VanMockup className="w-full max-w-[300px] mx-auto opacity-80" aria-hidden />
        </div>
      </section>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <VehicleBrandingCalculator />
        </div>
      </section>
      <Footer />
    </main>
  );
}
