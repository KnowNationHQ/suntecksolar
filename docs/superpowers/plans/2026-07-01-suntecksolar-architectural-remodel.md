# SunteckSolar Architectural Remodel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) for syntax tracking.

**Goal:** Migrate SunteckSolar from Vite+React SPA to Next.js 16+ App Router with componentized architecture, 2026 performance standards, and Vercel-inspired dark-first aesthetic.

**Architecture:** Next.js 16 App Router with Server Components by default, 7 client islands (theme toggle, hero carousel, product tabs, spec table, FAQs, financing calculator, contact form). Tailwind v4 `@theme` for all styling. Pure TypeScript hook for calculator logic.

**Tech Stack:** Next.js 16+, React 19, Tailwind CSS v4, shadcn/ui (Radix primitives), TanStack Table v9, React Hook Form + Zod, TanStack Query v5

---

## File Structure

```
solar-bright-nigeria/
├── app/
│   ├── globals.css              # Tailwind v4 @theme + brand tokens
│   ├── layout.tsx               # Root layout (fonts, metadata, header/footer shell)
│   ├── page.tsx                 # Composes all sections
│   ├── loading.tsx              # Route-level loading skeleton
│   └── not-found.tsx            # 404 page
├── components/
│   ├── layout/
│   │   ├── header.tsx           # Glassmorphic nav + utility bar
│   │   ├── footer.tsx           # 3-column footer
│   │   └── theme-toggle.tsx     # Client: light/dark/system toggle
│   ├── marketing/
│   │   ├── hero.tsx             # Dual-slide carousel with CTAs
│   │   ├── about.tsx            # Server: about section + why choose us
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
│   └── use-scroll.ts            # Smooth scroll helper
├── lib/
│   ├── utils.ts                 # cn() helper
│   └── pricing.ts               # Placeholder pricing config
├── public/
│   └── assets/                  # Migrated existing images (hero1, hero2, product-*)
├── next.config.ts
├── tsconfig.json
├── components.json              # shadcn config
└── package.json
```

---

### Task 1: Scaffold Next.js Project & Migrate Assets

**Files:**
- Modify: `solar-bright-nigeria/package.json`
- Create: `solar-bright-nigeria/next.config.ts`
- Create: `solar-bright-nigeria/tsconfig.json`
- Create: `solar-bright-nigeria/postcss.config.mjs`
- Create: `solar-bright-nigeria/components.json`
- Create: `solar-bright-nigeria/app/layout.tsx` (skeleton)
- Create: `solar-bright-nigeria/app/page.tsx` (skeleton)
- Move: `src/assets/*` → `public/assets/*`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd C:\Users\hp\Desktop\solar-bright-nigeria
Remove-Item -Recurse -Force node_modules, bun.lockb, package-lock.json, src/App.tsx, src/App.css, src/main.tsx, src/vite-env.d.ts, index.html, vite.config.ts, tsconfig.app.json, tsconfig.node.json, eslint.config.js, postcss.config.js

# Create fresh package.json for Next.js 16
```

Write a new `package.json`:

```json
{
  "name": "suntecksolar",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@tanstack/react-query": "^5.83.0",
    "@tanstack/react-table": "^9.0.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.462.0",
    "react-hook-form": "^7.61.1",
    "zod": "^3.25.76",
    "@hookform/resolvers": "^3.10.0",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "next-themes": "^0.3.0"
  },
  "devDependencies": {
    "@types/node": "^22.16.5",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "typescript": "^5.8.3",
    "postcss": "^8.5.6"
  }
}
```

- [ ] **Step 2: Create next.config.ts**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create postcss.config.mjs**

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 5: Create components.json for shadcn**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

- [ ] **Step 6: Migrate existing images**

```bash
# Move existing assets from src/assets/ to public/assets/
Move-Item "C:\Users\hp\Desktop\solar-bright-nigeria\src\assets\*" "C:\Users\hp\Desktop\solar-bright-nigeria\public\assets\" -Force
Remove-Item "C:\Users\hp\Desktop\solar-bright-nigeria\src\assets" -Force
```

---

### Task 2: Create Utility Files

**Files:**
- Create: `lib/utils.ts`
- Create: `lib/pricing.ts`
- Create: `hooks/use-scroll.ts`

- [ ] **Step 1: Create lib/utils.ts**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Create lib/pricing.ts**

```typescript
export interface Appliance {
  id: string;
  name: string;
  watts: number;
  description: string;
}

export const APPLIANCES: Appliance[] = [
  { id: "lights", name: "LED Lights", watts: 50, description: "Energy-saving LED bulbs" },
  { id: "fans", name: "Ceiling Fans", watts: 75, description: "Standard ceiling fans" },
  { id: "tv", name: "TV", watts: 120, description: "LED/LCD television" },
  { id: "fridge", name: "Fridge", watts: 150, description: "Energy-efficient refrigerator" },
  { id: "freezer", name: "Freezer", watts: 200, description: "Chest/standing freezer" },
  { id: "pump", name: "Water Pump", watts: 500, description: "Borehole/booster pump" },
  { id: "ac", name: "Air Conditioner", watts: 1500, description: "1.5HP split AC" },
];

export const PRICING = {
  costPerKw: 150000,        // ₦ per kW of system capacity — PLACEHOLDER
  depositRate: 0.20,        // 20% upfront
  generatorFuelPerKwh: 450, // ₦ per kWh for generator — PLACEHOLDER
  paymentTerms: [3, 6, 12, 18] as const,
};
```

- [ ] **Step 3: Create hooks/use-scroll.ts**

```typescript
"use client";

import { useCallback } from "react";

export function useScroll() {
  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return { scrollTo };
}
```

---

### Task 3: Configure globals.css with Tailwind v4 @theme

**Files:**
- Create: `app/globals.css`

- [ ] **Step 1: Write the full globals.css**

```css
@import "tailwindcss";

