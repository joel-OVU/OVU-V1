import { motion } from "motion/react";
import React from "react";    
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { success } from "@/src/content/en";
import { successStyles as xs } from "@/src/styles/success";

interface CaseStudyCardProps {
  key?: React.Key;
  image: string;
  title: string;
  metric: string;
  description: string;
  className?: string;
  id: string;
}

export default function CaseStudyCard({ image, title, metric, description, className, id }: CaseStudyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${xs.card} ${className}`}
      id={id}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <img src={image} className={xs.cardImage} alt={title} />
      <div className={xs.cardOverlay} />
      <div className={xs.cardContent}>
        <div className={xs.cardMetric}>{metric}</div>
        <h3 className={xs.cardTitle}>{title}</h3>

        <motion.div
          animate={{ height: isExpanded ? "auto" : "0", opacity: isExpanded ? 1 : 0 }}
          className={xs.cardExpandWrap}
        >
          <p className={xs.cardDesc}>
            {description}
            {isExpanded && (
              <span className={xs.cardProtocolNote}>
                {success.protocolNote.label}
                <br />
                {success.protocolNote.description}
              </span>
            )}
          </p>
        </motion.div>

        <div className={xs.cardAction}>
          {isExpanded ? success.caseStudyActions.collapse : success.caseStudyActions.expand}
        </div>
      </div>
      <div className={xs.cardArrowWrap}>
        <ArrowRight className={isExpanded ? xs.cardArrowIconOpen : xs.cardArrowIcon} />
      </div>
    </motion.div>
  );
}
