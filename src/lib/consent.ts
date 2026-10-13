// Cookie consent storage helpers.
// Pure persistence + preference logic — no third-party scripts are loaded here.
// See src/lib/tracking.ts for the code that actually activates trackers.

/** localStorage key holding the user's overall decision. */
export const CONSENT_KEY = "site_cookie_consent";
/** localStorage key holding the per-category choices when status is "custom". */
export const PREFERENCES_KEY = "site_cookie_preferences";
/** Window event used to re-open the banner (e.g. from the footer). */
export const COOKIE_SETTINGS_EVENT = "cookie-consent:open";
/** Link target that opens the cookie settings instead of navigating. */
export const COOKIE_SETTINGS_HREF = "#cookie-settings";

export type ConsentStatus = "accepted" | "rejected" | "custom";

export interface ConsentPreferences {
  /** Always true — strictly necessary cookies cannot be switched off. */
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export type OptionalCategory = "functional" | "analytics" | "marketing";

export const ACCEPT_ALL: ConsentPreferences = {
  necessary: true,
  functional: true,
  analytics: true,
  marketing: true,
};

/** Privacy-by-default: everything optional is OFF. */
export const REJECT_ALL: ConsentPreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    // Storage can throw (private mode, blocked cookies). Treat as "no decision".
    return null;
  }
}

function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore — the banner will simply re-appear on the next visit.
  }
}

/** Returns the stored decision, or `null` if the visitor hasn't chosen yet. */
export function getConsentStatus(): ConsentStatus | null {
  const value = readStorage(CONSENT_KEY);
  return value === "accepted" || value === "rejected" || value === "custom" ? value : null;
}

/** Resolves the effective category choices for the stored decision. */
export function getPreferences(): ConsentPreferences {
  const status = getConsentStatus();
  if (status === "accepted") return { ...ACCEPT_ALL };
  if (status !== "custom") return { ...REJECT_ALL };

  try {
    const parsed = JSON.parse(readStorage(PREFERENCES_KEY) ?? "{}") as Partial<ConsentPreferences>;
    return {
      necessary: true,
      functional: parsed.functional === true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
    };
  } catch {
    return { ...REJECT_ALL };
  }
}

/** Persists a decision. */
export function saveConsent(status: ConsentStatus, preferences: ConsentPreferences): void {
  writeStorage(CONSENT_KEY, status);
  writeStorage(PREFERENCES_KEY, JSON.stringify(preferences));
}

/** Re-opens the consent banner so a visitor can review or withdraw consent. */
export function openCookieSettings(): void {
  window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT));
}
