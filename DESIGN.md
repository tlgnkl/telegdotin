# Design System — telegdotin

## Product Context
- **What this is:** Personal portfolio site for Николай Телегин — AI Product Manager
- **Who it's for:** Hiring managers evaluating PM candidates (Russian market, some English)
- **Space/industry:** PM portfolios. Reference: apalish.in. Differentiation: custom-built with React, interactive case demos
- **Project type:** Marketing/landing page (editorial portfolio)

## Aesthetic Direction
- **Direction:** Editorial/Magazine — strong typographic hierarchy, narrative-first, journalistic feel
- **Decoration level:** Intentional — noise overlay (0.015 opacity), subtle radial gradients, floating photo animation. Decoration exists but never competes with content
- **Mood:** Professional but warm. Reads like a well-edited article, not a template. The Caveat handwriting and green accent add personality to an otherwise serious editorial base
- **Reference sites:** https://apalish.in/ (direct reference, Russian PM space)

## Typography
- **Display/Hero:** Outfit 700-800, 32-56px — geometric, clean, modern sans-serif with personality
- **Body:** Outfit 400, 17-20px, line-height 1.65-1.7 — highly readable at editorial sizes
- **UI/Labels:** Outfit 500-700, 12-15px — same family, tighter weights for UI elements
- **Handwritten accent:** Caveat 600, 28-52px — warm counterpoint to Outfit's geometry. Used for section sub-headers, hero name, CTA text. Signature element
- **Data/Tables:** Outfit 800 (tabular-nums not needed — metrics are display, not data tables)
- **Code:** Not applicable (no code displayed on the portfolio)
- **Loading:** Google Fonts CDN — `Outfit:wght@300;400;500;600;700;800` + `Caveat:wght@400;500;600;700`
- **Scale:**
  - 11px — source labels (muted, tertiary)
  - 12-13px — badges, metadata, labels, reading time
  - 14-15px — UI text, buttons, nav links
  - 16-17px — TL;DR text, small body
  - 18-20px — body text, case descriptions
  - 22-24px — section headers (gray level), about text
  - 28-32px — hero paragraph, case titles, metric numbers
  - 36-48px — section handwritten headers (Caveat)
  - 52-56px — hero handwritten name, large metric numbers

## Color
- **Approach:** Restrained — one accent (green) + per-case colors. Color is rare and meaningful
- **Primary accent:** `#7aef8c` — CTA buttons, highlights, handwritten headers, active states, selection
- **Deep accent:** `#45c55e` — text on green backgrounds (CTA section)
- **Surface:** `#ffffff` (main) / `#f7f7f5` (alt — TL;DR blocks, badges, secondary surfaces)
- **Text hierarchy:**
  - `#1a1a1a` — headings, primary text (--text)
  - `#3d3d3d` — body text (--text-body)
  - `#777777` — secondary text, section gray headers (--text-secondary)
  - `#b0b0b0` — muted labels, metadata, reading time (--text-muted)
- **Border:** `#eeeeee` — dividers, card borders, proof strip separators
- **Per-case accent system:**
  | Case | Accent | Background | Badge | Text |
  |------|--------|------------|-------|------|
  | AI | `#4F9CF5` | `#eef5ff` | `#ddeaff` | `#2d6bc4` |
  | Mobile | `#FF8C42` | `#fff3ea` | `#ffe5d2` | `#b8611e` |
  | HRTech | `#2DD4A8` | `#e6faf5` | `#ccf5ea` | `#1a8a6e` |
  | Elektro | `#F5A623` | `#fff8eb` | `#ffecc4` | `#b07515` |
- **Semantic:** success `#7aef8c`, warning `#F5A623`, error `#E05252`, info `#4F9CF5`
- **Dark mode:** Not implemented. Light editorial theme is the brand. If added: reduce green saturation 15%, use `#111111` surface, `#1a1a1a` surface-alt

## Spacing
- **Base unit:** 4px
- **Density:** Comfortable — editorial, not data-dense
- **Scale:** 4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 36 / 40 / 48 / 52 / 56 / 64 / 72 / 80 px
- **Section padding:** 80px vertical (desktop), 60px (mobile)
- **Content padding:** 48px horizontal (desktop), 28px (tablet), 20px (mobile)
- **Card padding:** 36-48px (hero), 24-28px (standard), 16-20px (mobile)