@theme {
  /* SunteckSolar Brand Palette */
  --color-brand-950: #011a14;
  --color-brand-900: #022c22;
  --color-brand-800: #064e3b;
  --color-brand-700: #047857;
  --color-brand-600: #059669;
  --color-brand-500: #10b981;
  --color-brand-400: #34d399;
  --color-brand-300: #6ee7b7;
  --color-brand-200: #a7f3d0;
  --color-brand-100: #d1fae5;

  /* Gold Accent */
  --color-gold-700: #b45309;
  --color-gold-600: #d97706;
  --color-gold-500: #f59e0b;
  --color-gold-400: #fbbf24;
  --color-gold-300: #fcd34d;
  --color-gold-200: #fde68a;

  /* Vercel-style Neutral Surface */
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
  --color-surface-50: #fafafa;

  /* Semantic tokens */
  --color-background: var(--color-surface-950);
  --color-foreground: var(--color-surface-300);
  --color-card: var(--color-surface-900);
  --color-card-foreground: var(--color-surface-100);
  --color-muted: var(--color-surface-800);
  --color-muted-foreground: var(--color-surface-500);
  --color-border: var(--color-surface-800);
  --color-ring: var(--color-gold-500);
  --color-primary: var(--color-brand-500);
  --color-primary-foreground: var(--color-surface-950);
  --color-secondary: var(--color-gold-500);
  --color-secondary-foreground: var(--color-surface-950);
  --color-destructive: #ef4444;
  --color-destructive-foreground: #fafafa;

  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --radius: 0.5rem;
}

@layer base {
  * {
    scrollbar-color: var(--color-surface-700) transparent;
  }

  html {
    scroll-behavior: smooth;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: rgb(16 185 129 / 0.3);
  }
}

@layer utilities {
  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }
  .animate-slide-in {
    animation: slide-in 0.8s ease-out;
  }
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgb(245 158 11 / 0.3); }
  50%      { box-shadow: 0 0 40px rgb(245 158 11 / 0.6); }
}
```

---

### Task 4: Create the Calculator Hook with Tests

**Files:**
- Create: `hooks/use-solar-calculator.ts`

- [ ] **Step 1: Write the pure TypeScript calculator hook**

```typescript
import { useMemo } from "react";
import { APPLIANCES, PRICING } from "@/lib/pricing";

export interface CalculatorInputs {
  quantities: Record<string, number>;
  months: 3 | 6 | 12 | 18;
}

export interface PaymentPlan {
  totalWatts: number;
  systemKw: number;
  systemCost: number;
  deposit: number;
  monthlyPayment: number;
  totalFinanced: number;
  generatorMonthlyCost: number;
  monthlySavings: number;
}

export interface ApplianceLine {
  id: string;
  name: string;
  watts: number;
  quantity: number;
  subtotal: number;
}

export function computeTotalWatts(quantities: Record<string, number>): number {
  return Object.entries(quantities).reduce((sum, [id, qty]) => {
    const appliance = APPLIANCES.find((a) => a.id === id);
    return sum + (appliance ? appliance.watts * qty : 0);
  }, 0);
}

export function computePlan(inputs: CalculatorInputs): PaymentPlan {
  const totalWatts = computeTotalWatts(inputs.quantities);
  const systemKw = Math.ceil(totalWatts / 1000);
  const systemCost = systemKw * PRICING.costPerKw;
  const deposit = Math.round(systemCost * PRICING.depositRate);
  const remaining = systemCost - deposit;
  const monthlyPayment = Math.round(remaining / inputs.months);
  const totalFinanced = deposit + monthlyPayment * inputs.months;

  const monthlyKwh = totalWatts * 8 * 30 / 1000; // 8hrs/day, 30 days
  const generatorMonthlyCost = Math.round(monthlyKwh * PRICING.generatorFuelPerKwh);

  return {
    totalWatts,
    systemKw,
    systemCost,
    deposit,
    monthlyPayment,
    totalFinanced,
    generatorMonthlyCost,
    monthlySavings: generatorMonthlyCost - monthlyPayment,
  };
}

export function getApplianceLines(quantities: Record<string, number>): ApplianceLine[] {
  return APPLIANCES.map((a) => ({
    id: a.id,
    name: a.name,
    watts: a.watts,
    quantity: quantities[a.id] || 0,
    subtotal: a.watts * (quantities[a.id] || 0),
  })).filter((l) => l.quantity > 0);
}

export function useSolarCalculator(inputs: CalculatorInputs): PaymentPlan {
  return useMemo(() => computePlan(inputs), [inputs.quantities, inputs.months]);
}
```

- [ ] **Step 2: Verify the hook compiles**

Run: `npx tsc --noEmit hooks/use-solar-calculator.ts`
Expected: No type errors (or skip if tsconfig paths not yet resolvable)

---

### Task 5: Create Layout Components

**Files:**
- Create: `components/layout/theme-toggle.tsx`
- Create: `components/layout/header.tsx`
- Create: `components/layout/footer.tsx`

- [ ] **Step 1: Create theme-toggle.tsx**

```tsx
"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("sunteck-theme") as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("sunteck-theme", theme);

    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("light", !prefersDark);
    } else {
      root.classList.toggle("light", theme === "light");
    }
  }, [theme]);

  const next = { dark: "light" as const, light: "system" as const, system: "dark" as const };
  const icons = { dark: Moon, light: Sun, system: Monitor };
  const Icon = icons[theme];

  return (
    <button
      onClick={() => setTheme(next[theme])}
      className="p-2 rounded-lg text-surface-400 hover:text-surface-100 hover:bg-surface-800 transition-colors"
      aria-label={`Theme: ${theme}. Click to switch to ${next[theme]}.`}
    >
      <Icon size={18} />
    </button>
  );
}
```

- [ ] **Step 2: Create header.tsx**

```tsx
"use client";

