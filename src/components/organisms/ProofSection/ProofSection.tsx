import { useEffect, useRef } from "react";
import { proof } from "@/src/content/proof";
import { track } from "@/src/lib/track";

const proofStyles = {
  section: "py-14 md:py-20 px-6 md:px-12 bg-paper border-t border-ink/5",
  container: "max-w-7xl mx-auto",
  tag: "font-mono text-xs uppercase tracking-widest text-accent mb-4 md:mb-6",
  heading: "font-display text-3xl md:text-6xl tracking-tight mb-10 md:mb-14 leading-none max-w-3xl",
  grid: "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8",
  card: "p-6 md:p-8 bg-white border border-ink/5 rounded-[24px] md:rounded-[32px]",
  cardTitle: "text-lg md:text-xl font-medium mb-3",
  cardDesc: "text-ink/70 font-light leading-relaxed text-sm md:text-base",
};

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("proof section viewed");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="proof" ref={sectionRef} className={proofStyles.section}>
      <div className={proofStyles.container}>
        <p className={proofStyles.tag}>{proof.tag}</p>
        <h2 className={proofStyles.heading}>{proof.heading}</h2>
        <div className={proofStyles.grid}>
          {proof.pillars.map((pillar, i) => (
            <div key={i} className={proofStyles.card}>
              <h3 className={proofStyles.cardTitle}>{pillar.title}</h3>
              <p className={proofStyles.cardDesc}>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
