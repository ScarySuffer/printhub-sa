"use client";

const STATS = [
  { value: "50", label: "Providers" },
  { value: "9", label: "Provinces covered" },
  { value: "1–6", label: "Days lead time" },
  { value: "500+", label: "Jobs completed" },
];

export function SpecStrip() {
  return (
    <section className="border-y rule">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-6 py-8 ${
              i !== 0 ? "border-l rule" : ""
            } ${i < 2 ? "border-b md:border-b-0 rule" : ""}`}
          >
            <div className="font-mono text-3xl md:text-4xl font-semibold text-stock">
              {stat.value}
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-board mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
