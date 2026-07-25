# SunteckSolar — Architectural Remodel Design

**Date:** 2026-07-01
**Status:** Draft
**Stack:** Next.js 16+ App Router, React 19, Tailwind CSS v4, shadcn/ui, TanStack Query v5, TanStack Table v9, React Hook Form + Zod

## 1. Architecture Overview

### 1.1 Framework Decision
Migrate from Vite + React SPA to **Next.js 16+ App Router**. Rationale:
- Server Components eliminate JS for static sections (hero, about, products, testimonials, FAQs) — critical for Nigerian 2G/3G networks
- Streaming via Suspense boundaries — paints hero immediately while below-fold sections stream in
- Static export / ISR for CDN edge caching
- Image optimization via `next/image` — automatic WebP/AVIF, lazy loading, responsive sizes
- Font optimization via `next/font` — preloaded Inter subset, no FOUT

### 1.2 Performance Targets (Nigeria-specific)
- **Lighthouse:** 95+ Performance, 100 Accessibility
- **Total JS shipped:** < 50KB (3 client islands only)
- **CSS:** < 20KB (Tailwind v4 purged)
- **LCP:** < 1.5s on 3G
- **First paint:** Streaming hero renders before product section loads

### 1.3 Client Islands (only these ship JS)
1. Theme toggle (light/dark/system)
2. Product tabs (Shadcn Tabs Radix wrapper)
3. Spec table (TanStack Table v9 + search filter)
4. FAQs (Radix Collapsible accordion)
5. Financing calculator (React Hook Form + `useOptimistic`)
6. Contact form (React Hook Form + Zod, no backend hook)
7. Hero carousel auto-advance timer (minimal `useEffect`)

Everything else is a Server Component — zero JS, pure HTML. Bundle target: < 60KB total.

## 2. File Structure

```
solar-bright-nigeria/
├── app/
│   ├── globals.css              # Tailwind v4 @theme + brand tokens
│   ├── layout.tsx               # Root layout (header + footer shell, fonts)
│   ├── page.tsx                 # Compose all sections (~30 lines)
│   ├── loading.tsx              # Route-level loading skeleton
│   └── not-found.tsx            # 404 page
├── components/
│   ├── layout/
│   │   ├── header.tsx           # Glassmorphic nav + utility bar
│   │   ├── footer.tsx           # 3-column footer
│   │   └── theme-toggle.tsx     # Client: light/dark/system toggle
│   ├── marketing/
│   │   ├── hero.tsx             # Dual-slide carousel with CTAs
│   │   ├── testimonials.tsx     # Server: 3-category testimonial cards
│   │   ├── radio-promo.tsx      # Server: radio show banner
│   │   └── faqs.tsx             # Client: accordion FAQ (Radix Collapsible)
│   ├── products/
│   │   ├── product-tabs.tsx     # Client: Shadcn Tabs for 4 product categories
│   │   └── spec-table.tsx       # Client: TanStack Table v9 + search
│   ├── calculators/
│   │   └── solar-calc.tsx       # Client: multi-step financing wizard
│   └── contact/
│       ├── contact-form.tsx     # Client: React Hook Form + Zod
│       └── contact-info.tsx     # Server: static contact details
├── hooks/
│   ├── use-solar-calculator.ts  # Pure TS: computes amortization schedule
│   └── use-toast.ts
├── lib/
│   └── utils.ts                 # cn() helper
├── public/
│   └── assets/                  # Migrated existing images
├── next.config.ts
├── tailwind.config.ts           # NOT USED — Tailwind v4 uses @theme in CSS
└── package.json
```

## 3. Design Foundation (globals.css)

### 3.1 Tailwind v4 @theme

