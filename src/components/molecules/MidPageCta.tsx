import { ArrowRight } from "lucide-react";
import { track } from "@/src/lib/track";

interface MidPageCtaProps {
  heading: string;
  body: string;
  cta: string;
  href: string;
  /** Visual variant — light (paper bg) or dark (ink bg) */
  variant?: "light" | "dark";
}

export default function MidPageCta({
  heading,
  body,
  cta,
  href,
  variant = "light",
}: MidPageCtaProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`py-12 md:py-16 px-6 md:px-12 ${
        isDark ? "bg-ink text-paper" : "bg-paper"
      }`}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h3
          className={`font-display text-2xl md:text-4xl tracking-tight mb-3 md:mb-4 leading-tight ${
            isDark ? "text-paper" : "text-ink"
          }`}
        >
          {heading}
        </h3>
        <p
          className={`text-base md:text-lg font-light mb-6 md:mb-8 max-w-lg mx-auto ${
            isDark ? "text-paper/70" : "text-ink/70"
          }`}
        >
          {body}
        </p>
        <a
          href={href}
          onClick={() => track("mid page cta clicked", { cta_text: cta })}
          className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-medium transition-all hover:scale-105 cursor-pointer ${
            isDark
              ? "bg-paper text-ink hover:bg-accent hover:text-white"
              : "bg-ink text-paper hover:bg-accent"
          }`}
        >
          {cta} <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
