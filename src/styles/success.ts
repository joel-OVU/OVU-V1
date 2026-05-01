export const successStyles = {
  section: "py-20 md:py-28 px-6 md:px-12 bg-paper",
  header: "flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8",
  headerContent: "max-w-xl",
  heading: "font-display text-4xl md:text-6xl tracking-tight mb-5 leading-none",
  description: "text-lg text-ink/70 font-light",
  statsGroup: "flex items-center gap-4 py-4",
  statValue: "text-4xl font-medium leading-none",
  statLabel: "text-sm font-mono text-ink/55 uppercase",
  statDivider: "w-[1px] h-12 bg-ink/10",
  grid: "grid grid-cols-1 md:grid-cols-12 gap-6",
  // CaseStudyCard
  card: "group relative rounded-[40px] overflow-hidden bg-ink cursor-pointer",
  cardImage: "absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 blur-[2px] group-hover:blur-0",
  cardOverlay: "absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent",
  cardContent: "absolute bottom-0 left-0 p-8 md:p-12 w-full",
  cardMetric: "inline-block px-3 py-1 bg-accent rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-white mb-4",
  cardTitle: "text-3xl md:text-4xl text-paper font-medium mb-4 leading-none tracking-tight",
  cardExpandWrap: "overflow-hidden",
  cardDesc: "text-paper font-light max-w-sm",
  cardProtocolNote: "block mt-4 text-accent font-mono text-[10px] uppercase tracking-widest font-bold",
  cardAction: "mt-6 text-xs font-mono uppercase tracking-widest text-white/50 group-hover:text-accent transition-colors cursor-pointer",
  cardArrowWrap: "absolute top-10 right-12 w-10 h-10 rounded-full bg-paper/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300",
  cardArrowIcon: "w-5 h-5 text-accent transition-transform",
  cardArrowIconOpen: "w-5 h-5 text-accent transition-transform rotate-90",
} as const;

/** Grid span classes per case study index */
export const caseStudySpans = [
  "md:col-span-8 h-[500px]",
  "md:col-span-4 h-[500px]",
  "md:col-span-4 h-[600px] md:-mt-12",
  "md:col-span-8 h-[480px]",
] as const;
