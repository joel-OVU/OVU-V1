/** Shared / reusable layout and typography classes */
export const styles = {
  root: "relative min-h-[100dvh] font-sans selection:bg-accent selection:text-white overflow-x-hidden",
  container: "max-w-7xl mx-auto",
  sectionTag: "font-mono text-xs uppercase tracking-widest text-accent mb-6",
  sectionHeading: "font-display text-4xl md:text-6xl tracking-tight mb-10 leading-none",
  sectionHeadingLg: "font-display text-5xl md:text-7xl tracking-tighter mb-8",
  bodyText: "text-xl font-light text-ink/70",
  iconAccent: "text-accent",
  iconSm: "w-4 h-4",
  iconMd: "w-5 h-5",
  iconLg: "w-8 h-8",
} as const;
