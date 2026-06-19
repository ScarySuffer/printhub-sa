import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <main>
      <Header />
      <section className="px-6 py-24 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-lg w-full">
          <span className="font-mono text-[120px] leading-none text-ink-line font-semibold select-none block">
            404
          </span>
          <h1 className="font-display font-extrabold text-3xl text-stock mt-4 mb-4">
            Page not found.
          </h1>
          <p className="font-body text-stock-dim text-sm leading-relaxed mb-8">
            This page doesn&apos;t exist, or has moved. If you followed a link that should work, let us know.
          </p>
          <div className="flex gap-4">
            <Link
              href="/"
              className="border rule text-stock font-mono text-xs uppercase tracking-wider px-5 py-3 hover:border-stock transition-colors"
            >
              ← Back home
            </Link>
            <Link
              href="/services"
              className="bg-signal text-ink font-mono text-xs font-semibold uppercase tracking-wider px-5 py-3 hover:bg-stock transition-colors"
            >
              Browse services
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