import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Products", href: "products" },
  { label: "FAQs", href: "faqs" },
  { label: "Testimonials", href: "testimonials" },
  { label: "Contact", href: "contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollTo } = useScroll();

  const handleNav = (id: string) => {
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="hidden sm:flex items-center justify-center gap-6 px-6 py-1.5 text-xs text-surface-500 bg-surface-950/60 border-b border-surface-800">
        <a href="tel:+2347031953010" className="flex items-center gap-1.5 hover:text-surface-300 transition-colors">
          <Phone size={12} /> 07031953010
        </a>
        <a href="mailto:helpdesk@suntecksolars.com" className="flex items-center gap-1.5 hover:text-surface-300 transition-colors">
          <Mail size={12} /> helpdesk@suntecksolars.com
        </a>
      </div>

      <nav className="bg-surface-950/80 backdrop-blur-xl border-b border-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => handleNav("home")} className="flex items-center gap-2">
              <img
                src="/lovable-uploads/fc41a91f-0a6f-48d3-b578-6936cebda041.png"
                alt="SunteckSolar"
                className="h-9 w-auto brightness-0 invert"
              />
            </button>

            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="px-3 py-2 text-sm text-surface-400 hover:text-surface-100 transition-colors rounded-lg hover:bg-surface-800"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNav("contact")}
                className="hidden sm:inline-flex px-4 py-2 text-sm font-medium bg-gold-600 hover:bg-gold-500 text-white rounded-lg transition-colors"
              >
                Get a Free Quote
              </button>
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-surface-400 hover:text-surface-100"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-surface-800 bg-surface-900">
            <div className="px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="block w-full text-left px-3 py-2 text-surface-400 hover:text-surface-100 hover:bg-surface-800 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("contact")}
                className="w-full mt-2 px-4 py-2 text-sm font-medium bg-gold-600 hover:bg-gold-500 text-white rounded-lg transition-colors"
              >
                Get a Free Quote
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Create footer.tsx**

```tsx
import { Instagram } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";

const NAV_ITEMS = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Products", href: "products" },
  { label: "FAQs", href: "faqs" },
  { label: "Testimonials", href: "testimonials" },
  { label: "Contact", href: "contact" },
];

export function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img
              src="/lovable-uploads/fc41a91f-0a6f-48d3-b578-6936cebda041.png"
              alt="SunteckSolar"
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-brand-300 text-sm leading-relaxed">
              Nigeria&apos;s premier provider of clean, reliable, and renewable solar energy solutions.
            </p>
            <a
              href="https://instagram.com/suntecksolars"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-brand-300 hover:text-brand-100 transition-colors text-sm"
            >
              <Instagram size={18} /> @suntecksolars
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-200 mb-4">Quick Links</h3>
            <nav className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <FooterLink key={item.href} {...item} />
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-200 mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-brand-300">
              <div>
                <a href="tel:+2347031953010" className="hover:text-brand-100 transition-colors block">07031953010</a>
                <a href="tel:+2348168067764" className="hover:text-brand-100 transition-colors block">08168067764</a>
              </div>
              <div>
                <a href="mailto:helpdesk@suntecksolars.com" className="hover:text-brand-100 transition-colors block">helpdesk@suntecksolars.com</a>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-brand-200">Benin City</p>
                <p>23, Iduowina Road, Off Benin Auchi Road</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-brand-200">Agbor</p>
                <p>23 Old Lagos Asaba Road</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-brand-800 text-center text-sm text-brand-400">
          <p>&copy; 2024 SunteckSolar. All rights reserved. | Empowering Nigeria with Clean Energy</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ label, href }: { label: string; href: string }) {
  const { scrollTo } = useScroll();
  return (
    <button
      onClick={() => scrollTo(href)}
      className="block text-sm text-brand-300 hover:text-brand-100 transition-colors"
    >
      {label}
    </button>
  );
}
```

---

### Task 6: Create Hero Component

**Files:**
- Create: `components/marketing/hero.tsx`

- [ ] **Step 1: Create hero.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Zap, Instagram } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";

