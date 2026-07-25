# SunteckSolar — Mobile-First Open Design Restyle

**Date:** 2026-07-06
**Status:** Approved
**Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, shadcn/ui, TypeScript
**Constraint:** Keep all images, logo, and brand colors (green `#10b981` + gold `#f59e0b` + dark surfaces)

## Summary

Visual restyle of the existing SunteckSolar Next.js site to a mobile-first, open/spacious layout. Focus on touch-native interactions, generous whitespace, clearer typographic hierarchy, and a distinctive Nigerian-inspired signature element — all within the existing brand palette.

---

## 1. Design Tokens

### 1.1 Colors (reassign roles, keep values)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#070708` | Page background |
| `--bg-elevated` | `#111113` | Cards, sections |
| `--bg-glass` | `rgba(17,17,19,0.6)` | Glass overlays |
| `--accent-green` | `#10b981` | Primary decorative elements |
| `--accent-gold` | `#f59e0b` | CTAs, highlights, signature motif |
| `--text-primary` | `#f4f4f5` | Headings |
| `--text-body` | `#a1a1aa` | Body copy |
| `--text-muted` | `#71717a` | Labels, captions |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Borders — softer than current `#1f1f23` |

### 1.2 Typography

| Role | Face | Weights | Sizes (mobile → desktop) |
|------|------|---------|--------------------------|
| Display (hero, h1, h2) | **Satoshi** (Fontshare) | 700–900 | 2rem→4.5rem (h1), 1.5rem→2.5rem (h2) |
| Body | **Inter** (Google) | 400–600 | 0.9375rem→1.125rem |
| Label/caption | **Inter** | 500–600 | 0.6875rem→0.75rem, uppercase |

Satoshi replaces Sora for a sharper, more confident display voice. Inter stays for maximal readability on small screens.

### 1.3 Spacing Scale

```
--space-xs: 0.5rem
--space-sm: 1rem
--space-md: 1.5rem
--space-lg: 2.5rem
--space-xl: 4rem     — section padding (mobile)
--space-2xl: 6rem    — section padding (desktop)
```

### 1.4 Border Radius

```
--radius-sm: 0.5rem
--radius-md: 0.75rem  (existing)
--radius-lg: 1rem
--radius-xl: 1.5rem
```

---

## 2. Mobile-First Layout

### 2.1 Grid System

Simple utility approach — no new framework.

```css
.section { padding: var(--space-xl) var(--space-sm); }
@media (width >= 768px) { .section { padding: var(--space-2xl) var(--space-md); } }
@media (width >= 1024px) { .section { padding: var(--space-2xl) 0; max-width: 80rem; margin: 0 auto; } }
```

### 2.2 Per-Section Layout

| Section | Mobile | Tablet (≥640px) | Desktop (≥1024px) |
|---------|--------|-----------------|-------------------|
| Hero | 70svh, stacked content + stat cards below | Same, stat cards in row | Side-by-side: headline left, image right |
| About | Stacked 3 cards, horizontal scroll | Horizontal scroll (snap) | 3-column grid |
| How It Works | 3 stacked steps | 3-column grid | 3-column grid |
| Products | Single card, scrollable tabs | Side-by-side card + image | 2-column card grid |
| Spec Table | Horizontal scroll table | Full-width table | Full-width table |
| Calculator | Sticky step indicator, stacked | Steps inline, wider | Sidebar: steps left, results right |
| Testimonials | Horizontal scroll cards | Same, larger text | 3-column grid |
| Radio Promo | Full-width | Same | Centered max-w-3xl |
| FAQs | Full-width accordion, 56px touch | Same | Centered max-w-3xl |
| Contact | Single column: info then form | 2-column grid | 2-column grid |

### 2.3 Touch Targets

All interactive elements: minimum 48px height/width. Applies to buttons, nav links, FAQ toggles, calculator +/- controls, form inputs.

---

## 3. Component Changes

