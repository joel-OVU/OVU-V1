# OVU Design System

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.
>
> This file documents what is **implemented** in the site. The source of truth is
> `src/index.css` (`@theme` tokens) and the class maps in `src/styles/`. Update this
> file whenever those change.

---

**Project:** OVU
**Category:** Marketing Agency
**Updated:** 2026-10-13

---

## Global Rules

### Color Palette

Defined as semantic Tailwind v4 tokens in `src/index.css`. Never use default Tailwind colours for brand elements.

| Role | Hex | Token | Usage |
|------|-----|-------|-------|
| Paper (background) | `#F9F7F3` | `paper` | Page background, text on dark |
| Ink (foreground) | `#0F0E24` | `ink` | Text, primary buttons, dark sections |
| Accent | `#FC3792` | `accent` | Tags, highlights, focus rings, selection |
| Accent dark | `#B90EDE` | `accent-dark` | Gradient partner for accent |

Neutral tints are expressed as opacity of ink or paper: `text-ink/70` body copy, `border-ink/10` borders, `bg-ink/5` hover fills, `text-paper/60` on dark sections. White (`bg-white`) is used for alternating light sections and inner cards.

**Color Notes:** Warm off-white paper, deep indigo ink, hot-pink accent. Accent is used sparingly for emphasis, never for large fills.

### Typography

| Token | Font | Usage |
|-------|------|-------|
| `font-display` | Calistoga | Headings, large editorial type (often with `italic` on highlight words) |
| `font-sans` | Inter (300–600) | Body copy; body text is `font-light` |
| `font-mono` | JetBrains Mono | Section tags, labels, metadata — `text-xs uppercase tracking-widest` |

- Headings use `tracking-tight` or `tracking-tighter` and tight leading (`leading-[0.9]`–`leading-none`).
- Section tags: `font-mono text-xs uppercase tracking-widest text-accent`.

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Calistoga&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
```

### Spacing & Layout

- Container: `max-w-7xl mx-auto`; reading width for long copy: `max-w-3xl`.
- Section padding: `py-14 md:py-20 px-6 md:px-12`; hero uses larger top padding to clear the navbar.
- Use `min-h-[100dvh]` / `svh`, never `100vh` (iOS Safari).
- Breakpoints verified: 375px, 768px, 1024px, 1440px.

### Radius, Borders & Shadows

| Element | Style |
|---------|-------|
| Buttons, chips, tags | `rounded-full` |
| Cards | `rounded-[24px] md:rounded-[32px]` with `border border-ink/5` |
| Inner panels, overlays, banner | `rounded-3xl` (`rounded-2xl` for nested rows) |
| Borders | 1px, `ink/5`–`ink/10` (`white/10` on dark) |
| Floating surfaces | Soft deep shadow, e.g. `shadow-[0_24px_60px_-12px_rgba(15,14,36,0.28)]` |

Glassmorphism (`backdrop-blur-xl` over a translucent `paper`/`white` fill) is used for the navbar, protocol card and cookie banner.

---

## Component Specs

### Buttons

Class maps live in `src/styles/*.ts`.

```text
Primary   px-8 py-4 md:px-10 md:py-5 bg-ink text-paper rounded-full font-medium
          hover:scale-105 transition-transform cursor-pointer
Secondary px-8 py-4 md:px-10 md:py-5 bg-transparent border border-ink/10 rounded-full
          font-medium hover:bg-ink/5 transition-colors cursor-pointer
Compact   min-h-11 px-5 py-3 rounded-full text-sm (cookie banner, privacy page)
```

- Touch targets are at least 44×44px.
- Accept and reject style choices (cookie banner) must be visually identical.

### Cards

```text
bg-paper border border-ink/5 rounded-[24px] md:rounded-[32px] p-6 md:p-8
group hover:border-accent/20 transition-all duration-500 cursor-pointer
```

Dark-section cards use `bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl`.

### Cookie banner & privacy page

- Banner: fixed bottom-right (`sm:right-6 sm:bottom-6 sm:w-[26rem]`, full-width with margins on mobile), `z-[10000]`, `bg-paper/85 backdrop-blur-xl`, fade-in via `CookieConsent.css`.
- Privacy page: `max-w-3xl` article, `font-display` headings, sections separated by `border-t border-ink/10`.

### Focus

Global `:focus-visible` is a 2px `accent` outline with 2px offset (`src/index.css`). Never remove it.

---

## Motion

- Scroll reveals: `motion` `whileInView` with `initial={{ opacity: 0, y: 20–30 }}`, `viewport={{ once: true }}`.
- Hover and state transitions: 200–500ms; entrance animations ≤ 450ms.
- Continuous loops (marquees) use CSS keyframes, not JS.
- `prefers-reduced-motion` is respected globally in `src/index.css` and via `useReducedMotion`.

---

## Page Pattern

**Pattern Name:** Funnel (conversion landing page)

- **Conversion Strategy:** Progressive disclosure with repeated CTAs; the final action is booking a discovery call.
- **Section Order:** Hero → Services → CTA → Features → CTA → About → Proof (flag-gated) → Success (flag-gated) → CTA → Contact → FAQ → Footer.
- **CTA Placement:** Navbar "Book Call", hero primary/secondary, mid-page CTAs between sections.

---

## Anti-Patterns (Do NOT Use)

- ❌ **Emojis as icons** — use SVG icons (Lucide)
- ❌ **Missing `cursor-pointer`** on clickable elements
- ❌ **Layout-shifting hovers** that move surrounding content
- ❌ **Low contrast text** — keep 4.5:1 minimum (avoid `text-ink/40` for body copy)
- ❌ **Instant state changes** — always transition (150–500ms)
- ❌ **Invisible focus states**
- ❌ **Raw Tailwind palette colours** (`bg-red-500`) for brand elements — use tokens
- ❌ **Hardcoded copy in components** — copy lives in `src/content/`
- ❌ **Hover-only information** — mobile users can't hover
- ❌ **Dark patterns in consent UI** — accept and reject must look equally prominent

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (SVG only, Lucide)
- [ ] Colours come from semantic tokens (`paper`, `ink`, `accent`)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions
- [ ] Text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind the fixed navbar
- [ ] No horizontal scroll on mobile
- [ ] Copy added to `src/content/`, class maps to `src/styles/`
- [ ] Any new third-party script is gated in `activateTracking()` and listed in the privacy policy
