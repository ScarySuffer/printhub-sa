import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PROVIDERS } from "@/data/providers";
import { SERVICE_CATEGORIES } from "@/data/services";

export function generateStaticParams() {
  return PROVIDERS.map((p) => ({ id: p.id }));
}

export default async function ProviderProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = PROVIDERS.find((p) => p.id === id);
  if (!provider) notFound();

  return (
    <main>
      <Header />
      <section className="px-6 pt-12 pb-8 border-b rule">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-3">
            {provider.city.toUpperCase()} · {provider.province.toUpperCase()}
          </p>
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-stock">
              {provider.name}
            </h1>
            {provider.verified && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-confirmed border border-confirmed px-3 py-1.5 h-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-confirmed" />
                Verified provider
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-line border rule mb-10">
          <div className="bg-ink p-6">
            <div className="font-mono text-3xl font-semibold text-stock">
              {provider.leadTimeDays}d
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-board mt-1">
              Lead time
            </div>
          </div>
          <div className="bg-ink p-6">
            <div className="font-mono text-3xl font-semibold text-stock">
              {provider.capacityPerWeek}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-board mt-1">
              Jobs / week capacity
            </div>
          </div>
          <div className="bg-ink p-6">
            <div className="font-mono text-3xl font-semibold text-signal">
              {provider.rating.toFixed(1)}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-board mt-1">
              Rating
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-mono text-[10px] uppercase tracking-wider text-board mb-4">
            Capabilities
          </h2>
          <div className="flex flex-wrap gap-3">
            {provider.capabilities.map((cap) => {
              const service = SERVICE_CATEGORIES.find((s) => s.slug === cap);
              if (!service) return null;
              return (
                <Link
                  key={cap}
                  href={
                    cap === "document-printing"
                      ? "/services/document-printing"
                      : `/services/${cap}`
                  }
                  className="border rule px-4 py-2.5 flex items-center gap-2 hover:border-signal transition-colors"
                >
                  <span
                    className="h-2.5 w-2.5"
                    style={{ backgroundColor: service.swatchColor }}
                    aria-hidden
                  />
                  <span className="font-body text-sm text-stock">
                    {service.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <Link
          href={`/checkout?provider=${provider.id}`}
          className="inline-flex bg-signal text-ink font-mono text-sm font-semibold uppercase tracking-wider px-6 py-3.5 hover:bg-stock transition-colors"
        >
          Start a job with this provider
        </Link>
      </section>
      <Footer />
    </main>
  );
}
