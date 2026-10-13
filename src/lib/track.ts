// Client-side analytics helper powered by PostHog.
// Autocapture handles most interactions automatically.
// Use track() for explicit custom events.

import posthog from "posthog-js";
import { POSTHOG_API_KEY, POSTHOG_HOST } from "@/src/config/posthog";

let initialized = false;

/** Initialize PostHog (cookieless, not consent-gated) — call once at app startup. */
export function initAnalytics(): void {
  if (initialized) return;
  if (POSTHOG_API_KEY.includes("REPLACE")) {
    console.warn("[PostHog] API key not set — analytics disabled. Update src/config/posthog.ts");
    return;
  }
  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: true,
    capture_pageview: true,
    capture_pageleave: true,
    // Cookieless: nothing is written to cookies or localStorage, so no consent
    // banner is required for it. Visitors are not recognised across page loads.
    persistence: "memory",
  });
  initialized = true;
}

/** Track a custom event. Falls back silently if PostHog isn't initialized. */
export function track(event: string, properties?: Record<string, unknown>): void {
  if (!initialized) return;
  posthog.capture(event, properties);
}
