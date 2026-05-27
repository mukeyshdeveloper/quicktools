# AGENTS.md — QuickUtils Project Bible

> **Read this before writing a single line of code.**
> This is the single source of truth for architecture, standards, SEO, and conventions.
> Every developer and AI agent must follow this file exactly.
> When in doubt — the answer is here.

**Stack:** Next.js 16.2 (App Router) · TypeScript · Tailwind CSS 4 · Turbopack · Vercel
**Last updated:** May 2026 · **Version:** 2.0.0

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Folder Structure](#2-folder-structure)
3. [Tech Stack & Setup](#3-tech-stack--setup)
4. [TypeScript Rules](#4-typescript-rules)
5. [Component Architecture](#5-component-architecture)
6. [Server vs Client Components](#6-server-vs-client-components)
7. [Adding a New Tool — Exact Steps](#7-adding-a-new-tool--exact-steps)
8. [SEO & Metadata Rules](#8-seo--metadata-rules)
9. [Caching Strategy](#9-caching-strategy)
10. [Styling & Design System](#10-styling--design-system)
11. [Performance Rules](#11-performance-rules)
12. [Google AdSense Rules](#12-google-adsense-rules)
13. [File & Naming Conventions](#13-file--naming-conventions)
14. [Git & Commit Rules](#14-git--commit-rules)
15. [Do's and Don'ts](#15-dos-and-donts)
16. [Quick Reference Card](#16-quick-reference-card)

---

## 1. Project Overview

| Field | Value |
|---|---|
| **Site name** | QuickUtils |
| **Domain** | quickutils.in *(update when confirmed)* |
| **Goal** | Free, fast, SEO-optimised web tools that earn via Google AdSense |
| **Framework** | Next.js 16.2 (App Router) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS 4 |
| **Hosting** | Vercel (free tier) |
| **Monetisation** | Google AdSense |

### Core principles
- **Fast first** — every page must score ≥ 90 on PageSpeed mobile
- **Offline-capable** — all tool logic runs client-side, zero external API calls
- **SEO-ready before deploy** — metadata, schema, and content required on every page
- **No duplication** — shared logic lives in `/lib`, shared UI in `/components`
- **TypeScript everywhere** — no `.js` or `.jsx` files, no `any` types

---

## 2. Folder Structure

```
quickutils/
│
├── app/                                  # App Router root (Next.js 16)
│   ├── layout.tsx                        # Root layout — html, body, fonts, GA, AdSense
│   ├── page.tsx                          # Homepage — tool grid
│   ├── sitemap.ts                        # Auto-generated sitemap (Next.js built-in)
│   ├── robots.ts                         # robots.txt generation
│   ├── not-found.tsx                     # Global 404 page
│   ├── error.tsx                         # Global error boundary
│   ├── loading.tsx                       # Global loading skeleton
│   │
│   ├── (tools)/                          # Route group — shared tools layout
│   │   ├── layout.tsx                    # Tools layout (nav + footer + ad slots)
│   │   │
│   │   ├── age-calculator/
│   │   │   └── page.tsx                  # /age-calculator
│   │   ├── word-counter/
│   │   │   └── page.tsx                  # /word-counter
│   │   ├── bmi-calculator/
│   │   │   └── page.tsx                  # /bmi-calculator
│   │   ├── password-generator/
│   │   │   └── page.tsx
│   │   ├── qr-code-generator/
│   │   │   └── page.tsx
│   │   ├── unit-converter/
│   │   │   └── page.tsx
│   │   ├── color-picker/
│   │   │   └── page.tsx
│   │   ├── json-formatter/
│   │   │   └── page.tsx
│   │   ├── resume-builder/
│   │   │   └── page.tsx
│   │   └── invoice-generator/
│   │       └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── privacy-policy/
│       └── page.tsx
│
├── components/                           # Shared UI components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── AdBanner.tsx                  # Google AdSense unit wrapper
│   ├── homepage/
│   │   ├── ToolGrid.tsx                  # Server component — renders tool cards
│   │   ├── ToolCard.tsx                  # Individual tool card
│   │   └── SearchFilter.tsx              # Client component — search + filter
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Label.tsx
│       ├── ResultCard.tsx
│       └── ResetButton.tsx
│
├── tools/                                # One folder per tool — all logic here
│   ├── age-calculator/
│   │   ├── AgeCalculator.tsx             # "use client" — tool UI + logic
│   │   ├── meta.ts                       # Metadata, schema, keywords
│   │   └── utils.ts                      # Pure calculation functions (tested)
│   ├── word-counter/
│   │   ├── WordCounter.tsx
│   │   ├── meta.ts
│   │   └── utils.ts
│   └── bmi-calculator/
│       ├── BmiCalculator.tsx
│       ├── meta.ts
│       └── utils.ts
│
├── lib/                                  # Shared utilities (no UI, no React)
│   ├── tools.ts                          # Master list of all tools
│   ├── formatters.ts                     # formatNumber, formatDate, etc.
│   ├── validators.ts                     # Input validation helpers
│   └── schema.ts                         # generateToolSchema() helper
│
├── types/                                # Global TypeScript types
│   ├── tool.ts                           # Tool, ToolMeta, ToolCategory types
│   └── index.ts                          # Re-exports all types
│
├── public/
│   ├── favicon.ico
│   ├── og-default.png                    # 1200×630px default OG image
│   └── icons/                            # Per-tool OG images (1200×630px each)
│
├── proxy.ts                              # Network proxy (replaces middleware.ts in Next.js 16)
├── next.config.ts                        # TypeScript config (not .js)
├── tailwind.config.ts                    # Tailwind config
├── tsconfig.json                         # Strict TypeScript config
├── eslint.config.mjs                     # ESLint flat config (ESLint 9+)
├── .env.local                            # Secrets — never commit
├── .env.example                          # Committed template of .env.local
├── AGENTS.md                             # ← You are here
└── package.json
```

---

## 3. Tech Stack & Setup

| Layer | Package | Version | Notes |
|---|---|---|---|
| Framework | `next` | `^16.2.6` | App Router, TypeScript-first |
| Language | TypeScript | `^5.7` | Strict mode — no exceptions |
| React | `react` / `react-dom` | `^19.2` | Required by Next.js 16 |
| Styling | `tailwindcss` | `^4.0` | CSS-first config |
| Bundler | Turbopack | built-in | Default in Next.js 16, no config needed |
| React Compiler | `babel-plugin-react-compiler` | latest | Auto-memoisation, opt-in |
| Icons | `lucide-react` | latest | Tree-shakeable SVG icons |
| Fonts | `next/font/google` | built-in | No external `<link>` tags |
| Analytics | `@next/third-parties` | latest | `<GoogleAnalytics>` component |
| Lint | `eslint` + `eslint-config-next` | `^9` | Flat config (`eslint.config.mjs`) |

### Bootstrap a new project
```bash
npx create-next-app@latest quickutils \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --turbopack

cd quickutils
npm install lucide-react @next/third-parties
npm install --save-dev babel-plugin-react-compiler
```

### next.config.ts
```ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  // Cache Components — opt-in caching with "use cache" directive (Next.js 16)
  cacheComponents: true,

  // React Compiler — automatic memoisation
  reactCompiler: true,

  // Turbopack filesystem cache (beta) — faster dev restarts
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default config
```

### tsconfig.json — required settings
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 4. TypeScript Rules

### Strict — no exceptions
- `strict: true` is enabled. Never disable it, not even for one file.
- Never use `any`. Use `unknown` and narrow, or define a proper type.
- Never use `// @ts-ignore` or `// @ts-nocheck`.
- All function parameters and return types must be explicitly typed.

### Type definitions
```ts
// types/tool.ts — always add new tools here

export type ToolCategory =
  | 'calculator'
  | 'text'
  | 'health'
  | 'developer'
  | 'generator'
  | 'business'

export interface ToolMeta {
  slug: string               // matches the URL: 'age-calculator'
  name: string               // display name: 'Age Calculator'
  description: string        // ≤ 160 chars for SEO
  title: string              // full <title> tag: 'Age Calculator – ... | QuickUtils'
  category: ToolCategory
  icon: string               // emoji or lucide icon name
  color: string              // tailwind color name: 'green', 'blue'
  keywords: string[]         // for metadata.keywords
  canonical: string          // '/age-calculator'
  ogImage?: string           // '/icons/age-calculator.png'
}

export interface ToolResult<T> {
  data: T | null
  error: string | null
}
```

### Utility function typing — always pure, always typed
```ts
// tools/age-calculator/utils.ts

export interface AgeResult {
  years: number
  months: number
  days: number
  totalDays: number
  totalWeeks: number
  totalMonths: number
  nextBirthdayDays: number
  nextBirthdayDate: string
}

// Pure function — no side effects, no React, easy to unit test
export function calculateAge(dob: Date, asOf: Date): AgeResult | null {
  if (dob >= asOf) return null
  // ... implementation
}
```

---

## 5. Component Architecture

### Every tool has exactly three files

```
tools/age-calculator/
  ├── AgeCalculator.tsx   — "use client" UI component
  ├── meta.ts             — static metadata + schema
  └── utils.ts            — pure calculation functions (no React)
```

### Tool component rules — every tool must
1. Start with `'use client'` directive (tools need interactivity)
2. Import calculation logic from `./utils.ts` — never inline business logic in components
3. Accept **no required props** — fully self-contained
4. Handle empty / invalid inputs **without crashing** — always show a friendly state
5. Show results **only** when input is valid — never show a partial/broken result
6. Include a **Reset** button that clears all state
7. Never call `fetch()` or any external API — 100% offline-capable

### Tool component template
```tsx
// tools/age-calculator/AgeCalculator.tsx
'use client'

import { useState } from 'react'
import { calculateAge, type AgeResult } from './utils'
import ResultCard from '@/components/ui/ResultCard'
import ResetButton from '@/components/ui/ResetButton'

export default function AgeCalculator() {
  const today = new Date().toISOString().split('T')[0] as string

  const [dob, setDob] = useState<string>('')
  const [asOf, setAsOf] = useState<string>(today)
  const [result, setResult] = useState<AgeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleCalculate() {
    if (!dob) { setError('Please enter a date of birth.'); return }
    const res = calculateAge(new Date(dob), new Date(asOf))
    if (!res) { setError('Date of birth must be before the selected date.'); return }
    setError(null)
    setResult(res)
  }

  function handleReset() {
    setDob('')
    setAsOf(today)
    setResult(null)
    setError(null)
  }

  return (
    <div className="space-y-4">
      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dob" className="label">Date of Birth</label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="input"
            aria-label="Date of birth"
          />
        </div>
        <div>
          <label htmlFor="asof" className="label">Calculate As Of</label>
          <input
            id="asof"
            type="date"
            value={asOf}
            onChange={(e) => setAsOf(e.target.value)}
            className="input"
            aria-label="Calculate age as of date"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <p role="alert" className="text-sm text-red-500">{error}</p>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={handleCalculate} className="btn-primary">
          Calculate Age
        </button>
        {result && <ResetButton onClick={handleReset} />}
      </div>

      {/* Result — only shown when valid */}
      {result && <ResultCard result={result} />}
    </div>
  )
}
```

### Tool page template — copy for every new tool
```tsx
// app/(tools)/age-calculator/page.tsx
import type { Metadata } from 'next'
import { meta } from '@/tools/age-calculator/meta'
import AgeCalculator from '@/tools/age-calculator/AgeCalculator'
import AdBanner from '@/components/layout/AdBanner'
import { generateToolSchema } from '@/lib/schema'

// generateMetadata — Next.js 16 App Router pattern (not <Head>)
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${meta.canonical}`,
    images: [{ url: meta.ogImage ?? '/og-default.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
}

// This is a Server Component by default — no "use client" here
export default function AgeCalculatorPage() {
  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Age Calculator
        </h1>
        <p className="mb-8 text-gray-500">{meta.description}</p>

        {/* Ad above tool */}
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        {/* Tool — Client Component */}
        <AgeCalculator />

        {/* Ad below result */}
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-8" />

        {/* SEO content — required, 200–300 words */}
        <section className="mt-12 space-y-4 text-sm text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900">
            How to Use the Age Calculator
          </h2>
          <p>
            {/* Write original content here — never copy from other sites */}
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>
          <h3 className="font-medium text-gray-800">
            How accurate is this age calculator?
          </h3>
          <p>{/* Answer */}</p>

          {/* Related tools — internal linking required */}
          <h2 className="text-xl font-semibold text-gray-900">Related Tools</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><a href="/bmi-calculator" className="text-brand underline">BMI Calculator</a></li>
            <li><a href="/calorie-calculator" className="text-brand underline">Calorie Calculator</a></li>
          </ul>
        </section>
      </main>
    </>
  )
}
```

---

## 6. Server vs Client Components

This is **critical** in Next.js 16 App Router. Wrong usage kills performance.

### Default: Server Component
Every file in `app/` and `components/` is a **Server Component by default**.
Only add `'use client'` when the component actually needs it.

### Add `'use client'` only when the component uses
- `useState`, `useEffect`, `useReducer`, `useRef`
- Browser APIs (`window`, `document`, `localStorage`)
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- Third-party client-only libraries (e.g. chart libraries)

### Decision chart
```
Does the component need useState / useEffect / browser APIs?
  ├── YES → add "use client" at the top
  └── NO  → keep as Server Component (default, no directive needed)

Does the component fetch data?
  ├── YES (from DB / API) → Server Component, use async/await directly
  └── YES (from user input) → Client Component, handle in state

Does the component render static markup only?
  └── YES → Server Component (fastest possible — zero JS sent to browser)
```

### Pattern — push `"use client"` as far down the tree as possible

```tsx
// ✅ Good — only the interactive part is a client component
// app/(tools)/age-calculator/page.tsx  ← Server Component
export default function Page() {
  return (
    <main>
      <h1>Age Calculator</h1>  {/* rendered on server, no JS */}
      <AgeCalculator />        {/* only this is "use client" */}
    </main>
  )
}

// ❌ Bad — entire page is client-side, H1 and static text waste hydration
'use client'
export default function Page() {
  return (
    <main>
      <h1>Age Calculator</h1>
      <AgeCalculator />
    </main>
  )
}
```

### `"use cache"` — Next.js 16 Cache Components (opt-in)

Use `"use cache"` for components or functions that return data that doesn't change often.
This is **not** needed for tool pages (they are fully dynamic). Use it for:

```ts
// lib/tools.ts — the tool list never changes at runtime
'use cache'

import type { ToolMeta } from '@/types'

export async function getAllTools(): Promise<ToolMeta[]> {
  // This result is cached automatically — no revalidation needed for static data
  return tools
}
```

---

## 7. Adding a New Tool — Exact Steps

**Follow every step in order. Do not skip any.**

```
╔══════════════════════════════════════════════════════════════╗
║  STEP 1 — Create the tool folder and files                   ║
║                                                              ║
║  tools/your-tool-name/                                       ║
║    ├── YourTool.tsx     ← "use client" UI component          ║
║    ├── meta.ts          ← SEO metadata + schema              ║
║    └── utils.ts         ← pure calculation functions         ║
╚══════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════╗
║  STEP 2 — Fill meta.ts                                       ║
║                                                              ║
║  export const meta: ToolMeta = {                             ║
║    slug: 'your-tool-name',                                   ║
║    name: 'Your Tool Name',                                   ║
║    title: 'Your Tool – Benefit | QuickUtils',   ← ≤60 chars ║
║    description: '...',                          ← ≤160 chars║
║    category: 'calculator',                                   ║
║    icon: '📐',                                               ║
║    color: 'blue',                                            ║
║    keywords: ['keyword 1', 'keyword 2'],                     ║
║    canonical: '/your-tool-name',                             ║
║  }                                                           ║
╚══════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════╗
║  STEP 3 — Write utils.ts (pure functions only)               ║
║                                                              ║
║  - No React imports                                          ║
║  - All functions explicitly typed                            ║
║  - All edge cases handled (returns null on invalid input)    ║
╚══════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════╗
║  STEP 4 — Build YourTool.tsx                                 ║
║                                                              ║
║  - 'use client' at top                                       ║
║  - Import calculation from ./utils                           ║
║  - No required props                                         ║
║  - Has Reset button                                          ║
║  - Shows result only when valid                              ║
╚══════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════╗
║  STEP 5 — Create the page                                    ║
║                                                              ║
║  app/(tools)/your-tool-name/page.tsx                         ║
║  - Export metadata using generateMetadata or const metadata  ║
║  - AdBanner above + below tool                               ║
║  - 200–300 word original SEO content section                 ║
║  - 2–3 internal links to related tools                       ║
║  - Schema markup via generateToolSchema()                    ║
╚══════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════╗
║  STEP 6 — Register in lib/tools.ts                           ║
║                                                              ║
║  Add your tool to the tools array.                           ║
║  It will automatically appear on the homepage grid.          ║
╚══════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════╗
║  STEP 7 — Pre-deploy checklist                               ║
║                                                              ║
║  □ Tool works correctly with valid inputs                    ║
║  □ Tool handles empty / invalid inputs without crashing      ║
║  □ Reset button clears all state                             ║
║  □ Mobile layout correct (test at 375px)                     ║
║  □ TypeScript: tsc --noEmit passes with zero errors          ║
║  □ ESLint: npm run lint passes with zero warnings            ║
║  □ PageSpeed Insights mobile score ≥ 90                      ║
║  □ <title> and meta description correct in browser tab       ║
║  □ Tool appears in sitemap (visit /sitemap.xml locally)      ║
║  □ Tool card appears on homepage                             ║
╚══════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════╗
║  STEP 8 — Deploy and index                                   ║
║                                                              ║
║  git add .                                                   ║
║  git commit -m "feat: add [tool-name]"                       ║
║  git push                                                    ║
║  → Vercel auto-deploys                                       ║
║  → Go to Search Console → URL Inspection → Request Indexing  ║
╚══════════════════════════════════════════════════════════════╝
```

---

## 8. SEO & Metadata Rules

### Use `metadata` export — never `<Head>` (that's Pages Router)

```ts
// Static metadata (most tool pages)
export const metadata: Metadata = {
  title: '...',
  description: '...',
}

// Dynamic metadata (if needed)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: '...' }
}
```

### Title rules
- Format: `[Tool Name] – [Benefit phrase] | QuickUtils`
- Max **60 characters** — Google cuts off anything longer
- Primary keyword must appear **near the start**
- Every page must have a **unique** title — no duplicates ever

```
✅ Age Calculator – Find Your Exact Age in Years & Months | QuickUtils
✅ BMI Calculator – Check Your Body Mass Index Free | QuickUtils
❌ QuickUtils - Age Calculator Tool        ← brand first = bad SEO
❌ Calculator                               ← too vague, no keyword
```

### Description rules
- Max **160 characters**
- Must contain the primary keyword **and** a call to action
- Every page must be **unique**

### H-tag hierarchy — one H1, always

```tsx
<h1>Age Calculator</h1>          {/* ← exactly one per page, contains keyword */}
  <h2>How to Use</h2>
    <h3>Step 1: Enter your date of birth</h3>
  <h2>Frequently Asked Questions</h2>
    <h3>How accurate is this?</h3>
  <h2>Related Tools</h2>
```

### SEO content section — required on every tool page

**Minimum 200 words** of original content below the tool. Must include:
- How to use the tool (2–4 steps)
- What the tool does / calculates
- FAQ section (minimum 2 questions)
- 2–3 internal links to related tools

### Schema markup — use `generateToolSchema()` helper

```ts
// lib/schema.ts
import type { ToolMeta } from '@/types'

export function generateToolSchema(meta: ToolMeta): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.name,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${meta.canonical}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    description: meta.description,
    inLanguage: 'en-IN',
  }
}
```

### Sitemap — built-in App Router generation

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { getAllTools } from '@/lib/tools'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tools = await getAllTools()
  const toolUrls = tools.map((tool) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${tool.canonical}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: process.env.NEXT_PUBLIC_SITE_URL!, changeFrequency: 'weekly', priority: 1 },
    ...toolUrls,
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
```

### robots.ts — built-in generation

```ts
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
```

---

## 9. Caching Strategy

Next.js 16 makes caching **explicit and opt-in**. All pages are dynamic by default.

| Data type | Strategy | How |
|---|---|---|
| Tool list (homepage) | Cached — never changes at runtime | `'use cache'` in `lib/tools.ts` |
| Tool pages | Dynamic — fully static HTML, no data fetching | Default (no directive needed) |
| About / Privacy pages | Static | `export const dynamic = 'force-static'` |
| Contact form | Dynamic | Server Action, no caching |

```ts
// Revalidation — if you ever add a CMS or dynamic tool list
import { revalidateTag } from 'next/cache'

// Next.js 16 syntax — second argument required
revalidateTag('tools', 'max')
```

---

## 10. Styling & Design System

### Tailwind 4 — CSS-first config (no more JS config file needed)

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-brand: #2d6a4f;
  --color-brand-light: #52b788;
  --color-brand-dim: #1a3d30;
  --color-surface: #f5f4f0;

  --font-sans: 'DM Sans', sans-serif;
  --font-mono: 'DM Mono', monospace;
  --font-display: 'Syne', sans-serif;

  --radius-tool: 16px;
}

/* Reusable component classes */
@layer components {
  .input {
    @apply w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3
           text-sm text-gray-900 outline-none transition
           focus:border-brand focus:ring-2 focus:ring-brand/10;
  }

  .label {
    @apply mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500;
  }

  .btn-primary {
    @apply rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white
           transition hover:bg-brand-light focus:outline-none focus:ring-2
           focus:ring-brand/50 active:scale-95;
  }
}
```

### Rules
- **Never use inline `style=`** — always use Tailwind classes or `globals.css`
- **Mobile first** — write base classes for mobile, add `sm:` / `md:` / `lg:` for larger
- Max width of tool content: `max-w-2xl` · Homepage grid: `max-w-5xl`
- Standard page padding: `px-4 py-10` on mobile, `sm:px-6` on tablet
- No dark mode in v1 — no `dark:` classes (adds unnecessary complexity)

---

## 11. Performance Rules

### Images
- Always use `next/image` — never raw `<img>` tags
- All images must have descriptive `alt` text
- Use `.webp` or `.avif` for custom images
- OG images must be exactly **1200×630px**

### Fonts
- Load via `next/font/google` in `app/layout.tsx` only
- Maximum **2 font families** across the entire site
- Always pass `display: 'swap'`

```tsx
// app/layout.tsx
import { DM_Sans, DM_Mono } from 'next/font/google'

const sans = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-sans' })
const mono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap', variable: '--font-mono' })
```

### JavaScript bundle
- Only import what you use — no barrel imports from large libraries
- Use `next/dynamic` with `{ ssr: false }` for heavy client-only components (e.g. QR library)

```ts
// ✅ Good
import { formatDistance } from 'date-fns'

// ❌ Bad — imports entire library
import dateFns from 'date-fns'
```

### Core Web Vitals targets

| Metric | Target | Tool to check |
|---|---|---|
| LCP | < 2.5s | PageSpeed Insights |
| INP | < 200ms | PageSpeed Insights |
| CLS | < 0.1 | PageSpeed Insights |
| PageSpeed mobile | ≥ 90 | pagespeed.web.dev |
| PageSpeed desktop | ≥ 95 | pagespeed.web.dev |

**Run PageSpeed after every new tool deploy.** Do not skip this step.

---

## 12. Google AdSense Rules

### `.env.local` — required variables
```bash
NEXT_PUBLIC_SITE_URL=https://quickutils.in
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_AD_SLOT_TOP=XXXXXXXXXX
NEXT_PUBLIC_AD_SLOT_BOTTOM=XXXXXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### AdBanner component — always use this, never paste raw AdSense code in pages
```tsx
// components/layout/AdBanner.tsx
'use client'

import { useEffect } from 'react'

interface AdBannerProps {
  slot: string
  className?: string
}

declare global {
  interface Window { adsbygoogle: unknown[] }
}

export default function AdBanner({ slot, className = '' }: AdBannerProps) {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [])

  return (
    <div className={`min-h-[90px] overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
```

### Ad placement rules
```
✅ Allowed positions (max 3 per page):
   1. Between the page intro and the tool input
   2. Between the tool result and the SEO content section
   3. At the very bottom of the page (below SEO content)

❌ Never place ads:
   - Inside the tool UI (between inputs and result)
   - Styled to look like buttons or tool controls
   - In a way that causes layout shift (CLS violation)
```

### AdSense approval requirements
Before applying, every page must have:
- `Privacy Policy` page at `/privacy-policy`
- `About` page at `/about`
- `Contact` page at `/contact`
- At least **15 pages indexed** on Google
- All content is **original** (no copied text)

---

## 13. File & Naming Conventions

| Item | Convention | Example |
|---|---|---|
| App Router pages | kebab-case folder + `page.tsx` | `app/(tools)/age-calculator/page.tsx` |
| Layout files | always `layout.tsx` | `app/(tools)/layout.tsx` |
| Component files | PascalCase `.tsx` | `AgeCalculator.tsx`, `AdBanner.tsx` |
| Tool folders | kebab-case | `tools/age-calculator/` |
| Utility files | camelCase `.ts` | `formatters.ts`, `validators.ts` |
| Type files | camelCase `.ts` | `tool.ts`, `index.ts` |
| Config files | per tool convention | `next.config.ts`, `tailwind.config.ts` |
| Environment variables | `NEXT_PUBLIC_` prefix for client | `NEXT_PUBLIC_ADSENSE_ID` |
| Git branches | kebab-case with prefix | `feat/qr-code-generator`, `fix/bmi-crash` |

---

## 14. Git & Commit Rules

### Branch strategy
```
main          → production — auto-deploys to Vercel — never push directly
dev           → staging — merge feature branches here first
feat/xxx      → new tools or features
fix/xxx       → bug fixes
seo/xxx       → content, metadata, keyword updates
chore/xxx     → dependency updates, config changes
```

### Commit message format (Conventional Commits)
```
feat: add qr-code-generator tool
fix: bmi-calculator crash on empty height input
seo: update age-calculator meta title and description
style: fix homepage card hover animation on mobile
chore: upgrade next to 16.2.6
refactor: extract date utils into shared lib/formatters.ts
```

### Pre-commit checklist — run every time before pushing
```
□ npx tsc --noEmit             → zero TypeScript errors
□ npm run lint                  → zero ESLint warnings or errors
□ Tool works on desktop and mobile
□ Empty / invalid inputs handled (no crashes)
□ Reset button clears all state
□ New tool added to lib/tools.ts
□ PageSpeed checked (≥ 90 mobile)
□ Meta title and description verified
□ SEO content section written (200+ words)
□ /sitemap.xml includes the new page
```

---

## 15. Do's and Don'ts

### ✅ Always do
- Use **`next/link`** for all internal links — never raw `<a href="/">`
- Use **`next/image`** for all images — never raw `<img>`
- Use **`next/font/google`** for fonts — never `<link>` in HTML
- Write **semantic HTML** — `<main>`, `<section>`, `<article>`, `<nav>`, `<h1>`–`<h3>`
- Add **`aria-label`** on all icon-only buttons
- Handle every edge case — zero, negative numbers, empty strings, very large values
- Keep **`'use client'`** as far down the component tree as possible
- Add **internal links** to 2–3 related tools at the bottom of every tool page
- Keep `lib/tools.ts` updated — every new tool must appear here immediately
- Write **original SEO content** — never copy from competitor sites

### ❌ Never do
- Never use **`any`** type in TypeScript
- Never use **`<Head>`** from `next/head` — that is the Pages Router pattern
- Never call **`fetch()`** or external APIs inside tool components
- Never hardcode the domain — always use `process.env.NEXT_PUBLIC_SITE_URL`
- Never paste raw **AdSense script** into page files — use `<AdBanner>` component
- Never add **more than 3 ad units** per page (AdSense policy violation risk)
- Never push directly to **`main`** — always use a branch and merge via PR or squash
- Never use **`middleware.ts`** — it is deprecated in Next.js 16; use `proxy.ts`
- Never use **`style=`** inline in JSX — use Tailwind classes
- Never skip the **SEO content section** below a tool — it is what Google indexes
- Never use **`// @ts-ignore`** — fix the type properly
- Never import an **entire library** when you only need one function

---

## 16. Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                  NEW TOOL CHECKLIST                          │
├─────────────────────────────────────────────────────────────┤
│ □ tools/name/utils.ts         pure typed functions          │
│ □ tools/name/meta.ts          title ≤60, desc ≤160 chars    │
│ □ tools/name/Name.tsx         "use client", no props        │
│ □ app/(tools)/name/page.tsx   metadata export, AdBanner     │
│ □ lib/tools.ts                register tool                 │
│ □ tsc --noEmit                zero errors                   │
│ □ PageSpeed mobile            ≥ 90                          │
│ □ Search Console              Request Indexing              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  SEO CHECKLIST PER PAGE                      │
├─────────────────────────────────────────────────────────────┤
│ □ Unique title (≤60 chars, keyword near start)              │
│ □ Unique description (≤160 chars, includes CTA)             │
│ □ Exactly one H1 (contains keyword)                         │
│ □ 200–300 words original content below tool                 │
│ □ 2–3 internal links to related tools                       │
│ □ Schema markup via generateToolSchema()                    │
│ □ Canonical URL matches the page route                      │
│ □ OG image set (1200×630px)                                 │
│ □ Tool appears in /sitemap.xml                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              SERVER vs CLIENT COMPONENT                      │
├─────────────────────────────────────────────────────────────┤
│ Server (default, no directive):                             │
│   app/**/page.tsx, layout.tsx, static sections             │
│                                                             │
│ Client ("use client" required):                             │
│   tools/**/*.tsx  — anything with useState / browser API   │
│   components/homepage/SearchFilter.tsx                     │
│   components/layout/AdBanner.tsx                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              NEXT.JS 16 KEY CHANGES vs 15                    │
├─────────────────────────────────────────────────────────────┤
│ middleware.ts   → proxy.ts  (rename file + export fn)       │
│ experimental.ppr → cacheComponents: true  (next.config.ts)  │
│ Turbopack       → default bundler, no flag needed           │
│ React Compiler  → reactCompiler: true  (opt-in, stable)     │
│ revalidateTag() → needs second arg: revalidateTag(x,'max')  │
│ next.config.js  → next.config.ts  (TypeScript config)       │
└─────────────────────────────────────────────────────────────┘
```

---

*Owner: Dev team — everyone is responsible for reading, following, and updating this document.*
*When a new pattern is agreed upon, update this file in the same PR.*
