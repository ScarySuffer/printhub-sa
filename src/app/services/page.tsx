import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SERVICE_CATEGORIES, serviceHref } from "@/data/services";

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <section className="px-6 pt-16 pb-12 border-b rule">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-4">
            6 categories on the network
          </p>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight text-stock max-w-3xl">
            Pick the stock.
            <br />
            Start the job.
          </h1>
          <p className="font-body text-stock-dim text-base md:text-lg max-w-md mt-6">
            Every category routes to providers who actually handle that
            material — no guesswork on whether they can do it.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-line border rule">
          {SERVICE_CATEGORIES.map((service) => (
            <Link
              key={service.slug}
              href={serviceHref(service.slug)}
              className="group bg-ink hover:bg-ink-raised transition-colors p-8 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div
                  className="h-3 w-12 mb-6"
                  style={{ backgroundColor: service.swatchColor }}
                  aria-hidden
                />
                <div className="font-mono text-[10px] uppercase tracking-wider text-board mb-2">
                  {service.material}
                </div>
                <h2 className="font-display font-bold text-2xl text-stock">
                  {service.label}
                </h2>
              </div>
              <p className="font-body text-sm text-stock-dim mt-4 leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
