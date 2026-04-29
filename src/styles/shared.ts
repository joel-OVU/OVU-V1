/** Shared / reusable layout and typography classes */
export const styles = {
  root: "relative min-h-screen font-sans selection:bg-accent selection:text-white overflow-x-hidden",
  container: "max-w-7xl mx-auto",
  sectionTag: "font-mono text-xs uppercase tracking-widest text-accent mb-8",
  sectionHeading: "text-4xl md:text-6xl font-medium tracking-tight mb-12 leading-none",
  sectionHeadingLg: "text-5xl md:text-7xl font-medium tracking-tighter mb-8",
  bodyText: "text-xl font-light text-ink/70",
  iconAccent: "text-accent",
  iconSm: "w-4 h-4",
  iconMd: "w-5 h-5",
  iconLg: "w-8 h-8",
} as const;
