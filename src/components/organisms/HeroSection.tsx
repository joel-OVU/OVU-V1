import { motion, type MotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";
import { hero } from "@/src/content/en";
import { heroStyles as hs } from "@/src/styles/hero";
import { styles } from "@/src/styles/shared";
import { SHOW_RESULTS, SHOW_CASE_STUDIES } from "@/src/config/flags";
import ScrollIndicator from "@/src/components/atoms/ScrollIndicator";

const showResults = SHOW_RESULTS || SHOW_CASE_STUDIES;
const secondaryCtaText = showResults ? hero.secondaryCta : hero.secondaryCtaFallback;
const secondaryCtaHref = showResults ? "#success" : "#services";

interface HeroSectionProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

export default function HeroSection({ opacity, scale }: HeroSectionProps) {
  return (
    <section id="hero" className={hs.section}>
      <motion.div style={{ opacity, scale }} className={hs.contentWrap}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={hs.tag}
        >
          {hero.tag}
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
          className={hs.heading}
        >
          {hero.heading.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              className={
                word === "elite" || word === "enquiry"
                  ? hs.headingWordAccent
                  : hs.headingWord
              }
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={hs.subheading}
        >
          {hero.subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={hs.ctaGroup}
        >
          <a href="#contact" className={hs.ctaPrimary}>
            {hero.primaryCta} <ArrowRight className={styles.iconMd} />
          </a>
          <a href={secondaryCtaHref} className={hs.ctaSecondary}>
            {secondaryCtaText}
          </a>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
