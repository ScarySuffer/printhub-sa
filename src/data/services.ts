export type ServiceSlug =
  | "document-printing"
  | "signage"
  | "vehicle-branding"
  | "design"
  | "large-format"
  | "packaging";

export interface ServiceCategory {
  slug: ServiceSlug;
  label: string;
  material: string; // the swatch material shown in the rack
  swatchColor: string; // hex used for the swatch chip
  description: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "document-printing",
    label: "Document printing",
    material: "80gsm bond",
    swatchColor: "#f5f3ee",
    description: "Booklets, reports, flyers, business stationery.",
  },
  {
    slug: "signage",
    label: "Signage",
    material: "3mm ACM board",
    swatchColor: "#3a3a3d",
    description: "Shopfront, directional, safety and event signage.",
  },
  {
    slug: "vehicle-branding",
    label: "Vehicle branding",
    material: "Cast vinyl wrap",
    swatchColor: "#ff4d1c",
    description: "Full wraps, decals, fleet livery.",
  },
  {
    slug: "design",
    label: "Design",
    material: "Layout file",
    swatchColor: "#1f6f5c",
    description: "Brand, layout and pre-press design work.",
  },
  {
    slug: "large-format",
    label: "Large format",
    material: "440gsm banner PVC",
    swatchColor: "#8b8378",
    description: "Banners, pull-ups, billboards, exhibition graphics.",
  },
  {
    slug: "packaging",
    label: "Packaging",
    material: "350gsm board stock",
    swatchColor: "#c9c5bb",
    description: "Boxes, labels, retail and product packaging.",
  },
];

// Categories with a built booking flow at /services/[slug]. Categories not in
// this set route to a pre-filtered provider list instead, since there's no
// dedicated calculator for them yet.
export const BUILT_SERVICE_FLOWS = new Set<ServiceSlug>([
  "document-printing",
  "signage",
  "vehicle-branding",
  "design",
]);

export function serviceHref(slug: ServiceSlug): string {
  return BUILT_SERVICE_FLOWS.has(slug)
    ? `/services/${slug}`
    : `/providers?capability=${slug}`;
}
