import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Cookie, X } from "lucide-react";
import { cookieConsent as copy } from "@/src/content/en";
import { cookieConsentStyles as cs } from "@/src/styles/cookieConsent";
import {
  ACCEPT_ALL,
  COOKIE_SETTINGS_EVENT,
  REJECT_ALL,
  getConsentStatus,
  getPreferences,
  saveConsent,
  type ConsentPreferences,
  type ConsentStatus,
  type OptionalCategory,
} from "@/src/lib/consent";
import { applyConsent } from "@/src/lib/tracking";
import "./CookieConsent.css";

type Choices = Record<OptionalCategory, boolean>;

const CLOSE_ANIMATION_MS = 220;

/**
 * GDPR / PECR-style consent banner.
 * - Shown only when no decision is stored under `site_cookie_consent`.
 * - "Accept All" and "Reject All" are identical in size, weight and colour.
 * - Optional categories are OFF by default; nothing non-essential runs before consent.
 * - Can be re-opened from the footer to review or withdraw consent.
 */
export default function CookieConsent() {
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;
  const drawerId = `${uid}-prefs`;

  const [visible, setVisible] = useState(() => getConsentStatus() === null);
  const [closing, setClosing] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [reopened, setReopened] = useState(false);
  const [choices, setChoices] = useState<Choices>({ functional: false, analytics: false, marketing: false });

  const bannerRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Footer "Cookie Settings" → re-open with the saved choices and move focus inside.
  useEffect(() => {
    const open = () => {
      const current = getPreferences();
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setChoices({ functional: current.functional, analytics: current.analytics, marketing: current.marketing });
      setClosing(false);
      setReopened(true);
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    if (visible && reopened) bannerRef.current?.focus();
  }, [visible, reopened]);

  const dismiss = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setVisible(false);
      setClosing(false);
      setShowPrefs(false);
      setReopened(false);
      returnFocusRef.current?.focus();
      returnFocusRef.current = null;
    }, CLOSE_ANIMATION_MS);
  }, []);

  // Escape closes the panel only when it was re-opened voluntarily.
  // On first visit it must not count as a decision.
  useEffect(() => {
    if (!visible || !reopened) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible, reopened, dismiss]);

  const commit = (status: ConsentStatus, preferences: ConsentPreferences) => {
    saveConsent(status, preferences);
    // Starts newly-allowed trackers via activateTracking(); returns true when a
    // running tracker was switched off and a reload is needed to unload it.
    const needsReload = applyConsent();
    if (needsReload) {
      window.location.reload();
      return;
    }
    dismiss();
  };

  const acceptAll = () => commit("accepted", ACCEPT_ALL);
  const rejectAll = () => commit("rejected", REJECT_ALL);
  const savePreferences = () => commit("custom", { necessary: true, ...choices });

  const toggle = (id: OptionalCategory) => setChoices((prev) => ({ ...prev, [id]: !prev[id] }));

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      id="cookie-consent"
      role="dialog"
      aria-live="polite"
      aria-labelledby={titleId}
      aria-describedby={descId}
      tabIndex={-1}
      data-state={closing ? "closing" : "open"}
      className={cs.banner}
    >
      <span aria-hidden="true" className={cs.accentLine} />

      <div className={cs.header}>
        <p className={cs.tag}>
          <Cookie className={cs.tagIcon} aria-hidden="true" />
          {copy.tag}
        </p>
        {reopened && (
          <button type="button" className={cs.closeButton} aria-label={copy.actions.close} onClick={dismiss}>
            <X className={cs.closeIcon} aria-hidden="true" />
          </button>
        )}
      </div>

      <h2 id={titleId} className={cs.title}>
        {copy.title}
      </h2>
      <p id={descId} className={cs.description}>
        {copy.description}{" "}
        <a href={copy.privacy.href} className={cs.privacyLink}>
          {copy.privacy.label}
        </a>
        .
      </p>

      <div className={cs.actions}>
        <button type="button" className={cs.choiceButton} onClick={acceptAll}>
          {copy.actions.acceptAll}
        </button>
        <button type="button" className={cs.choiceButton} onClick={rejectAll}>
          {copy.actions.rejectAll}
        </button>
      </div>

      <div className={cs.manageWrap}>
        <button
          type="button"
          className={cs.manageButton}
          aria-expanded={showPrefs}
          aria-controls={drawerId}
          onClick={() => setShowPrefs((open) => !open)}
        >
          {showPrefs ? copy.actions.hidePreferences : copy.actions.managePreferences}
        </button>
      </div>

      {showPrefs && (
        <div id={drawerId} className={cs.drawer}>
          <fieldset>
            <legend className={cs.drawerHeading}>{copy.preferencesHeading}</legend>
            <div className={cs.categoryList}>
              {copy.categories.map((category) => {
                const locked = category.id === "necessary";
                const labelId = `${uid}-${category.id}-label`;
                const hintId = `${uid}-${category.id}-hint`;
                return (
                  <label key={category.id} className={cs.category}>
                    <span className={cs.categoryText}>
                      <span id={labelId} className={cs.categoryLabel}>
                        {category.label}
                      </span>
                      <span id={hintId} className={cs.categoryHint}>
                        {category.description}
                      </span>
                    </span>
                    {locked ? (
                      <>
                        <input
                          type="checkbox"
                          className={cs.switchInput}
                          checked
                          disabled
                          readOnly
                          aria-labelledby={labelId}
                          aria-describedby={hintId}
                        />
                        <span className={cs.alwaysOn}>{copy.alwaysOn}</span>
                      </>
                    ) : (
                      <span className={cs.switchWrap}>
                        <input
                          type="checkbox"
                          role="switch"
                          className={cs.switchInput}
                          checked={choices[category.id]}
                          onChange={() => toggle(category.id)}
                          aria-labelledby={labelId}
                          aria-describedby={hintId}
                        />
                        <span aria-hidden="true" className={cs.switchTrack} />
                        <span aria-hidden="true" className={cs.switchThumb} />
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <div className={cs.actions}>
            <button type="button" className={cs.saveButton} onClick={savePreferences}>
              {copy.actions.savePreferences}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