```css
@import "tailwindcss";

@theme {
  /* SunteckSolar Brand Palette */
  --color-brand-900: #022c22;
  --color-brand-800: #064e3b;
  --color-brand-700: #047857;
  --color-brand-600: #059669;
  --color-brand-500: #10b981;
  --color-brand-400: #34d399;
  --color-brand-300: #6ee7b7;
  
  /* Gold accent — CTAs, highlights */
  --color-gold-600: #d97706;
  --color-gold-500: #f59e0b;
  --color-gold-400: #fbbf24;
  --color-gold-300: #fcd34d;
  --color-gold-200: #fde68a;
  
  /* Vercel-style neutrals */
  --color-surface-950: #09090b;
  --color-surface-900: #18181b;
  --color-surface-800: #27272a;
  --color-surface-700: #3f3f46;
  --color-surface-600: #52525b;
  --color-surface-500: #71717a;
  --color-surface-400: #a1a1aa;
  --color-surface-300: #d4d4d8;
  --color-surface-200: #e4e4e7;
  --color-surface-100: #f4f4f5;
  --color-surface-50:  #fafafa;
  
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

### 3.2 Base Layer

- Dark mode default (`bg-surface-950 text-surface-300`)
- Light mode via `.light` class toggle + `prefers-color-scheme: light` fallback
- All borders inherit `border-surface-800`
- Smooth scrolling, tap-highlight transparent on mobile
- Selection color: brand green background

### 3.3 CSS Animations (zero JS)

- `fade-in`: opacity 0→1 + translateY(20px→0), 0.6s ease-out
- `slide-in`: opacity 0→1 + translateX(-20px→0), 0.8s ease-out  
- `pulse-glow`: gold box-shadow pulse for CTA buttons, 2s infinite
- All respect `prefers-reduced-motion`

## 4. Layout Shell

### 4.1 Root Layout (`app/layout.tsx`)

- Server Component
- Loads Inter via `next/font` with `display: 'swap'` + `preload: true`
- Sets `globalThis.__theme` inline script before React hydrates (prevents FOUC)
- Wrap children in `<TooltipProvider>` from shadcn

### 4.2 Header (`components/layout/header.tsx`)

- **Utility bar** (thin, subtle): Phone 07031953010 | Email helpdesk@suntecksolars.com — tap-to-call links
- **Main nav bar**: `sticky top-0`, `bg-surface-950/80 backdrop-blur-xl border-b border-surface-800`
- Logo (existing, inverted in dark mode) on left
- 6 nav links (Home, About, Products, FAQs, Testimonials, Contact) — `scrollIntoView` via `useCallback`
- Prominent gold "Get a Free Quote" CTA button
- Theme toggle (sun/moon icon) on right
- **Mobile**: hamburger → slide-in drawer with same links + CTA
- **Scroll state**: `useEffect` with `scrollY > 50` adds `shadow-sm` to header

### 4.3 Footer (`components/layout/footer.tsx`)

- 3-column grid: logo + description | quick links | contact info
- Brand-900 background, inverted logo
- Instagram icon link
- Copyright line: "© 2024 SunteckSolar. Empowering Nigeria with Clean Energy"

### 4.4 Theme Toggle (`components/layout/theme-toggle.tsx`)

- Client Component (only interactive element in header)
- 3 states: dark (moon) / light (sun) / system (monitor icon)
- Stores in `localStorage` key `sunteck-theme`
- Updates `<html>` class + attribute
- Respects `prefers-color-scheme` media query

## 5. Hero Section

**`components/marketing/hero.tsx`** — Server Component (no JS)

- Full viewport, relative positioned container
- Background: absolute-positioned `<Image>` with `fill`, `objectFit: 'cover'`, `priority` on first slide, `loading="lazy"` on second
- CSS-only carousel: 2 slides, `opacity` transition driven by `@keyframes` + state from a tiny client island? Actually, let's use a minimal `useEffect` interval for slide rotation — client island
- Gradient overlay: `bg-gradient-to-r from-brand-900/95 via-brand-800/60 to-transparent`
- Content boxed to max-w-3xl
- Headline: `text-4xl sm:text-5xl lg:text-7xl font-bold`, gold accent on keywords
- Subtitle: `text-lg sm:text-xl text-surface-400`
- Payment plan highlight card: translucent glass card, 3 feature checks
- Dual CTAs:
  - Gold filled: "Calculate Your Plan" — scrolls to `#calculator`
  - Outlined: "View Products" — scrolls to `#products`
- Slide indicators: 2 dots at bottom, clickable

## 6. About Section

**`components/marketing/about.tsx`** — Server Component (no JS)

- 6-column offset grid (can use `grid-cols-1 md:grid-cols-3`)
- 3 feature cards: Clean Energy (Zap icon, brand-500), Reliable Power (Shield icon, brand-500), Renewable Future (Users icon, brand-500)
- Each card: `bg-surface-900 border border-surface-800 rounded-xl p-6`
- "Why Choose SunteckSolar" section below: 2-column split
  - Left: Assured Material Quality (Solar Panels, Inverters & Batteries bullet points)
  - Right: Commitment to Standards + SON Certified badges
- `h2` section title centered, `text-3xl sm:text-4xl` in brand-500

## 7. Product Section

### 7.1 Product Tabs (`components/products/product-tabs.tsx`)

- Client Component (Shadcn `<Tabs>` wrapper)
- 4 tabs: Inverters | Water Pumps | Freezers | Street Lights
- Each tab panel: 1-column card (or 2-column grid if more products)
- Card layout: `aspect-video` image with `next/image`, title, description, "Learn More" outline button
- Existing product images migrated to `public/assets/`

### 7.2 Spec Table (`components/products/spec-table.tsx`)

- Client Component (TanStack Table v9)
- Search input filters by material/component name
- Columns: Component | Material | Certification | Warranty
- Data inline or from a `lib/data.ts` constant
- Dark themed: `bg-surface-900` header, `bg-surface-950` rows, gold accent on hover
- No pagination (small dataset, < 10 rows)

## 8. Financing Calculator

### 8.1 Hook (`hooks/use-solar-calculator.ts`)

Pure TypeScript, zero React imports. Exported types and functions:

