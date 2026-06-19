import { PROVIDERS } from "./providers";
import { SERVICE_CATEGORIES } from "./services";

export interface TickerEntry {
  id: string;
  label: string; // e.g. "BANNER JOB CONFIRMED"
  city: string;
  minutesAgo: number;
}

const ACTIONS = [
  "JOB CONFIRMED",
  "QUOTE ACCEPTED",
  "FILE RECEIVED",
  "ON PRESS",
  "READY FOR COLLECTION",
  "DISPATCHED",
];

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export function generateTickerEntries(count = 24): TickerEntry[] {
  const rand = seededRandom(7);
  const entries: TickerEntry[] = [];

  for (let i = 0; i < count; i++) {
    const provider = PROVIDERS[Math.floor(rand() * PROVIDERS.length)];
    const service =
      SERVICE_CATEGORIES[Math.floor(rand() * SERVICE_CATEGORIES.length)];
    const action = ACTIONS[Math.floor(rand() * ACTIONS.length)];

    entries.push({
      id: `tick-${i}`,
      label: `${service.label.toUpperCase()} ${action}`,
      city: provider.city,
      minutesAgo: 1 + Math.floor(rand() * 58),
    });
  }

  return entries.sort((a, b) => a.minutesAgo - b.minutesAgo);
}

export const TICKER_ENTRIES = generateTickerEntries(24);
