import { useEffect, useRef } from "react";
import { BarChart3, Calendar } from "lucide-react";
import { contact } from "@/src/content/en";
import { contactStyles as cs } from "@/src/styles/contact";
import { SHOW_TESTIMONIALS } from "@/src/config/flags";
import BenefitItem from "@/src/components/molecules/BenefitItem";
import Testimonial from "@/src/components/molecules/Testimonial";

const CAL_EMBED_ID = "cal-inline-embed";

export default function ContactSection() {
  const calInitialized = useRef(false);

  useEffect(() => {
    if (calInitialized.current) return;
    calInitialized.current = true;

    // Replicate the Cal.com IIFE — sets up window.Cal queuing, then loads embed.js
    const w = window as any;
    const p = (a: any, ar: any) => { a.q.push(ar); };
    const d = document;

    w.Cal = w.Cal || function (...args: any[]) {
      const cal = w.Cal;
      const ar = args;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        const s = d.createElement("script");
        s.src = "https://app.cal.com/embed/embed.js";
        d.head.appendChild(s);
        cal.loaded = true;
      }
      if (ar[0] === "init") {
        const api = function (...a: any[]) { p(api, a); };
        const namespace = ar[1];
        (api as any).q = (api as any).q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else {
          p(cal, ar);
        }
        return;
      }
      p(cal, ar);
    };

    w.Cal("init", "discovery-call", { origin: "https://app.cal.com" });

    w.Cal.ns["discovery-call"]("inline", {
      elementOrSelector: `#${CAL_EMBED_ID}`,
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: "joel-ovu/discovery-call",
    });

    w.Cal.ns["discovery-call"]("ui", {
      cssVarsPerTheme: {
        light: { "cal-brand": "#ffffff" },
        dark: { "cal-brand": "#ffffff" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

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

        {/* Protocol Portal — Cal.com Inline Embed */}
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
            <div className="w-full overflow-hidden px-2 md:px-4 pb-4">
              <div
                id={CAL_EMBED_ID}
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                className="min-h-[520px] md:min-h-[600px] rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
