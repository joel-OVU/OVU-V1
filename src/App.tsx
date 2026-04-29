/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useScroll, useTransform } from "motion/react";
import { styles } from "@/src/styles/shared";
import { SHOW_RESULTS, SHOW_CASE_STUDIES } from "@/src/config/flags";
import Navbar from "@/src/components/organisms/Navbar";
import HeroSection from "@/src/components/organisms/HeroSection";
import ServicesSection from "@/src/components/organisms/ServicesSection";
import FeaturesSection from "@/src/components/organisms/FeaturesSection";
import AboutSection from "@/src/components/organisms/AboutSection";
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
      <FeaturesSection />
      <AboutSection />
      {showSuccess && <SuccessSection />}
      <ContactSection />
      <FaqSection />
      <SiteFooter />
    </div>
  );
}
