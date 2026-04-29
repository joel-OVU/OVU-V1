export const aboutStyles = {
  section: "py-32 px-6 md:px-12 bg-white flex flex-col items-center",
  container: "max-w-4xl text-center",
  tag: "font-mono text-xs uppercase tracking-widest text-accent mb-8",
  heading: "text-4xl md:text-6xl font-medium tracking-tight mb-12 leading-none",
  headingHighlight: "italic",
  body: "space-y-8 text-xl font-light text-ink/70 text-left md:text-center",
  cta: "inline-flex items-center gap-2 group text-ink font-medium border-b border-ink/10 pb-1 hover:border-accent transition-colors",
  ctaIcon: "w-4 h-4 group-hover:translate-x-1 transition-transform",
} as const;
