# PrintHub SA

A print services marketplace connecting South African businesses with vetted local providers across document printing, signage, vehicle branding, and design.

## Stack

- **Next.js 16** (App Router, static generation)
- **Tailwind CSS v4** (CSS-based config, semantic design tokens)
- **Framer Motion** for animations
- **Fontsource** for self-hosted Archivo + IBM Plex Sans/Mono fonts
- All data is mock — Supabase integration is next (see `src/data/`)

## Local dev

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

1. Push to GitHub
2. Import at vercel.com/new
3. Framework preset: Next.js (auto-detected)
4. No environment variables needed for mock-data version
5. Click Deploy

The vercel.json sets region to cpt1 (Cape Town edge) for lowest latency in ZA.

## Design tokens

All colours are CSS custom properties — dark default, light on [data-theme="light"].
Theme toggle is in the header. First-visit reads prefers-color-scheme. Persisted in localStorage.

| Token          | Dark      | Light     | Usage                       |
|----------------|-----------|-----------|-----------------------------|
| --ink          | #0b0b0c   | #f5f3ee   | Page background             |
| --ink-raised   | #141415   | #eceae4   | Elevated surfaces           |
| --ink-line     | #26262a   | #d8d4cc   | Borders / dividers          |
| --stock        | #f5f3ee   | #0b0b0c   | Primary text                |
| --stock-dim    | #c9c5bb   | #3a3835   | Secondary text              |
| --board        | #8b8378   | #6b6660   | Muted labels                |
| --signal       | #ff4d1c   | #ff4d1c   | CTAs / accents (invariant)  |
| --confirmed    | #1f6f5c   | #1f6f5c   | Success states (invariant)  |

## Adding Supabase backend

1. npm install @supabase/supabase-js
2. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local
3. Replace src/data/ mock files with Supabase queries
4. Wire src/app/login/page.tsx to supabase.auth.signInWithPassword()

## Routes

| Route | Page |
|-------|------|
| / | Homepage |
| /services | Service catalogue |
| /services/document-printing | Document printing calculator |
| /services/signage | Signage calculator |
| /services/vehicle-branding | Vehicle branding calculator |
| /services/design | Design brief calculator |
| /providers | Provider directory with filters |
| /providers/[id] | Provider profile |
| /how-it-works | Three-step explainer |
| /login | Mock auth |
| /checkout | Mock checkout (card/EFT/wallet) |
| /order-confirmation | Post-checkout confirmation |
