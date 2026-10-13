import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import PrivacyPolicyPage from '@/src/components/organisms/PrivacyPolicyPage/PrivacyPolicyPage';
import './index.css';
import { getConsentStatus } from './lib/consent';
import { initAnalytics } from './lib/track';
import { activateTracking, purgeUnconsentedTrackerData } from './lib/tracking';

// PostHog analytics is not consent-gated — start it immediately.
initAnalytics();

// Drop any tracker cookies/storage the visitor hasn't (or no longer) consented to.
purgeUnconsentedTrackerData();

// Non-essential trackers only start once the visitor has consented.
// First-time visitors are handled by <CookieConsent /> when they choose.
const consent = getConsentStatus();
if (consent === 'accepted' || consent === 'custom') {
  activateTracking();
}

// Lightweight routing: the site is a single page plus the privacy policy.
const isPrivacyPolicy = window.location.pathname.replace(/\/+$/, '') === '/privacy-policy';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPrivacyPolicy ? <PrivacyPolicyPage /> : <App />}
  </StrictMode>,
);
