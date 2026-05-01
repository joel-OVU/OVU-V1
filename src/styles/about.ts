export const aboutStyles = {
  section: "py-14 md:py-20 px-6 md:px-12 bg-white flex flex-col items-center",
  container: "max-w-4xl text-center",
  tag: "font-mono text-xs uppercase tracking-widest text-accent mb-4 md:mb-6",
  heading: "font-display text-3xl md:text-6xl tracking-tight mb-6 md:mb-8 leading-none",
  headingHighlight: "italic",
  body: "space-y-4 md:space-y-5 text-lg md:text-xl font-light text-ink/70 text-left md:text-center",
  cta: "inline-flex items-center gap-2 group text-ink font-medium border-b border-ink/10 pb-1 hover:border-accent transition-colors cursor-pointer",
  ctaIcon: "w-4 h-4 group-hover:translate-x-1 transition-transform",
} as const;
