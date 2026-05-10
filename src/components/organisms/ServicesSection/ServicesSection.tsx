import { useEffect, useRef } from "react";
import { services } from "@/src/content/en";
import { servicesStyles as ss } from "@/src/styles/services";
import { styles } from "@/src/styles/shared";
import ServiceCard from "@/src/components/molecules/ServiceCard/ServiceCard";
import ExclusionChip from "@/src/components/atoms/ExclusionChip/ExclusionChip";
import { track } from "@/src/lib/track";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("services section viewed");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className={ss.section}>
      <div className={styles.container}>
        <div className={ss.header}>
          <h2 className={ss.title}>{services.title}</h2>
          <p className={ss.description}>{services.description}</p>
        </div>

        <div className={ss.grid}>
          {services.items.map((service, i) => (
            <ServiceCard
              key={i}
              title={service.title}
              desc={service.description}
              details={service.details}
            />
          ))}
        </div>

        {/* Exclusions */}
        <div className={ss.exclusions}>
          <p className={ss.exclusionsLabel}>{services.exclusions.label}</p>
          <div className={ss.exclusionsGrid}>
            {services.exclusions.items.map((item) => (
              <ExclusionChip key={item} label={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
