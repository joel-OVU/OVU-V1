/**
 * Centralized content dictionary — barrel export.
 *
 * Import the unified `content` object for convenience:
 *   import { content } from '@/src/content/en';
 *
 * Or import individual sections directly:
 *   import { hero } from '@/src/content/hero';
 *
 * Structured for future i18n: duplicate this barrel as `fr.ts`, `de.ts`, etc.
 */

import { navbar } from "./navbar";
import { hero } from "./hero";
import { services } from "./services";
import { features } from "./features";
import { about } from "./about";
import { success } from "./success";
import { contact } from "./contact";
import { faq } from "./faq";
import { footer } from "./footer";

export const content = {
  navbar,
  hero,
  services,
  features,
  about,
  success,
  contact,
  faq,
  footer,
} as const;

export type Content = typeof content;

export { navbar, hero, services, features, about, success, contact, faq, footer };
