import { motion } from "motion/react";
import { faqStyles as qs } from "@/src/styles/faq";
import { track } from "@/src/lib/track";
import { useReducedMotion } from "@/src/hooks/useReducedMotion";

interface FaqCardProps {
  question: string;
  answer: string;
}

export default function FaqCard({ question, answer }: FaqCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={qs.card}
      onClick={() => track("faq question expanded", { question })}
    >
      <h4 className={qs.question}>{question}</h4>
      <p className={qs.answer}>{answer}</p>
    </motion.div>
  );
}
