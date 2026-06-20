"use client";

import { useState, useEffect } from "react";
import { TICKER_ENTRIES } from "@/data/ticker";

export function TickerBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const items = [...TICKER_ENTRIES, ...TICKER_ENTRIES];

  if (!mounted) {
    // Return a static version during SSR
    return (
      <div className="relative w-full overflow-hidden border-y rule bg-ink-raised" role="status" aria-label="Live order activity">
        <div className="flex whitespace-nowrap ticker-track">
          {items.slice(0, 10).map((entry, i) => (
            <div key={`static-${i}`} className="flex items-center gap-3 px-6 py-2.5 text-xs font-mono tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shrink-0" />
              <span className="text-stock-dim">{entry.label}</span>
              <span className="text-board">·</span>
              <span className="text-stock">{entry.city.toUpperCase()}</span>
              <span className="text-board">·</span>
              <span className="text-board">{entry.minutesAgo} MIN AGO</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden border-y rule bg-ink-raised"
      role="status"
      aria-label="Live order activity"
    >
      <div className="flex whitespace-nowrap ticker-track">
        {items.map((entry, i) => (
          <div
            key={`${entry.id}-${i}`}
            className="flex items-center gap-3 px-6 py-2.5 text-xs font-mono tracking-wide"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal shrink-0" />
            <span className="text-stock-dim">{entry.label}</span>
            <span className="text-board">·</span>
            <span className="text-stock">{entry.city.toUpperCase()}</span>
            <span className="text-board">·</span>
            <span className="text-board">{entry.minutesAgo} MIN AGO</span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-ink-raised to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-ink-raised to-transparent" />
    </div>
  );
}