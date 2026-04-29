import { motion } from "motion/react";
import { heroStyles as hs } from "@/src/styles/hero";

export default function ScrollIndicator() {
  return (
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className={hs.scrollIndicator}
    >
      <div className={hs.scrollOuter}>
        <div className={hs.scrollDot} />
      </div>
    </motion.div>
  );
}
