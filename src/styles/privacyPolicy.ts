export const privacyPolicyStyles = {
  page: "relative min-h-[100dvh] bg-paper text-ink font-sans overflow-x-hidden",
  topBar: "border-b border-ink/10 bg-paper/85 backdrop-blur-xl sticky top-0 z-40",
  topBarInner: "max-w-3xl mx-auto px-6 h-16 md:h-[72px] flex items-center justify-between gap-4",
  logoLink: "flex items-center cursor-pointer",
  logo: "h-8 w-auto",
  backLink:
    "inline-flex items-center gap-2 min-h-11 px-4 rounded-full border border-ink/10 text-sm font-medium hover:bg-ink/5 transition-colors cursor-pointer",
  backIcon: "w-4 h-4",
  main: "max-w-3xl mx-auto px-6 pt-12 pb-24 md:pt-20",
  tag: "font-mono text-xs uppercase tracking-widest text-accent mb-4",
  title: "font-display text-5xl md:text-7xl tracking-tight leading-none mb-4",
  updated: "font-mono text-xs uppercase tracking-widest text-ink/50 mb-8",
  intro: "text-lg md:text-xl font-light text-ink/70 leading-relaxed mb-12 md:mb-16",
  section: "border-t border-ink/10 pt-8 mb-10 scroll-mt-24",
  heading: "font-display text-2xl md:text-3xl tracking-tight mb-4",
  paragraph: "text-base font-light text-ink/75 leading-relaxed mb-4",
  list: "list-disc pl-5 space-y-3 mb-4 marker:text-accent",
  listItem: "text-base font-light text-ink/75 leading-relaxed pl-1",
  actionButton:
    "mt-2 inline-flex items-center justify-center min-h-11 px-6 py-3 rounded-full bg-ink text-paper text-sm font-medium hover:bg-ink/85 transition-colors cursor-pointer",
  footer: "max-w-3xl mx-auto px-6 pb-12 text-sm text-ink/50 font-light",
} as const;
