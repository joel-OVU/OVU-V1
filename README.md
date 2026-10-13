# OVU

Marketing site for **OVU (Ovu Digital Ltd.)** — a conversion-focused landing page and enquiry flow for local service businesses. Visitors book a discovery call through an embedded Cal.com calendar.

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 (semantic tokens in `src/index.css`)
- `motion` for scroll and presence animation
- Vitest + React Testing Library (happy-dom)
- Express (`server.ts`) for self-hosting and the `/api/events` PostHog proxy
- Deployed on Vercel

## Getting started

Requires Node.js 20+.

```bash
npm install
cp .env.example .env   # optional — only needed for the Express server's PostHog proxy
npm run dev            # http://localhost:3000
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Vite dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm start` | Serve `dist/` with Express (`server.ts`) |
| `npm run lint` | Type-check with `tsc --noEmit` |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run vercel:build` | Lint, test, then build — used for deployment |

## Environment variables

See [`.env.example`](.env.example). All variables are optional for local front-end development.

| Variable | Used by | Purpose |
|----------|---------|---------|
| `POSTHOG_API_KEY` | `server.ts` | Project key for server-side event forwarding |
| `POSTHOG_HOST` | `server.ts` | PostHog host (EU cloud: `https://eu.i.posthog.com`) |
| `PORT` | `server.ts` | Port for `npm start` (default `3000`) |

The browser-side PostHog key and host live in `src/config/posthog.ts`; the Meta Pixel ID is in `src/config/meta.ts`.

## Project structure

```text
src/
├── components/
│   ├── atoms/        Smallest building blocks
│   ├── molecules/    Atom combinations (cards, footer columns)
│   └── organisms/    Page sections (Hero, Services, CookieConsent, PrivacyPolicyPage …)
├── content/          All copy, one file per section (barrel: en.ts)
├── styles/           Tailwind class maps, one file per section
├── config/           Feature flags, PostHog and Meta Pixel config
├── lib/              Analytics, consent and tracking helpers
├── hooks/            Shared hooks
└── tests/            Unit tests, snapshots and the motion mock
design-system/ovu/    Design spec (MASTER.md)
```

Each component lives in its own folder, with an optional `.css` file for keyframes and pseudo-elements. Copy changes go in `src/content/`, not in components.

## Feature flags

`src/config/flags.ts` toggles proof-based content (`SHOW_TESTIMONIALS`, `SHOW_RESULTS`, `SHOW_CASE_STUDIES`). Keep them `false` until real testimonials and results are available.

## Analytics, cookies and consent

- **PostHog** runs cookieless (`persistence: "memory"`). It stores nothing in the browser and is not consent-gated.
- **Vercel Web Analytics, Vercel Speed Insights and the Meta Pixel** load only after consent, from `activateTracking()` in `src/lib/tracking.ts`.
- The consent banner (`CookieConsent`) stores the visitor's choice in `localStorage` under `site_cookie_consent`. The footer's "Cookie Settings" link reopens it.
- The privacy policy is served at `/privacy-policy`. Its copy is in `src/content/privacyPolicy.ts`. Review it whenever you add or remove a third-party service.

To add a new non-essential script, start it from `activateTracking()` and list it in the matching category in `src/content/cookieConsent.ts` and in the privacy policy.

## Deployment

Vercel runs `npm run vercel:build`, which fails the deploy if type-checking or tests fail. `vercel.json` rewrites `/privacy-policy` to the SPA entry point.
