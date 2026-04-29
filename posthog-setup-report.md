<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your OVU landing page with PostHog analytics using `posthog-node`. The integration introduces a server-side Express layer (`server.ts`) that initialises the PostHog Node.js SDK and exposes a `/api/events` endpoint. A lightweight browser helper (`src/lib/track.ts`) posts events from React components to that endpoint, keeping PostHog keys server-side only. Three key UI components were instrumented — `HeroSection`, `Navbar`, and `ContactSection` — covering the complete visitor-to-booking conversion path. Error tracking via `captureException` was added to the server route handler, and `enableExceptionAutocapture: true` is set on the SDK client for automatic uncaught-exception capture.

| Event | Description | File |
|---|---|---|
| `hero cta clicked` | User clicks the primary "Get in Touch" CTA in the hero section — top of the conversion funnel | `src/components/organisms/HeroSection.tsx` |
| `hero secondary cta clicked` | User clicks the secondary CTA (e.g. "See Our Work" / "Explore Services") in the hero section | `src/components/organisms/HeroSection.tsx` |
| `navbar cta clicked` | User clicks the "Book a Call" CTA in the top navigation bar | `src/components/organisms/Navbar.tsx` |
| `contact section viewed` | Contact / booking section scrolls into view (IntersectionObserver, fires once) | `src/components/organisms/ContactSection.tsx` |
| `discovery call booking initiated` | User selects a time slot in the Cal.com embed, indicating booking intent | `src/components/organisms/ContactSection.tsx` |
| `discovery call scheduled` | Cal.com `bookingSuccessful` fires — user has completed scheduling a discovery call (primary conversion) | `src/components/organisms/ContactSection.tsx` |
| `event captured` | Server-side: `/api/events` received and forwarded a tracking event to PostHog | `server.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behaviour, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://eu.posthog.com/project/169219/dashboard/651827
- **Booking Conversion Funnel** (hero CTA → contact viewed → booking initiated → call scheduled): https://eu.posthog.com/project/169219/insights/txqOjBMW
- **CTA Click Trends** (daily line chart — hero primary, hero secondary, navbar): https://eu.posthog.com/project/169219/insights/XW7yUuT3
- **Discovery Calls Booked (Total)** (bold number — primary conversion KPI): https://eu.posthog.com/project/169219/insights/kS7xnjGv
- **Contact Section Views vs Bookings** (weekly bar chart — measures drop-off at the booking form): https://eu.posthog.com/project/169219/insights/OmidoIBh
- **Weekly Discovery Call Bookings Trend** (90-day area chart — tracks growth in qualified lead acquisition): https://eu.posthog.com/project/169219/insights/Ewnruhcw

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
