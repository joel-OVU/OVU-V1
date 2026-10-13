/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useScroll, useTransform } from "motion/react";
import { styles } from "@/src/styles/shared";
import { SHOW_RESULTS, SHOW_CASE_STUDIES } from "@/src/config/flags";
import { midCta } from "@/src/content/midCta";
import Navbar from "@/src/components/organisms/Navbar/Navbar";
import HeroSection from "@/src/components/organisms/HeroSection/HeroSection";
import ServicesSection from "@/src/components/organisms/ServicesSection/ServicesSection";
import MidPageCta from "@/src/components/molecules/MidPageCta/MidPageCta";
import FeaturesSection from "@/src/components/organisms/FeaturesSection/FeaturesSection";
import AboutSection from "@/src/components/organisms/AboutSection/AboutSection";
import ProofSection from "@/src/components/organisms/ProofSection/ProofSection";
import SuccessSection from "@/src/components/organisms/SuccessSection/SuccessSection";
import ContactSection from "@/src/components/organisms/ContactSection/ContactSection";
import FaqSection from "@/src/components/organisms/FaqSection/FaqSection";
import SiteFooter from "@/src/components/organisms/SiteFooter/SiteFooter";
import CookieConsent from "@/src/components/organisms/CookieConsent/CookieConsent";

const showSuccess = SHOW_RESULTS || SHOW_CASE_STUDIES;

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div id="app-root" className={styles.root}>
      {/* First in DOM so keyboard users reach the consent choices immediately. Fixed-positioned bottom-right. */}
      <CookieConsent />
      <Navbar />
      <HeroSection opacity={opacity} scale={scale} />
      <ServicesSection />
      <MidPageCta {...midCta.afterServices} />
      <FeaturesSection />
      <MidPageCta {...midCta.afterFeatures} variant="dark" />
      <AboutSection />
      <ProofSection />
      {showSuccess && <SuccessSection />}
      <MidPageCta {...midCta.beforeFaq} />
      <ContactSection />
      <FaqSection />
      <SiteFooter />
    </div>
  );
}
