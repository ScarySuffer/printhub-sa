import { Province, PROVINCE_CITIES } from "./geography";
import { ServiceSlug } from "./services";

export interface Provider {
  id: string;
  name: string;
  province: Province;
  city: string;
  capabilities: ServiceSlug[];
  leadTimeDays: number;
  capacityPerWeek: number;
  rating: number;
  verified: boolean;
}

// Name fragments are intentionally generic ("Print", "Signs", "Wraps", "Studio")
// combined with the *actual* city so we never get a "Soweto Sign Shop" sitting
// in Limpopo data — the city is the seed, not a free label.
const NAME_TEMPLATES = [
  (city: string) => `${city} Print Co.`,
  (city: string) => `${city} Signs & Decals`,
  (city: string) => `${city} Wrap Studio`,
  (city: string) => `${city} Press House`,
  (city: string) => `${city} Graphics Works`,
  (city: string) => `${city} Print & Design`,
  (city: string) => `${city} Signage Co.`,
  (city: string) => `${city} Digital Print`,
];

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export function generateProviders(count = 50): Provider[] {
  const rand = seededRandom(42);
  const provinces = Object.keys(PROVINCE_CITIES) as Province[];
  const providers: Provider[] = [];

  for (let i = 0; i < count; i++) {
    const province = provinces[Math.floor(rand() * provinces.length)];
    const cities = PROVINCE_CITIES[province];
    const city = cities[Math.floor(rand() * cities.length)];
    const template = NAME_TEMPLATES[Math.floor(rand() * NAME_TEMPLATES.length)];

    const allCaps: ServiceSlug[] = [
      "document-printing",
      "signage",
      "vehicle-branding",
      "design",
      "large-format",
      "packaging",
    ];
    const capCount = 2 + Math.floor(rand() * 3);
    const capabilities = [...allCaps]
      .sort(() => rand() - 0.5)
      .slice(0, capCount);

    providers.push({
      id: `prov-${i + 1}`,
      name: template(city),
      province,
      city,
      capabilities,
      leadTimeDays: 1 + Math.floor(rand() * 6),
      capacityPerWeek: 20 + Math.floor(rand() * 180),
      rating: Math.round((3.6 + rand() * 1.4) * 10) / 10,
      verified: rand() > 0.25,
    });
  }

  return providers;
}

export const PROVIDERS = generateProviders(50);
