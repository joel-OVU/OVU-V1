import { useEffect, useRef } from "react";
import { BarChart3, Calendar } from "lucide-react";
import { contact } from "@/src/content/en";
import { contactStyles as cs } from "@/src/styles/contact";
import { SHOW_TESTIMONIALS } from "@/src/config/flags";
import BenefitItem from "@/src/components/molecules/BenefitItem";
import Testimonial from "@/src/components/molecules/Testimonial";
import { track } from "@/src/lib/track";

const CAL_EMBED_ID = "cal-inline-embed";

export default function ContactSection() {
  const calInitialized = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (calInitialized.current) return;
    calInitialized.current = true;

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
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light" },
      calLink: "joel-ovu/discovery-call",
    });

    // Permanently light — no system theme detection
    w.Cal.ns["discovery-call"]("ui", {
      theme: "light",
      cssVarsPerTheme: {
        light: {
          "cal-brand": "#FC3792",
          "cal-bg": "#ffffff",
          "cal-bg-emphasis": "#f9f7f3",
        },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    // Track Cal.com booking interactions
    w.Cal.ns["discovery-call"]("on", {
      action: "timeslotSelected",
      callback: () => {
        track("discovery call booking initiated", { calendar: "discovery-call" });
      },
    });
    w.Cal.ns["discovery-call"]("on", {
      action: "bookingSuccessful",
      callback: () => {
        track("discovery call scheduled", { calendar: "discovery-call" });
      },
    });
  }, []);

  // Track when the contact section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("contact section viewed");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={cs.section}>
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
        <div className="relative">
          {/* Soft circular glow — no square edges */}
          <div className="absolute inset-6 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

          {/* Clean white card */}
          <div className="relative bg-white border border-ink/5 shadow-xl rounded-[32px] overflow-hidden min-h-[600px] flex flex-col">
            <div className={cs.portalHeader}>
              <div className={cs.portalDots}>
                <div className={cs.portalDotRed} />
                <div className={cs.portalDotAmber} />
                <div className={cs.portalDotGreen} />
              </div>
              <div className={cs.portalLabel}>{contact.portal.label}</div>
            </div>

            {/* Cal.com embed wrapper */}
            <div className="w-full flex-1 bg-white rounded-2xl overflow-hidden border border-ink/5 mx-auto px-2 md:px-4 pb-4">
              <div
                id={CAL_EMBED_ID}
                className="w-full min-h-[620px] md:min-h-[700px] border-0 bg-white"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