const SLIDES = [
  {
    src: "/assets/hero1.jpg",
    title: "Clean, Reliable, and Accessible Solar for Nigeria",
    subtitle:
      "Nigeria&apos;s premier provider of clean, reliable, and renewable solar energy. We&apos;re dedicated to making sustainable power accessible to everyone with innovative financing options.",
  },
  {
    src: "/assets/hero2.jpg",
    title: "Flexible Payment Plans Up to 18 Months",
    subtitle:
      "Empowering homes and businesses across Nigeria with dependable solar solutions, ensuring a brighter, more sustainable future for all.",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const { scrollTo } = useScroll();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const interval = setInterval(() => setCurrent((p) => (p + 1) % SLIDES.length), 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.src}
              alt={`Solar energy solution ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-800/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-surface-100 mb-6 animate-fade-in">
            {SLIDES[current].title}
          </h1>

          <p className="text-lg sm:text-xl text-surface-400 mb-8 leading-relaxed animate-slide-in">
            {SLIDES[current].subtitle}
          </p>

          <div className="inline-flex items-center gap-4 px-5 py-3 mb-8 bg-surface-900/80 backdrop-blur-sm border border-surface-700 rounded-xl animate-fade-in">
            <Zap className="h-5 w-5 text-gold-500" />
            <span className="text-sm text-surface-300 font-medium">Flexible Payment Plans</span>
            <span className="w-px h-5 bg-surface-700" />
            <span className="text-xs text-surface-500">&check; 20% down</span>
            <span className="text-xs text-surface-500">&check; 3&ndash;18 months</span>
            <span className="text-xs text-surface-500">&check; Any project size</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-in">
            <button
              onClick={() => scrollTo("calculator")}
              className="px-8 py-3 text-sm font-semibold bg-gold-600 hover:bg-gold-500 text-white rounded-lg transition-all duration-300 animate-pulse-glow"
            >
              Calculate Your Plan
            </button>
            <button
              onClick={() => scrollTo("products")}
              className="px-8 py-3 text-sm font-semibold border border-surface-600 text-surface-300 hover:bg-surface-800 rounded-lg transition-colors"
            >
              View Products
            </button>
            <a
              href="https://instagram.com/suntecksolars"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-sm font-semibold border border-surface-600 text-surface-300 hover:bg-surface-800 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Instagram size={18} /> Follow
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-gold-500" : "bg-surface-600 hover:bg-surface-500"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
```

---

### Task 7: Create About Component

**Files:**
- Create: `components/marketing/about.tsx`

- [ ] **Step 1: Create about.tsx**

```tsx
import { Zap, Shield, Users } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Clean Energy",
    desc: "Clean energy refers to solar power&apos;s minimal environmental impact. Unlike traditional fossil fuels, solar energy production generates electricity without any air or water pollution, directly contributing to reducing carbon footprint and combating climate change.",
  },
  {
    icon: Shield,
    title: "Reliable Power",
    desc: "Modern solar systems are highly reliable through advancements in technology, including energy storage solutions like batteries. These store excess energy generated during the day, ensuring consistent power supply regardless of weather or time.",
  },
  {
    icon: Users,
    title: "Renewable Future",
    desc: "The sun is an abundant and virtually inexhaustible energy source. SunteckSolar harnesses this natural resource to provide sustainable power, creating an energy system that can support generations to come.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-500 mb-6">
            Clean, Reliable, and Accessible Solar for Nigeria
          </h2>
          <p className="text-lg text-surface-400 max-w-4xl mx-auto leading-relaxed">
            SunteckSolar is Nigeria&apos;s premier provider of clean, reliable, and renewable solar energy.
            We&apos;re dedicated to making sustainable power accessible to everyone with innovative financing
            options, including flexible payment plans of up to 18 months.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-surface-900 border border-surface-800 rounded-xl p-6 hover:border-surface-700 transition-colors">
              <div className="w-11 h-11 bg-brand-500/10 rounded-lg flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-brand-500" />
              </div>
              <h3 className="text-lg font-semibold text-surface-100 mb-3">{f.title}</h3>
              <p className="text-sm text-surface-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-brand-500 mb-8 text-center">Why Choose SunteckSolar?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-surface-100 mb-4">Assured Material Quality</h4>
              <p className="text-sm text-surface-400 mb-4">
                SunteckSolar ensures the highest quality through meticulous selection of every component,
                from solar panels and inverters to batteries and wiring, meeting stringent international standards.
              </p>
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-surface-200">Solar Panels</h5>
                  <p className="text-xs text-surface-500">High-grade silicon cells with robust aluminum frames and tempered glass for durability.</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-surface-200">Inverters &amp; Batteries</h5>
                  <p className="text-xs text-surface-500">High-efficiency inverters and long-lasting lithium-ion batteries for reliable performance.</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-surface-100 mb-4">Commitment to Standards</h4>
              <p className="text-sm text-surface-400 mb-6">
                Our dedication extends beyond components to meeting and exceeding industry standards,
                including those set by the Standards Organisation of Nigeria (SON). We ensure all
                solutions are safe, efficient, and compliant with local regulations.
              </p>
              <div className="flex gap-3">
                <span className="px-3 py-1.5 text-xs font-medium bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-full">SON Certified</span>
                <span className="px-3 py-1.5 text-xs font-medium bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-full">International Standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 8: Create Testimonials Component

**Files:**
- Create: `components/marketing/testimonials.tsx`

- [ ] **Step 1: Create testimonials.tsx**

```tsx
import { Star } from "lucide-react";

const DATA = {
  costSavings: [
    { quote: "I have been able to save thousands daily after solar installation by SunteckSolar.", author: "Chief Vincent", location: "Royal Best Hotel, Dawson" },
    { quote: "For more than 2 years, I have been enjoying uninterrupted power with SunteckSolar for both my house and business place without having to worry about electricity bills.", author: "Eguasa", location: "GRA" },
  ],
  reliability: [
    { quote: "8 months later, power has never gone off.", author: "Mrs. Linus", location: "Agbor" },
    { quote: "I&apos;m grateful to SunteckSolar... It&apos;s been 18 months and my house is not connected to the grid&mdash;just solar by SunteckSolar alone.", author: "Mr. Sato", location: "Auchi Bypass" },
    { quote: "You did an excellent job, SunteckSolar.", author: "Mr. Nonsa", location: "Forestry" },
  ],
  trust: [
    { quote: "Immediately SunteckSolar drove into my compound with the solar material, I was satisfied before the installation even began.", author: "Jerry", location: "Sapele Road" },
    { quote: "I never believed solars work this good before I met SunteckSolar.", author: "Mr. Saga", location: "Agbor" },
    { quote: "SunteckSolar na the Baba for solar.", author: "Mrs. Stella", location: "Ugbor" },
  ],
};

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} className="fill-gold-500 text-gold-500" />
      ))}
    </div>
  );
}

