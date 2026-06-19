import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t rule px-6 py-10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <span className="font-display font-extrabold text-lg text-stock">
            PRINTHUB <span className="text-signal">SA</span>
          </span>
          <p className="font-body text-xs text-board mt-2 max-w-xs">
            Booking printing, signage and branding jobs with vetted providers
            across South Africa.
          </p>
        </div>
        <nav className="flex gap-6 font-mono text-xs uppercase tracking-wider text-stock-dim">
          <Link href="/providers" className="hover:text-stock transition-colors">
            Providers
          </Link>
          <Link href="/services" className="hover:text-stock transition-colors">
            Services
          </Link>
          <Link href="/login" className="hover:text-stock transition-colors">
            Sign in
          </Link>
        </nav>
      </div>
    </footer>
  );
}
