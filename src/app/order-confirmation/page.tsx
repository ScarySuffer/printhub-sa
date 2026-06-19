import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function OrderConfirmationPage() {
  return (
    <main>
      <Header />
      <section className="px-6 py-24 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-lg w-full">
          <div className="border-l-4 border-confirmed pl-6 mb-10">
            <span className="font-mono text-[10px] uppercase tracking-wider text-confirmed block mb-2">
              Order confirmed
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-stock">
              It&apos;s on press.
            </h1>
          </div>

          <div className="border rule p-6 space-y-3 font-mono text-xs mb-8">
            {[
              ["Order reference", "PHB-2026-00142"],
              ["Status", "File received · awaiting press"],
              ["Provider", "Midrand Print Co."],
              ["Est. completion", "3 business days"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-board">{label}</span>
                <span className="text-stock">{value}</span>
              </div>
            ))}
          </div>

          <p className="font-body text-stock-dim text-sm leading-relaxed mb-8">
            You&apos;ll receive status updates as the job moves through press, finishing, and dispatch. If anything looks off, contact us and we&apos;ll make it right.
          </p>

          <div className="flex gap-4">
            <Link
              href="/"
              className="flex-1 text-center border rule text-stock font-mono text-xs uppercase tracking-wider py-3 hover:border-stock transition-colors"
            >
              Back to home
            </Link>
            <Link
              href="/services"
              className="flex-1 text-center bg-signal text-ink font-mono text-xs uppercase tracking-wider font-semibold py-3 hover:bg-stock transition-colors"
            >
              Place another job
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
