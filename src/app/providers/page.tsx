"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PROVIDERS } from "@/data/providers";
import { ALL_PROVINCES, PROVINCE_CITIES, Province } from "@/data/geography";
import { SERVICE_CATEGORIES } from "@/data/services";
import { ServiceSlug } from "@/data/services";

function isServiceSlug(value: string | null): value is ServiceSlug {
  return SERVICE_CATEGORIES.some((s) => s.slug === value);
}

export default function ProvidersPage() {
  const searchParams = useSearchParams();
  const initialCapability = searchParams.get("capability");

  const [province, setProvince] = useState<Province | "all">("all");
  const [city, setCity] = useState<string | "all">("all");
  const [capability, setCapability] = useState<ServiceSlug | "all">(
    isServiceSlug(initialCapability) ? initialCapability : "all"
  );

  const availableCities = province === "all" ? [] : PROVINCE_CITIES[province];

  function handleProvinceChange(value: Province | "all") {
    setProvince(value);
    setCity("all"); // reset town whenever province changes — province must be picked first
  }

  const filtered = useMemo(() => {
    return PROVIDERS.filter((p) => {
      if (province !== "all" && p.province !== province) return false;
      if (city !== "all" && p.city !== city) return false;
      if (capability !== "all" && !p.capabilities.includes(capability)) return false;
      return true;
    }).sort((a, b) => a.leadTimeDays - b.leadTimeDays);
  }, [province, city, capability]);

  return (
    <main>
      <Header />
      <section className="px-6 pt-12 pb-8 border-b rule">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-3">
            {filtered.length} of {PROVIDERS.length} providers
          </p>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-stock">
            Find a provider.
          </h1>
        </div>
      </section>

      {/* Filter bar — province must be chosen before town unlocks */}
      <section className="px-6 py-6 border-b rule bg-ink-raised">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-board block mb-2">
              01 — Province
            </label>
            <select
              value={province}
              onChange={(e) => handleProvinceChange(e.target.value as Province | "all")}
              className="w-full border rule bg-ink text-stock font-body text-sm px-3 py-2.5 focus:border-signal outline-none"
            >
              <option value="all">All provinces</option>
              {ALL_PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-board block mb-2">
              02 — Town{province === "all" && " (choose a province first)"}
            </label>
            <select
              value={city}
              disabled={province === "all"}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rule bg-ink text-stock font-body text-sm px-3 py-2.5 focus:border-signal outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="all">All towns</option>
              {availableCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-board block mb-2">
              03 — Capability
            </label>
            <select
              value={capability}
              onChange={(e) => setCapability(e.target.value as ServiceSlug | "all")}
              className="w-full border rule bg-ink text-stock font-body text-sm px-3 py-2.5 focus:border-signal outline-none"
            >
              <option value="all">All services</option>
              {SERVICE_CATEGORIES.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <div className="border rule py-16 text-center">
              <p className="font-body text-stock-dim">
                No providers match that combination yet.
              </p>
              <p className="font-mono text-xs text-board mt-2 uppercase tracking-wider">
                Try a different town or capability
              </p>
            </div>
          ) : (
            <div className="border rule overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="border-b rule font-mono text-[10px] uppercase tracking-wider text-board">
                    <th className="px-4 py-3">Provider</th>
                    <th className="px-4 py-3">Town</th>
                    <th className="px-4 py-3">Province</th>
                    <th className="px-4 py-3">Capabilities</th>
                    <th className="px-4 py-3">Lead time</th>
                    <th className="px-4 py-3">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((provider) => (
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
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-stock-dim">
                        {provider.city}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-stock-dim">
                        {provider.province}
                      </td>
                      <td className="px-4 py-3 font-mono text-[10px] text-board">
                        {provider.capabilities.length} services
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-stock-dim">
                        {provider.leadTimeDays}d
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-signal">
                        {provider.rating.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