## Layout
- **Approach:** Hybrid — creative-editorial for landing, grid-disciplined for case pages
- **Landing max-width:** 1100px (hero, about, career) / 1196px (cases section)
- **Case content max-width:** 840px centered
- **TOC sidebar:** Fixed left, visible on >1200px viewports
- **Grid columns:** Landing proof strip 4-col → 2-col (tablet) → 2-col (mobile). Case grids 2-3 col → 1-col (mobile)
- **Border radius hierarchy:**
  - 8px — small badges, input focus rings
  - 10px — badges, small UI elements
  - 12px — buttons (secondary), small cards, tab buttons
  - 14px — primary buttons, CTA
  - 16px — icon containers, image frames
  - 18px — standard cards, TL;DR blocks (--card-radius)
  - 22px — case rows, modal
  - 28px — hero card, main containers
  - 30px — pill buttons (CV download)
  - 9999px — circles (dots, avatars)
- **Breakpoints:**
  - Desktop: >1200px (TOC sidebar visible)
  - Tablet: ≤900px (grids collapse, padding reduces)
  - Mobile: ≤640px (single column, stacked layout)
  - Small mobile: ≤400px (tighter font sizes)

## Shadows
- **Float (default):** `0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)`
- **Hover (elevated):** `0 4px 12px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.08)`
- **Pattern:** Float → Hover on interaction, with translateY(-6px to -8px)

## Motion
- **Approach:** Intentional — serves hierarchy and comprehension, never decoration
- **Global easing:** `cubic-bezier(0.25, 0.1, 0.25, 1)` — used everywhere for consistency
- **Duration scale:**
  - Hover transitions: 0.25-0.35s (transform, shadow, color)
  - UI feedback: 0.2-0.3s (buttons, tabs)
  - Scroll-reveal (FadeUp): 0.9s — slow, editorial pace
  - Modal enter: 0.45s
  - Bottom nav show/hide: 0.5s
  - Number animation: 1.4-1.8s (ease-out quartic)
  - Photo float: 8s (gentle-float keyframe, infinite)
  - Pulse dot: 2.5s (scale + opacity, infinite)
- **Rules:**
  - Motion only for: transform, opacity, scale, y — compositor-friendly properties
  - Hover via `onMouseEnter/onMouseLeave`, NOT via Motion `whileHover` with color/background
  - Respect `prefers-reduced-motion: reduce` (global.css)
  - No Motion `motion.span` with background/padding (inline elements don't render backgrounds)

## Decoration
- **Noise overlay:** Fixed, full-screen SVG feTurbulence (fractalNoise, 0.65 baseFrequency), 0.015 opacity, multiply blend
- **Gradient blobs:** Radial gradients with accent color at 6-8% opacity, large radius (500-800px), positioned off-screen edges. Always `aria-hidden="true"`
- **Case framing:** Fixed-position subtle accent gradients + 2px vertical line at content edge (>1200px)
- **Career watermark:** Large Caveat year numbers (120-200px) at 5-8% opacity, `aria-hidden="true"`

## Anti-patterns (DO NOT)
- **DO NOT** use Motion `whileHover={{ backgroundColor }}` — overrides CSS inline styles
- **DO NOT** use `motion.span` with background/padding — inline elements don't render background
- **DO NOT** use Tailwind custom colors (e.g., `bg-light-gray`) — not generated, use CSS vars
- **DO NOT** add separate gray background for proof/numbers section — breaks editorial flow
- **DO NOT** use cards for cards' sake — editorial layout (text on white) is preferred
- **DO NOT** use `div[style*="..."]` CSS selectors — fragile, use class names
- **DO NOT** use purple/violet gradients, 3-column icon grids, or decorative blobs

## Two-Level Section Header Pattern
Every landing page section uses this signature pattern:
```
<div style="text-align: center; margin-bottom: 72px;">
  <div style="font-size: 22px; color: var(--text-secondary);">{gray text}</div>
  <div style="font-family: var(--font-hand); font-size: 52px; color: var(--green); font-weight: 600;">
    {green handwritten text}
  </div>
</div>
```

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-24 | Initial design system created | Formalized from existing codebase + validated against PM portfolio landscape research. /design-consultation |
| 2026-03-24 | TL;DR left border → top accent bar | AI slop pattern #8 (colored left-border cards). Top bar more distinctive. /plan-design-review |
| 2026-03-24 | Proof strip stays 2×2 on mobile | Preserves "at a glance" comparison. /plan-design-review |
| 2026-03-24 | No dark mode (deferred) | Light editorial theme is the brand identity. Dark mode would need separate design pass |
| 2026-03-24 | Caveat as signature element | Unconventional for tech PM — deliberate risk. Adds warmth and personality to data-heavy content |
