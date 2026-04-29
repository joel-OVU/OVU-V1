import { motion } from "motion/react";
import { faqStyles as qs } from "@/src/styles/faq";
import { track } from "@/src/lib/track";

interface FaqCardProps {
  question: string;
  answer: string;
}

export default function FaqCard({ question, answer }: FaqCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
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
