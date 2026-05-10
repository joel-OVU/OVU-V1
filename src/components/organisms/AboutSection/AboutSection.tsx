import { ArrowRight } from "lucide-react";
import { about } from "@/src/content/en";
import { aboutStyles as as_ } from "@/src/styles/about";

export default function AboutSection() {
  return (
    <section id="about" className={as_.section}>
      <div className={as_.container}>
        <p className={as_.tag}>{about.tag}</p>
        <h2 className={as_.heading}>
          {about.heading.prefix}
          <span className={as_.headingHighlight}>{about.heading.highlight}</span>
        </h2>
        <div className={as_.body}>
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <a
            href="#contact"
            className={as_.cta}
          >
            {about.cta} <ArrowRight className={as_.ctaIcon} />
          </a>
        </div>
      </div>
    </section>
  );
}
