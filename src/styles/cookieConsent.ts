export const cookieConsentStyles = {
  // Floating glass card: full-width (with margins) on mobile, 26rem card bottom-right from sm up.
  banner:
    "cookie-consent fixed z-[10000] inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[26rem] max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain rounded-3xl border border-ink/10 bg-paper/85 backdrop-blur-xl p-5 sm:p-6 text-ink shadow-[0_24px_60px_-12px_rgba(15,14,36,0.28)]",
  accentLine: "pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent",
  header: "flex items-start justify-between gap-4 mb-3",
  tag: "flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent",
  tagIcon: "w-4 h-4",
  title: "font-display text-2xl leading-tight tracking-tight mb-2",
  description: "text-sm font-light text-ink/70 leading-relaxed",
  privacyLink: "font-medium text-ink underline underline-offset-4 decoration-ink/30 hover:text-accent hover:decoration-accent transition-colors cursor-pointer",
  closeButton:
    "-m-2 p-2 min-w-11 min-h-11 flex items-center justify-center rounded-full text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors cursor-pointer",
  closeIcon: "w-4 h-4",

  // Accept + Reject deliberately share one style so neither choice is nudged.
  actions: "grid grid-cols-2 gap-3 mt-5",
  choiceButton:
    "min-h-11 px-5 py-3 rounded-full bg-ink text-paper text-sm font-medium hover:bg-ink/85 transition-colors cursor-pointer",
  saveButton:
    "col-span-2 min-h-11 px-5 py-3 rounded-full bg-transparent border border-ink/15 text-sm font-medium hover:bg-ink/5 transition-colors cursor-pointer",
  manageWrap: "mt-2 flex justify-center",
  manageButton:
    "min-h-11 px-3 text-sm font-medium text-ink/70 underline underline-offset-4 decoration-ink/30 hover:text-accent hover:decoration-accent transition-colors cursor-pointer",

  // Preferences drawer
  drawer: "mt-5 pt-5 border-t border-ink/10",
  drawerHeading: "font-mono text-xs uppercase tracking-widest text-ink/50 mb-3",
  categoryList: "space-y-2",
  category:
    "flex items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-white/50 p-4 has-[:disabled]:cursor-default cursor-pointer",
  categoryText: "min-w-0",
  categoryLabel: "block text-sm font-medium",
  categoryHint: "block mt-1 text-xs font-light text-ink/65 leading-relaxed",
  alwaysOn: "shrink-0 font-mono text-[10px] uppercase tracking-widest text-ink/60 pt-1",

  // Switch (native checkbox + visual track)
  switchWrap: "relative shrink-0 mt-0.5",
  switchInput: "peer sr-only",
  switchTrack:
    "block h-6 w-11 rounded-full bg-ink/20 transition-colors peer-checked:bg-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
  switchThumb:
    "pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-paper shadow transition-transform peer-checked:translate-x-5",
} as const;
