import { ArrowRight, BarChart3, Calendar, Megaphone } from "lucide-react";
import { contact } from "@/src/content/en";
import { contactStyles as cs } from "@/src/styles/contact";
import { SHOW_TESTIMONIALS } from "@/src/config/flags";
import BenefitItem from "@/src/components/molecules/BenefitItem";
import Testimonial from "@/src/components/molecules/Testimonial";

export default function ContactSection() {
  return (
    <section id="contact" className={cs.section}>
      <div className={cs.grid}>
        <div>
          <div className={cs.tag}>{contact.tag}</div>
          <h2 className={cs.heading}>
            {contact.heading.prefix} <br />
            <span className={cs.headingHighlight}>{contact.heading.highlight}</span>
          </h2>
          <p className={cs.description}>{contact.description}</p>

          <div className={cs.benefitsGroup}>
            <BenefitItem
              icon={BarChart3}
              title={contact.benefits[0].title}
              description={contact.benefits[0].description}
            />
            <BenefitItem
              icon={Calendar}
              title={contact.benefits[1].title}
              description={contact.benefits[1].description}
            />
          </div>

          {SHOW_TESTIMONIALS && (
            <Testimonial
              quote={contact.testimonial.quote}
              initials={contact.testimonial.initials}
              name={contact.testimonial.name}
              role={contact.testimonial.role}
            />
          )}
        </div>

        {/* Portal Card */}
        <div className={cs.portalWrap}>
          <div className={cs.portalGlow} />
          <div className={cs.portalCard}>
            <div className={cs.portalHeader}>
              <div className={cs.portalDots}>
                <div className={cs.portalDotRed} />
                <div className={cs.portalDotAmber} />
                <div className={cs.portalDotGreen} />
              </div>
              <div className={cs.portalLabel}>{contact.portal.label}</div>
            </div>
            <div className={cs.portalBody}>
              <div className={cs.portalIconWrap}>
                <Megaphone className={cs.portalIconInner} />
              </div>
              <h3 className={cs.portalTitle}>{contact.portal.title}</h3>
              <p className={cs.portalDesc}>{contact.portal.description}</p>
              <div className={cs.portalActions}>
                <button className={cs.portalCta}>
                  {contact.portal.cta} <ArrowRight className={cs.portalCtaIcon} />
                </button>
                <p className={cs.portalStatus}>{contact.portal.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
