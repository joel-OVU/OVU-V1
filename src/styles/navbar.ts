export const navbarStyles = {
  nav: "fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-3 md:px-12 md:py-4 bg-paper/90 backdrop-blur-md border-b border-ink/5",
  logoGroup: "flex items-center gap-2",
  logoLink: "text-xl font-mono tracking-tighter flex items-center gap-2 cursor-pointer",
  logoIcon: "w-8 h-8 rounded-lg bg-ink flex items-center justify-center",
  logoIconInner: "w-4 h-4 text-accent",
  linksGroup: "hidden md:flex items-center gap-8 px-6 py-2 rounded-full",
  link: "text-xs font-mono uppercase tracking-widest hover:text-accent transition-colors cursor-pointer",
  ctaLink: "px-5 py-2 bg-ink text-paper rounded-full text-xs font-mono uppercase tracking-wider hover:bg-accent transition-colors cursor-pointer",
  // Mobile menu
  hamburger: "md:hidden flex flex-col gap-[5px] p-2 -mr-2 cursor-pointer",
  hamburgerLine: "w-5 h-[2px] bg-ink rounded-full transition-all duration-300",
  hamburgerLineOpen1: "w-5 h-[2px] bg-ink rounded-full transition-all duration-300 rotate-45 translate-y-[7px]",
  hamburgerLineOpen2: "w-5 h-[2px] bg-ink rounded-full transition-all duration-300 opacity-0",
  hamburgerLineOpen3: "w-5 h-[2px] bg-ink rounded-full transition-all duration-300 -rotate-45 -translate-y-[7px]",
  mobileMenu: "md:hidden fixed inset-x-0 top-[57px] bg-paper/95 backdrop-blur-lg border-b border-ink/5 px-6 py-5 flex flex-col gap-3 z-40",
  mobileLink: "text-sm font-mono uppercase tracking-widest hover:text-accent transition-colors py-2 cursor-pointer",
  mobileCta: "mt-2 w-full py-3 bg-ink text-paper rounded-full text-sm font-mono uppercase tracking-wider hover:bg-accent transition-colors text-center cursor-pointer",
} as const;
