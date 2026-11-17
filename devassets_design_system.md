# DevAssets Official Design System & UI Style Guide

> **Core Philosophy:** Human-Crafted, Zero-AI Cliché, High-Performance Developer Experience (inspired by Linear, Vercel, and Supabase).  
> **Target Audience:** Modern software engineers, technical founders, and web developers.  
> **Brand Identity:** Deep Zinc foundation with razor-sharp 1px borders and purposeful Emerald accents.

---

## 1. Master Color Palette & Design Tokens

Always use these exact semantic colors across all pages, components, modals, and illustrations. Never introduce unauthorized purple, magenta, or random neon gradient blobs.

| Token Name | Color Name | Hex Code | Tailwind Utility Class | Intended Usage & Scope |
| :--- | :--- | :--- | :--- | :--- |
| `brand-bg` | **Deep Zinc** | `#09090B` | `bg-[#09090B]` / `zinc-950` | Global page body, background canvas, root layout shell. |
| `brand-surface` | **Dark Surface** | `#18181B` | `bg-[#18181B]` / `zinc-900` | Product cards, tool utility containers, terminal preview, auth cards. |
| `brand-border` | **Subtle Border** | `#27272A` | `border-[#27272A]` / `zinc-800` | 1px dividers, card outlines, input borders, navbar bottom border. |
| `brand-emerald` | **Primary Accent** | `#10B981` | `bg-[#10B981]` / `text-[#10B981]` | Primary CTAs ('Buy Now', 'Explore Tools', 'Register'), active tab pills, checkmarks. |
| `brand-emerald-hover` | **Bright Emerald** | `#34D399` | `hover:bg-[#34D399]` / `emerald-400` | Hover states for primary buttons, focus rings, interactive glow reflections. |
| `brand-heading` | **Pure White** | `#FAFAFA` | `text-[#FAFAFA]` / `zinc-50` | Primary headlines, section headers, card titles, active nav links. |
| `brand-muted` | **Muted Zinc** | `#A1A1AA` | `text-[#A1A1AA]` / `zinc-400` | Subtitles, descriptions, metadata, inactive links, secondary labels. |
| `brand-amber` | **Warm Amber** | `#F59E0B` | `text-[#F59E0B]` / `amber-500` | Strike-through discounts, sale badges, ratings, limited-time highlights. |

---

## 2. Tailwind CSS Configuration (`tailwind.config.mjs`)

Include this configuration snippet in `tailwind.config.mjs` to keep class names short, semantic, and reusable:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#09090B',
          surface: '#18181B',
          border: '#27272A',
          emerald: '#10B981',
          'emerald-hover': '#34D399',
          heading: '#FAFAFA',
          muted: '#A1A1AA',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'emerald-glow': '0 0 25px rgba(16, 185, 129, 0.35)',
        'card-border': 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
};
```

---

## 3. Typography & Editorial Rules

* **Headlines (`h1`, `h2`, `h3`):**
  * Color: `#FAFAFA` (`text-[#FAFAFA]`).
  * Tracking: Tight negative letter-spacing (`tracking-[-0.035em]`).
  * Line-height: Confident, compact leading (`leading-[1.1]`).
  * No multi-color rainbow gradients on whole sentences. If an accent is needed, apply a subtle gradient from `#FAFAFA` to `#10B981` strictly on **1–2 key words**.
* **Body Copy & Subtitles:**
  * Color: `#A1A1AA` (`text-[#A1A1AA]`).
  * Font-size: `text-sm` (14px) or `text-base` (16px) with relaxed leading (`leading-relaxed`).
* **Technical Metadata & Tags:**
  * Use monospace (`font-mono`): file extensions (`.PDF`, `.ZIP`, `.WASM`), latency metrics (`<10ms`), pricing strike-throughs.

---

## 4. Component Design Patterns