function TestimonialCard({ quote, author, location }: { quote: string; author: string; location: string }) {
  return (
    <div className="bg-surface-900 border border-surface-800 rounded-xl p-6 hover:border-surface-700 transition-colors">
      <Stars />
      <blockquote className="text-sm text-surface-300 mb-4 leading-relaxed">&ldquo;{quote}&rdquo;</blockquote>
      <div className="text-xs">
        <p className="font-medium text-surface-200">{author}</p>
        <p className="text-surface-500">{location}</p>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-surface-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-500 mb-6">What Our Customers Say</h2>
          <p className="text-lg text-surface-400 max-w-3xl mx-auto">
            Real experiences from satisfied customers across Nigeria who have transformed
            their energy needs with SunteckSolar.
          </p>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-semibold text-surface-200 text-center mb-6">Cost Savings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {DATA.costSavings.map((t, i) => <TestimonialCard key={i} {...t} />)}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-surface-200 text-center mb-6">Reliability &amp; Performance</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {DATA.reliability.map((t, i) => <TestimonialCard key={i} {...t} />)}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-surface-200 text-center mb-6">Trust &amp; Satisfaction</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {DATA.trust.map((t, i) => <TestimonialCard key={i} {...t} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 9: Create Radio Promo Component

**Files:**
- Create: `components/marketing/radio-promo.tsx`

- [ ] **Step 1: Create radio-promo.tsx**

```tsx
import { Calendar } from "lucide-react";

export function RadioPromo() {
  return (
    <section className="py-16 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calendar size={18} className="text-gold-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">Weekly Radio Show</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-surface-100 mb-4">
          Solar Yan with the Celebritysolarman
        </h2>
        <p className="text-base text-surface-400 mb-6 max-w-3xl mx-auto leading-relaxed">
          Nigeria&apos;s first solar radio program! Join our CEO every Friday from 3:30 PM to 4:00 PM
          on Speed FM 96.9 to learn about solar energy benefits and ask questions live.
        </p>
        <a
          href="https://www.speedfm969.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex px-6 py-3 text-sm font-semibold bg-gold-600 hover:bg-gold-500 text-white rounded-lg transition-colors"
        >
          Stream Live on Speed FM
        </a>
      </div>
    </section>
  );
}
```

---

### Task 10: Create FAQs Component

**Files:**
- Create: `components/marketing/faqs.tsx`

- [ ] **Step 1: Create faqs.tsx**

```tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is the primary challenge for many Nigerians looking to switch to solar energy?",
    challenge: "The high upfront cost of a complete solar system is a significant barrier for many households and businesses.",
    solution: "SunteckSolar addresses this with flexible payment plans of up to 18 months, breaking down the cost into manageable monthly installments.",
  },
  {
    q: "What is a common risk associated with the proliferation of solar products in Nigeria's market?",
    challenge: "The Nigerian market is flooded with low-quality and counterfeit solar components, leading to poor performance and system failures.",
    solution: "SunteckSolar guarantees assured material quality, sourcing components from reputable, certified manufacturers adhering to rigorous quality standards.",
  },
  {
    q: "How can improper system design impact a solar power system?",
    challenge: "An inadequately designed solar system can fail to meet a customer's energy needs, resulting in frequent outages.",
    solution: "SunteckSolar provides a professional energy audit to accurately assess power requirements, ensuring a custom-designed system.",
  },
  {
    q: "What issues can arise from hiring an inexperienced installer?",
    challenge: "Poor installation can lead to safety hazards like faulty wiring and electrical fires.",
    solution: "SunteckSolar uses a team of certified, highly-trained professionals for all installations, ensuring safety and regulatory compliance.",
  },
  {
    q: "How does Nigeria's climate, particularly Harmattan dust, affect solar panels?",
    challenge: "Dust accumulation during Harmattan significantly reduces panel efficiency by blocking sunlight.",
    solution: "SunteckSolar educates customers on maintenance and offers after-sales packages including scheduled cleanings and inspections.",
  },
  {
    q: "How do solar systems provide power at night or on cloudy days?",
    challenge: "Without high-quality battery storage, a system can't store excess energy for use during off-peak hours.",
    solution: "SunteckSolar integrates advanced battery storage solutions to ensure consistent, uninterrupted power supply 24/7.",
  },
  {
    q: "What issues can arise from a low-quality solar inverter?",
    challenge: "A poor-quality inverter can be inefficient, leading to power loss and potential system failure.",
    solution: "SunteckSolar uses high-efficiency inverters from leading manufacturers designed to maximize energy conversion.",
  },
  {
    q: "What is the lifespan of a solar system, and what can shorten it?",
    challenge: "Lack of proper maintenance can accelerate degradation of all system components.",
    solution: "SunteckSolar offers long-term performance warranty and regular maintenance services to maximize system longevity.",
  },
  {
    q: "Why do some customers remain skeptical about solar energy benefits?",
    challenge: "Many lack a clear understanding of how solar systems work and the long-term cost savings.",
    solution: "SunteckSolar is committed to education, including the radio program \"Solar Yan with the Celebritysolarman\" on Speed FM 96.9.",
  },
  {
    q: "How can homeowners ensure they're using solar electricity effectively?",
    challenge: "Without monitoring, customers might not maximize solar power usage during the day.",
    solution: "SunteckSolar provides advanced monitoring systems to track energy production and consumption in real-time.",
  },
];

export function FAQs() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faqs" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-500 mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-surface-400">Get answers to common questions about solar energy challenges and SunteckSolar&apos;s solutions.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-surface-900 border border-surface-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-surface-800 transition-colors"
                aria-expanded={open === i}
              >
                <h3 className="text-sm font-medium text-surface-200">{faq.q}</h3>
                <ChevronDown
                  size={16}
                  className={`text-surface-500 flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 space-y-3 border-t border-surface-800 pt-3 animate-fade-in">
                  <div>
                    <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Challenge</p>
                    <p className="text-sm text-surface-400">{faq.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-1">SunteckSolution</p>
                    <p className="text-sm text-surface-300">{faq.solution}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 11: Create Product Components

**Files:**
- Create: `components/products/product-tabs.tsx`
- Create: `components/products/spec-table.tsx`

- [ ] **Step 1: Create product-tabs.tsx**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useScroll } from "@/hooks/use-scroll";

const PRODUCTS = [
  {
    id: "inverters",
    label: "Hybrid Inverters",
    items: [
      { title: "Hybrid Solar Inverter", desc: "Intelligent energy management for seamless switching between solar, battery, and grid power.", img: "/assets/product-inverter.jpg" },
    ],
  },
  {
    id: "pumps",
    label: "Water Pumps",
    items: [
      { title: "Solar Water Pump (DC/AC)", desc: "Reliable pumping for agriculture and boreholes with low running costs.", img: "/assets/product-pump.jpg" },
    ],
  },
  {
    id: "freezers",
    label: "Freezers",
    items: [
      { title: "Solar Freezer (DC/AC)", desc: "Efficient off-grid cooling engineered for Nigerian ambient temperatures.", img: "/assets/product-freezer.jpg" },
    ],
  },
  {
    id: "lights",
    label: "Street Lights",
    items: [
      { title: "All-in-One Solar Street Light", desc: "Durable, energy-efficient outdoor lighting for streets, estates, and public spaces.", img: "/assets/product-streetlight.jpg" },
    ],
  },
];

export function ProductTabs() {
  const [active, setActive] = useState(PRODUCTS[0].id);
  const { scrollTo } = useScroll();
  const current = PRODUCTS.find((p) => p.id === active)!;

  return (
    <section id="products" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-500 mb-6">Our Solar Solutions</h2>
          <p className="text-lg text-surface-400 max-w-3xl mx-auto">
            Comprehensive solar products designed for Nigerian conditions, ensuring reliable and efficient performance.
          </p>
        </div>

        <div className="flex justify-center gap-1 mb-10 p-1 bg-surface-900 border border-surface-800 rounded-xl w-fit mx-auto">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                active === p.id
                  ? "bg-surface-800 text-surface-100 font-medium"
                  : "text-surface-500 hover:text-surface-300"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {current.items.map((item, i) => (
            <div key={i} className="bg-surface-900 border border-surface-800 rounded-xl overflow-hidden group hover:border-surface-700 transition-colors">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-surface-100 mb-2">{item.title}</h3>
                <p className="text-sm text-surface-400 mb-4">{item.desc}</p>
                <button
                  onClick={() => scrollTo("contact")}
                  className="text-sm text-gold-500 hover:text-gold-400 font-medium transition-colors"
                >
                  Learn More &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create spec-table.tsx**

```tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";

interface SpecRow {
  component: string;
  material: string;
  certification: string;
  warranty: string;
}

const DATA: SpecRow[] = [
  { component: "Solar Panels", material: "High-grade silicon cells, tempered glass, aluminum frame", certification: "SON, IEC 61215", warranty: "25-year performance" },
  { component: "Inverters", material: "High-efficiency pure sine wave, MPPT charge controller", certification: "SON, IEC 62109", warranty: "5 years" },
  { component: "Batteries", material: "Lithium-ion LiFePO4, deep-cycle", certification: "SON, UN38.3", warranty: "10 years" },
  { component: "Wiring & Cabling", material: "UV-resistant XLPE, oxygen-free copper", certification: "SON, NIS", warranty: "2 years" },
  { component: "Mounting Structure", material: "Galvanized steel, corrosion-resistant", certification: "ISO 9001", warranty: "10 years" },
];

const columnHelper = createColumnHelper<SpecRow>();

const COLUMNS = [
  columnHelper.accessor("component", { header: "Component", cell: (info) => <span className="font-medium text-surface-200">{info.getValue()}</span> }),
  columnHelper.accessor("material", { header: "Material & Specs" }),
  columnHelper.accessor("certification", { header: "Certification" }),
  columnHelper.accessor("warranty", { header: "Warranty" }),
];

export function SpecTable() {
  const [filter, setFilter] = useState("");

  const table = useReactTable({
    data: DATA,
    columns: COLUMNS,
    state: { globalFilter: filter },
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="mt-8 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search specs..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-900 border border-surface-800 rounded-lg text-surface-300 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-colors"
        />
      </div>
      <div className="overflow-x-auto rounded-xl border border-surface-800">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="bg-surface-900 border-b border-surface-800">
                {hg.headers.map((h) => (
                  <th key={h.id} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-surface-500">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-surface-800 last:border-0 hover:bg-surface-800/50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-surface-400">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

### Task 12: Create Financing Calculator Component

**Files:**
- Create: `components/calculators/solar-calc.tsx`

- [ ] **Step 1: Create solar-calc.tsx**

```tsx
"use client";

import { useState } from "react";
import { Zap, Calculator, ChevronRight, ChevronLeft } from "lucide-react";
import { APPLIANCES, PRICING } from "@/lib/pricing";
import { computePlan, getApplianceLines } from "@/hooks/use-solar-calculator";

type Step = "loads" | "terms" | "review";

export function SolarCalc() {
  const [step, setStep] = useState<Step>("loads");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [months, setMonths] = useState<3 | 6 | 12 | 18>(12);

  const updateQty = (id: string, val: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, Math.min(10, val)) }));
  };

  const totalWatts = Object.entries(quantities).reduce((sum, [id, qty]) => {
    const a = APPLIANCES.find((a) => a.id === id);
    return sum + (a ? a.watts * qty : 0);
  }, 0);

  const plan = totalWatts > 0 ? computePlan({ quantities, months }) : null;
  const lines = getApplianceLines(quantities);

  return (
    <section id="calculator" className="py-24 bg-surface-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator size={20} className="text-gold-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">Financing Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-500 mb-4">Calculate Your Solar Plan</h2>
          <p className="text-surface-400">Estimate your system size, costs, and savings with our 18-month flexible payment plan.</p>
        </div>

        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 sm:p-8">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {(["loads", "terms", "review"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  step === s ? "bg-gold-600 text-white" : i < ["loads", "terms", "review"].indexOf(step) ? "bg-brand-600 text-white" : "bg-surface-800 text-surface-500"
                }`}>{i + 1}</div>
                {i < 2 && <div className="w-8 h-px bg-surface-700" />}
              </div>
            ))}
          </div>

          {/* Step 1: Load Selection */}
          {step === "loads" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-surface-100 mb-4">What do you want to power?</h3>
              {APPLIANCES.map((a) => (
                <div key={a.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-surface-200">{a.name}</p>
                    <p className="text-xs text-surface-500">{a.watts}W &mdash; {a.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQty(a.id, (quantities[a.id] || 0) - 1)}
                      className="w-7 h-7 rounded-lg bg-surface-800 text-surface-400 hover:text-surface-100 flex items-center justify-center text-sm transition-colors"
                    >&minus;</button>
                    <span className="w-6 text-center text-sm font-medium text-surface-200">{quantities[a.id] || 0}</span>
                    <button
                      onClick={() => updateQty(a.id, (quantities[a.id] || 0) + 1)}
                      className="w-7 h-7 rounded-lg bg-surface-800 text-surface-400 hover:text-surface-100 flex items-center justify-center text-sm transition-colors"
                    >+</button>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-surface-800">
                <p className="text-sm text-surface-400">Total Load: <span className="font-semibold text-surface-200">{totalWatts}W</span></p>
                <button
                  onClick={() => setStep("terms")}
                  disabled={totalWatts === 0}
                  className="px-5 py-2.5 text-sm font-medium bg-gold-600 hover:bg-gold-500 disabled:bg-surface-800 disabled:text-surface-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment Terms */}
          {step === "terms" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-surface-100 mb-4">Choose your payment plan</h3>
              <div className="grid grid-cols-4 gap-3">
                {PRICING.paymentTerms.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      months === m
                        ? "border-gold-500 bg-gold-500/10 text-gold-400"
                        : "border-surface-800 bg-surface-800/50 text-surface-400 hover:border-surface-700"
                    }`}
                  >
                    <span className="text-lg font-bold block">{m}</span>
                    <span className="text-xs">months</span>
                  </button>
                ))}
              </div>
              {plan && (
                <div className="bg-surface-800/50 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-400">System Cost</span>
                    <span className="text-surface-200 font-medium">&#x20A6;{plan.systemCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-400">Deposit (20%)</span>
                    <span className="text-gold-400 font-medium">&#x20A6;{plan.deposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-400">Monthly Payment</span>
                    <span className="text-brand-400 font-medium">&#x20A6;{plan.monthlyPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-3 border-t border-surface-700">
                    <span className="text-surface-400">vs. Generator Fuel (est.)</span>
                    <span className="text-destructive font-medium">&#x20A6;{plan.generatorMonthlyCost.toLocaleString()}/mo</span>
                  </div>
                  {plan.monthlySavings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-surface-400">Monthly Savings</span>
                      <span className="text-brand-500 font-semibold">&#x20A6;{plan.monthlySavings.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("loads")}
                  className="px-5 py-2.5 text-sm font-medium border border-surface-700 text-surface-300 hover:bg-surface-800 rounded-lg transition-colors flex items-center gap-2"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <button
                  onClick={() => setStep("review")}
                  className="px-5 py-2.5 text-sm font-medium bg-gold-600 hover:bg-gold-500 text-white rounded-lg transition-colors flex items-center gap-2 ml-auto"
                >
                  Review Plan <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === "review" && plan && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-surface-100 mb-4">Your Solar Plan Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "System Size", value: `${plan.systemKw} kW` },
                  { label: "Total Load", value: `${plan.totalWatts} W` },
                  { label: "Deposit", value: `\u20A6${plan.deposit.toLocaleString()}` },
                  { label: "Monthly", value: `\u20A6${plan.monthlyPayment.toLocaleString()}` },
                ].map((s) => (
                  <div key={s.label} className="bg-surface-800/50 rounded-xl p-4 text-center">
                    <p className="text-xs text-surface-500 mb-1">{s.label}</p>
                    <p className="text-lg font-bold text-surface-100">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-surface-800/50 rounded-xl p-5 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-surface-500 mb-3">Appliance Breakdown</p>
                {lines.map((l) => (
                  <div key={l.id} className="flex justify-between text-sm">
                    <span className="text-surface-400">{l.name} &times; {l.quantity}</span>
                    <span className="text-surface-300">{l.subtotal}W</span>
                  </div>
                ))}
              </div>

              <div className="bg-brand-900/50 border border-brand-800 rounded-xl p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-surface-400">Total Financed</span>
                  <span className="text-surface-100 font-semibold">&#x20A6;{plan.totalFinanced.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-surface-400">Duration</span>
                  <span className="text-surface-100">{months} months</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-brand-700">
                  <span className="text-surface-400">Generator Fuel Cost (est.)</span>
                  <span className="text-destructive">&#x20A6;{plan.generatorMonthlyCost.toLocaleString()}/mo</span>
                </div>
                {plan.monthlySavings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-400">Your Solar Payment</span>
                    <span className="text-brand-400 font-semibold">&#x20A6;{plan.monthlyPayment.toLocaleString()}/mo</span>
                  </div>
                )}
                {plan.monthlySavings > 0 && (
                  <div className="bg-brand-600/20 rounded-lg p-3 text-center">
                    <p className="text-brand-400 text-sm font-semibold">
                      Save &#x20A6;{plan.monthlySavings.toLocaleString()} per month vs. generator!
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("terms")}
                  className="px-5 py-2.5 text-sm font-medium border border-surface-700 text-surface-300 hover:bg-surface-800 rounded-lg transition-colors flex items-center gap-2"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <button
                  onClick={() => { setStep("loads"); setQuantities({}); }}
                  className="px-5 py-2.5 text-sm font-medium bg-gold-600 hover:bg-gold-500 text-white rounded-lg transition-colors ml-auto"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 13: Create Contact Components

**Files:**
- Create: `components/contact/contact-info.tsx`
- Create: `components/contact/contact-form.tsx`

- [ ] **Step 1: Create contact-info.tsx**

```tsx
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="bg-surface-900 border border-surface-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-surface-100 mb-6">Contact Information</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Phone size={18} className="text-brand-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-surface-500 uppercase tracking-wider">Phone</p>
            <a href="tel:+2347031953010" className="text-sm text-surface-300 hover:text-surface-100 transition-colors block">07031953010</a>
            <a href="tel:+2348168067764" className="text-sm text-surface-300 hover:text-surface-100 transition-colors block">08168067764</a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail size={18} className="text-brand-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-surface-500 uppercase tracking-wider">Email</p>
            <a href="mailto:helpdesk@suntecksolars.com" className="text-sm text-surface-300 hover:text-surface-100 transition-colors block">helpdesk@suntecksolars.com</a>
            <a href="mailto:sunteckglobalimpactltd@gmail.com" className="text-sm text-surface-300 hover:text-surface-100 transition-colors block">sunteckglobalimpactltd@gmail.com</a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Instagram size={18} className="text-brand-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-surface-500 uppercase tracking-wider">Instagram</p>
            <a href="https://instagram.com/suntecksolars" target="_blank" rel="noopener noreferrer" className="text-sm text-surface-300 hover:text-surface-100 transition-colors">@suntecksolars</a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-brand-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-surface-500 uppercase tracking-wider mb-1">Offices</p>
            <div className="text-sm text-surface-400 space-y-2">
              <div>
                <p className="font-medium text-surface-300">Edo State</p>
                <p>23, Iduowina Road, Off Benin Auchi Road, Benin City</p>
              </div>
              <div>
                <p className="font-medium text-surface-300">Delta State</p>
                <p>23 Old Lagos Asaba Road, Agbor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create contact-form.tsx**

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log("Contact form submission:", data);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent successfully! We'll get back to you soon.");
    reset();
  };

  return (
    <div className="bg-surface-900 border border-surface-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-surface-100 mb-6">Send us a Message</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs font-medium text-surface-400 mb-1.5">First Name</label>
            <input id="firstName" {...register("firstName")} placeholder="Enter your first name" className="w-full px-3 py-2.5 text-sm bg-surface-800 border border-surface-700 rounded-lg text-surface-200 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-colors" />
            {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-medium text-surface-400 mb-1.5">Last Name</label>
            <input id="lastName" {...register("lastName")} placeholder="Enter your last name" className="w-full px-3 py-2.5 text-sm bg-surface-800 border border-surface-700 rounded-lg text-surface-200 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-colors" />
            {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-surface-400 mb-1.5">Email Address</label>
          <input id="email" type="email" {...register("email")} placeholder="Enter your email address" className="w-full px-3 py-2.5 text-sm bg-surface-800 border border-surface-700 rounded-lg text-surface-200 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-colors" />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-surface-400 mb-1.5">Phone Number</label>
          <input id="phone" type="tel" {...register("phone")} placeholder="Enter your phone number" className="w-full px-3 py-2.5 text-sm bg-surface-800 border border-surface-700 rounded-lg text-surface-200 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-colors" />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="subject" className="block text-xs font-medium text-surface-400 mb-1.5">Subject</label>
          <input id="subject" {...register("subject")} placeholder="What can we help you with?" className="w-full px-3 py-2.5 text-sm bg-surface-800 border border-surface-700 rounded-lg text-surface-200 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-colors" />
          {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-xs font-medium text-surface-400 mb-1.5">Message</label>
          <textarea id="message" rows={4} {...register("message")} placeholder="Tell us about your solar energy needs..." className="w-full px-3 py-2.5 text-sm bg-surface-800 border border-surface-700 rounded-lg text-surface-200 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-colors resize-none" />
          {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full px-5 py-3 text-sm font-medium bg-gold-600 hover:bg-gold-500 disabled:bg-surface-800 disabled:text-surface-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
          <Send size={16} /> {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
```

---

### Task 14: Create Root Layout + App Shell

**Files:**
- Create: `app/layout.tsx`
- Create: `app/loading.tsx`
- Create: `app/not-found.tsx`

- [ ] **Step 1: Create app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SunteckSolar — Clean, Reliable & Accessible Solar Energy Solutions in Nigeria",
  description:
    "Nigeria's premier solar energy provider offering flexible payment plans, quality installations, and reliable solar solutions for homes and businesses across Nigeria.",
  keywords: ["solar energy", "Nigeria", "solar panels", "solar installation", "renewable energy"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('sunteck-theme');
                  if (theme === 'light' || (!theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create app/loading.tsx**

```tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-surface-700 border-t-gold-500 rounded-full animate-spin" />
    </div>
  );
}
```

- [ ] **Step 3: Create app/not-found.tsx**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-surface-700 mb-4">404</h1>
        <p className="text-surface-400 mb-6">Page not found</p>
        <Link href="/" className="text-gold-500 hover:text-gold-400 underline text-sm">Return to Home</Link>
      </div>
    </div>
  );
}
```

---

### Task 15: Compose page.tsx

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Create app/page.tsx**

```tsx
import { Hero } from "@/components/marketing/hero";
import { About } from "@/components/marketing/about";
import { Testimonials } from "@/components/marketing/testimonials";
import { RadioPromo } from "@/components/marketing/radio-promo";
import { FAQs } from "@/components/marketing/faqs";
import { ProductTabs } from "@/components/products/product-tabs";
import { SpecTable } from "@/components/products/spec-table";
import { SolarCalc } from "@/components/calculators/solar-calc";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProductTabs />
      <SpecTable />
      <SolarCalc />
      <Testimonials />
      <RadioPromo />
      <FAQs />
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-500 mb-6">Get in Touch</h2>
            <p className="text-lg text-surface-400 max-w-3xl mx-auto">
              Ready to switch to clean, reliable solar energy? Contact us today for a free consultation
              and personalized solar solution for your home or business.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/2347031953010"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Contact us on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
```

---

### Task 16: Install Dependencies & Build

**Files:**
- Modify: `package.json` (already done in Task 1)

- [ ] **Step 1: Install npm dependencies**

```bash
cd C:\Users\hp\Desktop\solar-bright-nigeria
npm install
```

Expected: All dependencies install without errors.

- [ ] **Step 2: Run the dev server to verify**

```bash
npm run dev
```

Expected: Next.js starts on http://localhost:3000 without errors. Page renders all sections.

---

## Spec Coverage Check

| Spec Section | Task(s) |
|---|---|
| 1. Architecture Overview | Task 1 (scaffold), Task 15 (page.tsx), Task 16 (build) |
| 2. File Structure | All tasks |
| 3. Design Foundation (globals.css) | Task 3 |
| 4. Layout Shell (header, footer, theme) | Task 5 |
| 5. Hero Section | Task 6 |
| 6. About Section | Task 7 |
| 7. Product Section (tabs + spec table) | Task 11 |
| 8. Financing Calculator (hook + UI) | Task 4, Task 12 |
| 9. Testimonials Section | Task 8 |
| 10. Radio Promo Section | Task 9 |
| 11. FAQs Section | Task 10 |
| 12. Contact Section (info + form) | Task 13 |
| 13. Error Handling | Task 14 (loading.tsx, not-found.tsx) |
| 14. Accessibility | Built into all components (labels, aria, semantic HTML) |
| 15. Deployment | Follow-up after build verification |
