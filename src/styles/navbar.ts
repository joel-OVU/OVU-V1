export const navbarStyles = {
  nav: "fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-paper/90 backdrop-blur-md border-b border-ink/5",
  logoGroup: "flex items-center gap-2",
  logoLink: "text-xl font-mono tracking-tighter flex items-center gap-2",
  logoIcon: "w-8 h-8 rounded-lg bg-ink flex items-center justify-center",
  logoIconInner: "w-4 h-4 text-accent",
  linksGroup: "hidden md:flex items-center gap-8 px-6 py-2 rounded-full",
  link: "text-xs font-mono uppercase tracking-widest hover:text-accent transition-colors",
  ctaLink: "px-5 py-2 bg-ink text-paper rounded-full text-xs font-mono uppercase tracking-wider hover:bg-accent transition-colors",
} as const;
