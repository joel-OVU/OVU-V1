import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { services } from "@/src/content/en";
import { servicesStyles as ss } from "@/src/styles/services";

interface ServiceCardProps {
  title: string;
  desc: string;
  details: string;
}

export default function ServiceCard({ title, desc, details }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={ss.card}
    >
      <h3 className={ss.cardTitle}>{title}</h3>
      <p className={ss.cardDesc}>{desc}</p>

      <motion.div
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className={ss.cardDetailsWrap}
      >
        <p className={ss.cardDetails}>{details}</p>
      </motion.div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={ss.cardToggle}
      >
        {isOpen ? services.cardActions.close : services.cardActions.open}{" "}
        <ArrowRight className={isOpen ? ss.cardToggleIconOpen : ss.cardToggleIcon} />
      </button>
    </motion.div>
  );
}
