"use client";

import Link from "next/link";
import { PROVIDERS } from "@/data/providers";

export function ProviderManifest() {
  const featured = PROVIDERS.slice(0, 8);

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-stock">
            On the network now.
          </h2>
          <Link
            href="/providers"
            className="font-mono text-xs uppercase tracking-wider text-signal hover:underline"
          >
            View all 50 →
          </Link>
        </div>

        <div className="border rule overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b rule font-mono text-[10px] uppercase tracking-wider text-board">
                <th className="px-4 py-3">Provider</th>
                <th className="px-4 py-3">Province</th>
                <th className="px-4 py-3">Lead time</th>
                <th className="px-4 py-3">Capacity / wk</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {featured.map((provider) => (
                <tr
                  key={provider.id}
                  className="border-b rule last:border-b-0 hover:bg-ink-raised transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/providers/${provider.id}`}
                      className="font-body text-sm text-stock hover:text-signal transition-colors"
                    >
                      {provider.name}
                    </Link>
                    <div className="font-mono text-[10px] text-board mt-0.5">
                      {provider.city.toUpperCase()}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-stock-dim">
                    {provider.province}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-stock-dim">
                    {provider.leadTimeDays}d
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-stock-dim">
                    {provider.capacityPerWeek}
                  </td>
                  <td className="px-4 py-3">
                    {provider.verified ? (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-confirmed">
                        <span className="h-1.5 w-1.5 rounded-full bg-confirmed" />
                        Verified
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-board">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