### A. Global Navbar
* **Background:** `bg-[#09090B]/90 backdrop-blur-xl border-b border-[#27272A]`
* **Logo:** Text in `#FAFAFA` with code terminal icon highlighted in `#10B981`.
* **Center Navigation Bar:** 
  * Container: `bg-[#18181B]/80 border border-[#27272A] rounded-full px-2 py-1`
  * Active Link: `bg-[#27272A] text-[#FAFAFA] rounded-full px-4 py-1.5 text-sm font-medium`
  * Inactive Links: `text-[#A1A1AA] hover:text-[#FAFAFA] rounded-full px-4 py-1.5 text-sm transition-colors`
* **Register Button:** `bg-[#10B981] hover:bg-[#34D399] text-[#09090B] font-semibold px-5 py-2 rounded-full shadow-sm hover:shadow-emerald-glow transition-all`

### B. Cards & Surfaces (Products, Utilities, Modals)
* **Surface Shell:** `bg-[#18181B] border border-[#27272A] rounded-2xl p-6 sm:p-8 transition-all`
* **Hover Interaction:** `hover:border-[#10B981]/50 hover:-translate-y-1 duration-200`
* **Inner Highlights:** `shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]`
* **Checkmarks & Active Icons:** Always render in `#10B981` (Emerald).
* **Discount Badges:** `bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] rounded-full px-2.5 py-0.5 text-xs font-semibold`

### C. Buttons & CTAs
1. **Primary Button (Emerald):**
   * Class: `bg-[#10B981] hover:bg-[#34D399] text-[#09090B] font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-emerald-glow active:scale-[0.98] transition-all`
   * Use for: "Buy Now", "Try Free Tools", "Register", "Download Asset".
2. **Secondary Button (Subtle Surface):**
   * Class: `bg-[#18181B] hover:bg-[#27272A] text-[#FAFAFA] border border-[#27272A] font-medium px-6 py-3 rounded-xl transition-all`
   * Use for: "Browse Products", "View Details", "Back to Website".
3. **Ghost / Text Button:**
   * Class: `text-[#A1A1AA] hover:text-[#FAFAFA] font-medium px-4 py-2 transition-colors`
   * Use for: "Log in", "Cancel", secondary modal triggers.

### D. Inputs & Form Elements (Auth & Checkout)
* **Input Shell:** `bg-[#09090B] border border-[#27272A] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]/40 rounded-xl px-4 py-3 text-sm text-[#FAFAFA] placeholder-[#A1A1AA]/50 outline-none transition-all`
* **Labels:** `text-xs font-medium text-[#A1A1AA] uppercase tracking-wider mb-1.5`

### E. Code Terminal / Utility Previews
* **Container:** `bg-[#18181B] border border-[#27272A] rounded-2xl overflow-hidden font-mono text-xs sm:text-sm`
* **Header Bar:** Window controls (`bg-[#27272A] rounded-full w-3 h-3`), active tab border `border-b-2 border-[#10B981]` with text in `#FAFAFA`.
* **Code Text:** Syntax highlighting in `#FAFAFA`, comments in `#A1A1AA`, and highlights/keywords in `#10B981`.

---

## 5. Strict Zero-AI Cliché Commandments

1. **NO Cartoonish Neon Blobs:** Never generate diffuse purple, pink, or cyan gradient blobs. Rely on real 1px `#27272A` borders, clean grid backgrounds, and focused `#10B981` emerald lighting.
2. **NO Excessive Nested Pills:** Avoid stacking 3 to 4 badges inside badges. Use single, clean tags with monospace typography.
3. **NO Fake Buzzword Copy:** Avoid hyperbolic phrases like "10x your productivity", "Secret SEO hacks", or "Master tech overnight". Write concise, grounded engineering specifications.
4. **NO Fluffy Mockups:** When demonstrating software or files, show real code syntax, actual file trees (`/src`, `/tests`, `package.json`), or functional browser dropzones.

---

*Keep this file in the project root as `DESIGN_SYSTEM.md` so all future AI prompts, components, and pages strictly conform to the DevAssets design standard.*