```typescript
type Appliance = { id: string; name: string; watts: number; icon: string }
type PackageConfig = { label: string; appliances: Record<string, number> }

type CalculatorInputs = {
  appliances: Record<string, number>  // applianceId -> quantity
  months: 3 | 6 | 12 | 18
  systemCost: number  // computed from appliances
}

type PaymentPlan = {
  deposit: number     // 20%
  monthlyPayment: number
  totalCost: number
  generatorFuelCost: number  // comparator
  monthlySavings: number
}

function computePlan(inputs: CalculatorInputs): PaymentPlan
```

Default appliance data (configurable):
- Lights: 50W each
- Fans: 75W each
- TV: 120W
- Fridge: 150W
- Freezer: 200W
- Water Pump: 500W
- AC: 1500W

Default pricing: ~₦150,000 per kW of system capacity. **All pricing is placeholder data** — replaceable via a `PRICING_CONFIG` constant in `lib/pricing.ts`.

### 8.2 Calculator UI (`components/calculators/solar-calc.tsx`)

- Client Component — multi-step wizard
- **Step 1 — Load Select**: For each appliance category, a slider or number input (min 0, max 10). Shows real-time wattage total.
- **Step 2 — Payment Plan**: Slider for 3 / 6 / 12 / 18 months. Shows deposit + monthly breakdown.
- **Step 3 — Review**: Full amortization table. Green/red comparison vs. generator fuel cost.
- `useOptimistic` for instant slider feedback without loading state
- Styled as dark card with gold border accent, Vercel glass effect
- Zod validation on inputs (non-negative integers, reasonable max bounds)

## 9. Testimonials Section

**`components/marketing/testimonials.tsx`** — Server Component (no JS)

- 3 categories: Cost Savings (2 items), Reliability & Performance (3 items), Trust & Satisfaction (3 items)
- Each category has an `h3` section title in brand-500
- Grid: 2-col for cost savings, 3-col for the others
- Card: 5 gold stars (SVG), italic quote in quotes, author + location in `text-surface-500`
- `bg-surface-900 border border-surface-800 rounded-xl p-6`

## 10. Radio Promo Section

**`components/marketing/radio-promo.tsx`** — Server Component (no JS)

- Full-width strip with brand-900 background
- Calendar icon + "Weekly Radio Show" label
- "Solar Yan with the Celebritysolarman" headline
- "Nigeria's first solar radio program... Fridays 3:30-4:00 PM on Speed FM 96.9"
- Gold secondary CTA button → external link to speedfm969.com

## 11. FAQs Section

**`components/marketing/faqs.tsx`** — Client Component (Radix Collapsible)

- 10 Q&A items with Challenge / SunteckSolar's Solution format
- Each item: clickable question with chevron icon, expands to show answer
- `bg-surface-900 border border-surface-800 rounded-xl` per item
- Chevron rotates on expansion (CSS transition)
- Animate height via Radix's built-in animation

## 12. Contact Section

### 12.1 Contact Info (`components/contact/contact-info.tsx`)

- Server Component — 4 contact items in a card:
  - Phone: 07031953010 | 08168067764 (tap-to-call `tel:` links)
  - Email: helpdesk@suntecksolars.com (mailto:)
  - Instagram: @suntecksolars (external link)
  - Offices: Benin City + Agbor addresses
- Chairman: Ikehi David Onyesi displayed below

### 12.2 Contact Form (`components/contact/contact-form.tsx`)

- Client Component — React Hook Form + Zod schema
- 5 fields: firstName, lastName, email, phone, subject, message
- Placeholder text matches existing content
- onSubmit: validates, logs to console (no backend), shows sonner toast "Message sent successfully!"
- Error states: red border on invalid fields, error message below
- Submit button `bg-gold-600 hover:bg-gold-500` with loading spinner on submit

### 12.3 WhatsApp FAB

- Fixed bottom-right: `fixed bottom-6 right-6 z-50`
- Green circle button (`bg-[#25D366]`), MessageCircle icon
- Links to `https://wa.me/2347031953010`

## 13. Error Handling

- `not-found.tsx` — 404 page with brand styling
- `error.tsx` — global error boundary with retry button
- Each section wrapped in individual `<Suspense>` with skeleton fallbacks
- Client components catch errors via `try/catch` in event handlers, display toast

## 14. Accessibility

- Skip-to-content link (first focusable element)
- All images have descriptive `alt` text
- ARIA labels on interactive elements (nav buttons, carousel dots, theme toggle)
- `focus-visible` ring styling on all interactive elements
- Color contrast ratios meet WCAG AA (brand green on dark = 6.5:1, gold on dark = 8.1:1)
- Reduced motion media query respected
- Semantic heading hierarchy (h1 → h2 → h3 → h4)
- Form fields have associated `<label>` elements

## 15. Deployment

- Vercel: `next build && next export` for static hosting, or standard `vercel deploy`
- GitHub auto-deploy via Vercel git integration
- Domain: existing custom domain (via Lovable project settings)

## 16. Out of Scope (Future)

- Actual backend API for contact form submissions
- Admin dashboard for managing testimonials/FAQs
- Live chat integration
- E-commerce / payment processing for direct purchases
- Blog/content management
