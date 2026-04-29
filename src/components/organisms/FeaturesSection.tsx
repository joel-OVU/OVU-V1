import { useEffect, useRef } from "react";
import { Zap, Target } from "lucide-react";
import { features } from "@/src/content/en";
import { featuresStyles as fs } from "@/src/styles/features";
import { track } from "@/src/lib/track";

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("features section viewed");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className={fs.section}>
      <div className={fs.bgOverlay}>
        <svg viewBox="0 0 400 400" className={fs.bgSvg}>
          <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className={fs.grid}>
        <div>
          <h2 className={fs.heading}>
            {features.heading.prefix} <br />
            <span className={fs.headingHighlight}>{features.heading.highlight}</span>
          </h2>
          <div className={fs.capabilitiesGrid}>
            <div>
              <Zap className={fs.capabilityIcon} />
              <h4 className={fs.capabilityTitle}>{features.capabilities[0].title}</h4>
              <p className={fs.capabilityDesc}>{features.capabilities[0].description}</p>
            </div>
            <div>
              <Target className={fs.capabilityIcon} />
              <h4 className={fs.capabilityTitle}>{features.capabilities[1].title}</h4>
              <p className={fs.capabilityDesc}>{features.capabilities[1].description}</p>
            </div>
          </div>
        </div>

        <div className={fs.protocolCard}>
          <h3 className={fs.protocolTitle}>{features.protocol.title}</h3>
          <div className={fs.protocolSteps}>
            {features.protocol.steps.map((step, idx) => (
              <div key={idx} className={fs.step}>
                <div className={fs.stepDot} />
                <h4 className={fs.stepTitle}>{step.title}</h4>
                <p className={fs.stepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
