/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useScroll, useTransform } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import { styles } from "@/src/styles/shared";
import { SHOW_RESULTS, SHOW_CASE_STUDIES } from "@/src/config/flags";
import { midCta } from "@/src/content/midCta";
import Navbar from "@/src/components/organisms/Navbar";
import HeroSection from "@/src/components/organisms/HeroSection";
import ServicesSection from "@/src/components/organisms/ServicesSection";
import MidPageCta from "@/src/components/molecules/MidPageCta";
import FeaturesSection from "@/src/components/organisms/FeaturesSection";
import AboutSection from "@/src/components/organisms/AboutSection";
import ProofSection from "@/src/components/organisms/ProofSection";
import SuccessSection from "@/src/components/organisms/SuccessSection";
import ContactSection from "@/src/components/organisms/ContactSection";
import FaqSection from "@/src/components/organisms/FaqSection";
import SiteFooter from "@/src/components/organisms/SiteFooter";

const showSuccess = SHOW_RESULTS || SHOW_CASE_STUDIES;

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div id="app-root" className={styles.root}>
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
      <Analytics />
    </div>
  );
}
