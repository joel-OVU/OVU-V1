// Consent-gated tracking.
//
// Consent-gated third-party scripts (Vercel Web Analytics, Vercel Speed
// Insights, Meta Pixel) are initialised from `activateTracking()` and nowhere
// else. Nothing here runs at import time.
// PostHog is intentionally NOT gated — it starts at app load (see main.tsx).

import { inject as injectVercelAnalytics } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { META_PIXEL_ID } from "@/src/config/meta";
import { getPreferences } from "@/src/lib/consent";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: unknown;
  loaded: boolean;
  version: string;
};

type FbqWindow = Window & { fbq?: Fbq; _fbq?: Fbq };

let analyticsActive = false;
let marketingActive = false;

/** Meta Pixel base code (same as Meta's snippet), injected on demand. */
function loadMetaPixel(): void {
  const w = window as FbqWindow;
  if (w.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  w.fbq = fbq;
  if (!w._fbq) w._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

/**
 * Initialises every tracking script the visitor has consented to.
 * Safe to call repeatedly — each tracker starts at most once per page load.
 *
 * - Analytics  → Vercel Web Analytics, Vercel Speed Insights
 * - Marketing  → Meta Pixel
 */
export function activateTracking(): void {
  const prefs = getPreferences();

  if (prefs.analytics && !analyticsActive) {
    analyticsActive = true;
    injectVercelAnalytics();
    injectSpeedInsights();
  }

  if (prefs.marketing && !marketingActive) {
    marketingActive = true;
    loadMetaPixel();
  }
}

/** Expires a cookie on every domain scope it could have been set on (host + parent domains). */
function expireCookie(name: string): void {
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie = `${name}=; ${expired}`;
  const parts = window.location.hostname.split(".");
  for (let i = 0; i < parts.length - 1; i++) {
    document.cookie = `${name}=; ${expired}; domain=.${parts.slice(i).join(".")}`;
  }
}

/**
 * Removes cookies / storage left behind by trackers that are NOT currently consented to:
 * Meta Pixel (`_fbp`, `_fbc`) without marketing consent, plus legacy PostHog (`ph_*`)
 * data written before PostHog went cookieless (always purged).
 * Run at startup and on withdrawal, when no tracker is live to re-create the data.
 */
export function purgeUnconsentedTrackerData(): void {
  const prefs = getPreferences();
  const patterns: RegExp[] = [/^(ph_|__ph_)/];
  if (!prefs.marketing) patterns.push(/^(_fbp|_fbc)$/);

  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name && patterns.some((p) => p.test(name)))
    .forEach(expireCookie);

  try {
    Object.keys(window.localStorage)
      .filter((key) => patterns.some((p) => p.test(key)))
      .forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // Storage unavailable — nothing to clear.
  }
}

/**
 * Applies the saved decision after the visitor changes it.
 * - Newly granted categories are activated immediately.
 * - If a running tracker was switched off, it can't be unloaded from the page,
 *   so the caller should reload. Returns `true` then.
 */
export function applyConsent(): boolean {
  const prefs = getPreferences();
  const needsRevoke = (analyticsActive && !prefs.analytics) || (marketingActive && !prefs.marketing);

  if (needsRevoke) {
    // Running trackers can't be unloaded; the reload stops them and
    // purgeUnconsentedTrackerData() clears what they left behind.
    return true;
  }

  activateTracking();
  return false;
}