### 3.1 Hero
- Single static hero image (no carousel — higher conversion for lead-gen)
- Nigerian sunburst CSS background (signature element)
- Split headline: display line + gold-accented highlight line
- Stat cards as glass chips below content
- Reduced CTA density: one primary "Get Your Free Quote" + one secondary "See Products"
- Responsive: stacked mobile → side-by-side desktop

### 3.2 About
- 3 feature cards in horizontal snap-scroll on mobile (touch-native)
- 3-column grid on desktop
- Stats row: 2×2 on mobile → row on desktop

### 3.3 Products
- Keep scrollable tab bar (already mobile-friendly)
- Product card: image top (mobile) → side-by-side (desktop)
- Larger touch targets on "Learn More" / "Get a Quote" links

### 3.4 Spec Table
- Replace `@tanstack/react-table` with native HTML `<table>` + input filter
- Horizontal scroll on mobile, full-width on desktop
- Same columns: Component | Material | Cert | Warranty

### 3.5 Calculator
- 3-step wizard with sticky progress indicator
- +/- buttons: 48×48px minimum
- Results compact on mobile, expanded on desktop
- Save comparison vs generator as a highlight card

### 3.6 FAQs
- Touch targets 56px minimum (currently ~44px)
- Keep grid-rows animation for expand/collapse
- Challenge + Solution format per item

### 3.7 Contact
- Phone numbers first (tap-to-call priority for mobile users)
- Form inputs: 48px height
- Full-width inputs on mobile

### 3.8 Footer
- Server Component (no `"use client"`)
- Native `<a href="#id">` for nav links
- Instagram link, copyright

---

## 4. Signature Element: Nigerian Sunburst

Pure CSS geometric radial pattern in the hero background:
- `radial-gradient()` with angled stops forming a stylized sunburst
- `@keyframes spin { to { transform: rotate(360deg) } }` at 30s linear infinite
- `opacity: 0.10`, `pointer-events: none`
- Echoed as small corner motifs on section dividers
- No SVG, no JS — zero bundle cost

---

## 5. Motion (respects `prefers-reduced-motion`)

| Element | Trigger | Animation |
|---------|---------|-----------|
| Hero sunburst | Page load | Slow CSS rotation (30s, linear, infinite) |
| Section content | Scroll into view | Staggered fade-up (0.1s delays, max 0.4s) |
| Cards | Hover (desktop) | translateY(-4px) + border-glow green→gold |
| Buttons | Tap/click | Micro-bounce scale(0.97→1.03) |
| Section dividers | Scroll | Subtle diagonal clip-path reveal |

---

## 6. Dependency Changes

### Remove (dead/unused)
- `@radix-ui/react-accordion` — not used
- `@radix-ui/react-dialog` — not used
- `@radix-ui/react-dropdown-menu` — not used
- `@radix-ui/react-select` — not used
- `@radix-ui/react-separator` — not used
- `@radix-ui/react-toast` — not used (sonner used instead)
- `@radix-ui/react-tooltip` — not used
- `@tanstack/react-query` — not used
- `class-variance-authority` — not used (no shadcn components installed)
- `clsx` / `tailwind-merge` — used only by `cn()` which nothing imports

### Add
- `@fontsource/satoshi` — display font

### Keep
- `next`, `react`, `react-dom` — core
- `@radix-ui/react-collapsible`, `@radix-ui/react-label`, `@radix-ui/react-slot`, `@radix-ui/react-tabs`, `@radix-ui/react-toast` — kept for now (may be used, verify)
- `lucide-react` — icons
- `react-hook-form` + `zod` + `@hookform/resolvers` — contact form
- `sonner` — toasts
- `@tanstack/react-table` — used in spec-table (will be replaced in cleanup)

---

## 7. Cleanup Before Restyle

1. Strip dead deps from `package.json`
2. Replace `@tanstack/react-table` with native `<table>` in spec-table.tsx
3. Delete `lib/utils.ts` (`cn()` unused)
4. Remove `components/ui` alias from `components.json`
5. Fix footer to Server Component + native `<a href="#id">`
6. Delete unused `useSolarCalculator` hook export from `hooks/use-solar-calculator.ts`
