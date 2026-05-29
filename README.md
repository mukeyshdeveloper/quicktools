# QuickUtils

> **Free, fast, and SEO-optimised web utility tools — all running 100% in your browser.**

🌐 **Live Site:** [www.thequickutils.com](https://www.thequickutils.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4 |
| Bundler | Turbopack |
| Icons | lucide-react |
| Hosting | Vercel |
| Monetisation | Google AdSense |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
quickutils/
├── app/                    # App Router pages
│   ├── layout.tsx          # Root layout + fonts + GA + AdSense
│   ├── page.tsx            # Homepage tool grid
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # robots.txt generation
│   └── (tools)/            # Route group — one folder per tool
│       └── [slug]/page.tsx
│
├── tools/                  # One folder per tool — all logic here
│   └── [slug]/
│       ├── [Tool].tsx      # 'use client' UI component
│       ├── meta.ts         # SEO metadata + schema
│       └── utils.ts        # Pure calculation functions
│
├── components/             # Shared UI components
│   ├── layout/             # Navbar, Footer, AdBanner
│   ├── homepage/           # ToolGrid, ToolCard, SearchFilter
│   └── ui/                 # Button, Input, ResultCard, ResetButton
│
├── lib/                    # Shared utilities (no UI, no React)
│   ├── tools.ts            # Master list of all tools
│   ├── formatters.ts       # Shared formatters
│   ├── validators.ts       # Input validation helpers
│   └── schema.ts           # generateToolSchema() helper
│
└── types/                  # Global TypeScript types
    └── tool.ts             # ToolMeta, ToolCategory
```

---

## All Tools (52 total)

### 🧮 Calculators

| Tool | URL | Description |
|---|---|---|
| Age Calculator | `/age-calculator` | Calculate exact age in years, months, days, weeks, and total days. |
| BMI Calculator | `/bmi-calculator` | Calculate Body Mass Index with healthy weight range and visual gauge. |
| Compound Interest Calculator | `/compound-interest-calculator` | Project investment growth with monthly contributions and compound frequency. |
| Date Difference Calculator | `/date-difference-calculator` | Find the exact number of years, months, weeks, and days between two dates. |
| Discount & Sales Tax Calculator | `/discount-calculator` | Calculate the final price after a percentage discount and local sales tax. |
| EMI Calculator | `/emi-calculator` | Calculate monthly loan payments, total interest, and amortisation schedule. |
| Percentage Calculator | `/percentage-calculator` | Three-in-one: X% of Y, X is what % of Y, and percentage change. |
| ROI Calculator | `/roi-calculator` | Calculate return on investment with annualised ROI. |
| Salary Calculator | `/salary-calculator` | Convert annual salary to hourly, daily, weekly, and monthly rates with tax. |
| SIP Calculator | `/sip-calculator` | Project monthly SIP investment returns with compound growth charts. |
| Tip Calculator & Bill Splitter | `/tip-calculator` | Calculate the tip amount and split the total bill across any number of people. |
| Unit Converter | `/unit-converter` | Convert between 15+ unit categories: length, weight, temperature, area, and more. |

---

### 🏥 Health & Wellness

| Tool | URL | Description |
|---|---|---|
| Menstruation & Ovulation Tracker | `/period-calculator` | Predict the next 3 periods, fertile windows, and peak ovulation days. |
| Pregnancy Due Date Calculator | `/pregnancy-due-date-calculator` | Calculate EDD via Last Menstrual Period (LMP) or conception date. |
| Sleep Cycle Calculator | `/sleep-cycle-calculator` | Find optimal wake/sleep times based on 90-minute REM cycles. |
| TDEE & Macro Calculator | `/tdee-calculator` | Calculate Total Daily Energy Expenditure and protein/fat/carb macros. |

---

### 📝 Text Tools

| Tool | URL | Description |
|---|---|---|
| Case Converter | `/case-converter` | Convert text between UPPER, lower, Title, camelCase, and snake_case. |
| Duplicate Line Remover | `/duplicate-remover` | Remove or highlight duplicate lines from any block of text. |
| Find & Replace | `/find-and-replace` | Find and replace text with optional regex support. |
| Keyword Density Checker | `/keyword-density` | Analyse keyword frequency and density for SEO content optimisation. |
| List to Comma Converter | `/list-converter` | Convert column lists to comma-separated values, arrays, or custom delimiters. |
| Lorem Ipsum Generator | `/lorem-ipsum-generator` | Generate Lorem Ipsum placeholder text by paragraphs, sentences, or words. |
| Readability Grader | `/readability-grader` | Calculate Flesch-Kincaid reading level and complexity score for text. |
| URL Slug Converter | `/slug-converter` | Convert any text into a clean, SEO-friendly URL slug. |
| Word Counter | `/word-counter` | Count words, characters, sentences, and estimate read time. |

---

### 👨‍💻 Developer Tools

| Tool | URL | Description |
|---|---|---|
| Base64 Encoder / Decoder | `/base64-encoder-decoder` | Encode and decode Base64 strings instantly. |
| Base64 to Image Decoder | `/base64-to-image` | Paste a Base64 string and see and download the hidden image. |
| Code Minifier | `/code-minifier` | Minify HTML, CSS, and JavaScript code to reduce file size. |
| CSS Generator | `/css-generator` | Visually generate CSS for gradients, shadows, border-radius, and more. |
| Diff Checker | `/diff-checker` | Compare two blocks of text side-by-side and highlight the differences. |
| JSON Formatter | `/json-formatter` | Format, validate, and minify JSON. Collapse and expand nested nodes. |
| JWT Decoder | `/jwt-decoder` | Decode and inspect JWT header, payload, and signature without a secret. |
| Markdown Previewer | `/markdown-previewer` | Live split-pane Markdown editor with GFM support and HTML export. |
| Meta Tag & OpenGraph Generator | `/meta-tag-generator` | Generate SEO meta tags, OpenGraph, and Twitter card markup with a live preview. |
| Regex Tester & Matcher | `/regex-tester` | Test regular expressions in real time with live match highlighting. |
| SVG to Base64 Converter | `/svg-to-base64` | Convert SVG code to Base64 and URL-encoded Data URIs for inline usage. |
| URL Encoder / Decoder | `/url-encoder-decoder` | Encode/decode URLs with a live query string parameter builder. |
| URL Slug Converter | `/slug-converter` | Generate clean, lowercase, hyphenated URL slugs from any string. |
| UUID / GUID Generator | `/uuid-generator` | Generate UUID v4, v1, and v7 in bulk with custom formatting options. |

---

### 🎨 Image Tools

| Tool | URL | Description |
|---|---|---|
| Color Palette Extractor | `/color-palette-extractor` | Upload an image and extract its dominant color palette as HEX codes. |
| Color Picker | `/color-picker` | Full-featured color picker with HEX, RGB, HSL, and CMYK conversion. |
| Favicon / ICO Generator | `/favicon-generator` | Convert any square PNG/JPG image into a `.ico` file for your website. |
| Image Compressor | `/image-compressor` | Compress PNG and JPG images in the browser without uploading to a server. |
| Image Format Converter | `/image-converter` | Convert between PNG, JPEG, WebP, and BMP entirely in the browser. |
| Meme Text Generator | `/meme-generator` | Add classic Impact-font top/bottom text to any uploaded image. |

---

### 🔐 Generator & Security Tools

| Tool | URL | Description |
|---|---|---|
| Password Generator | `/password-generator` | Generate strong, random passwords with custom length and character rules. |
| QR Code Generator | `/qr-code-generator` | Generate QR codes for URLs, vCards, WiFi, text, email, and more. |
| Secure Password Strength Meter | `/password-strength-meter` | Analyse password entropy and estimate brute-force crack time. 100% offline. |

---

### 💼 Business Tools

| Tool | URL | Description |
|---|---|---|
| Invoice Generator | `/invoice-generator` | Create and download professional invoices as a PDF. |
| Resume Builder | `/resume-builder` | Build an ATS-friendly resume with a live preview and PDF download. |
| Salary Slip Generator | `/salary-slip-generator` | Generate a professional salary slip with deductions and net pay. |
| UTM Link Builder | `/utm-builder` | Build standardised UTM-tagged URLs for Google Analytics campaign tracking. |
| YouTube Thumbnail Downloader | `/youtube-thumbnail-downloader` | Download the public HD, SD, and standard thumbnails from any YouTube video. |

---

## Core Architecture Principles

- **Offline-first:** All tool logic runs entirely client-side. Zero external API calls.
- **Server / Client split:** Pages are Server Components by default. `'use client'` is pushed down to the interactive tool component only.
- **Clean separation:** Each tool has exactly three files — `Component.tsx` (UI), `meta.ts` (SEO), `utils.ts` (pure logic).
- **SEO-ready:** Every page exports `metadata` with `title`, `description`, `keywords`, canonical `alternates`, OpenGraph, Twitter card, and JSON-LD schema.
- **TypeScript strict:** `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`. No `any`, no `@ts-ignore`.

---

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=https://www.thequickutils.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_AD_SLOT_TOP=XXXXXXXXXX
NEXT_PUBLIC_AD_SLOT_BOTTOM=XXXXXXXXXX
```

---

## Adding a New Tool

See **[AGENTS.md](./AGENTS.md)** for the full step-by-step guide. In summary:

1. Create `tools/your-tool/meta.ts` — fill in `ToolMeta`
2. Create `tools/your-tool/utils.ts` — pure calculation functions
3. Create `tools/your-tool/YourTool.tsx` — `'use client'` UI
4. Create `app/(tools)/your-tool/page.tsx` — Server Component with metadata + AdBanners + SEO content
5. Register in `lib/tools.ts`

---

## Deployment

Deployed on [Vercel](https://vercel.com). Every `git push` to `main` triggers an automatic deploy.

```bash
# Local production build check
npm run build
```

---

## License

MIT — free to use and build upon.
