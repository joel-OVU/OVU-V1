export const footerStyles = {
  footer: "py-20 px-6 md:px-12 border-t border-ink/5",
  container: "max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12",
  brandCol: "max-w-xs",
  brandLink: "text-xl font-mono tracking-tighter mb-6 block flex items-center gap-2",
  brandIcon: "w-5 h-5 text-accent",
  brandText: "text-sm text-ink/40 font-light",
  columns: "grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24",
  columnHeading: "text-xs font-mono uppercase tracking-widest text-ink/30 mb-6",
  columnList: "space-y-4 text-sm font-medium",
  columnLink: "hover:text-accent transition-colors",
  marquee: "max-w-7xl mx-auto mt-20 pt-8 border-t border-ink/5 text-[10vw] font-medium tracking-tighter text-ink/5 whitespace-nowrap overflow-hidden select-none",
} as const;
