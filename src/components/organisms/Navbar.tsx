import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { navbar } from "@/src/content/en";
import { navbarStyles as ns } from "@/src/styles/navbar";
import { SHOW_RESULTS, SHOW_CASE_STUDIES } from "@/src/config/flags";
import { track } from "@/src/lib/track";
import { useReducedMotion } from "@/src/hooks/useReducedMotion";

/** IDs of sections hidden by feature flags */
const hiddenSections = new Set<string>();
if (!SHOW_RESULTS && !SHOW_CASE_STUDIES) hiddenSections.add("success");

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleLinks = navbar.links.filter((link) => !hiddenSections.has(link.id));
  const reduced = useReducedMotion();

  const handleNavClick = useCallback((sectionId: string, label: string) => {
    setMenuOpen(false);
    track("nav link clicked", { section: sectionId, label });
  }, []);

  return (
    <nav id="navbar" className={ns.nav} role="navigation" aria-label="Main navigation">
      <motion.div
        initial={reduced ? false : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={ns.logoGroup}
      >
        <a href="#hero" className={ns.logoLink} onClick={() => setMenuOpen(false)}>
          <img src="/ovu-logo.png" alt="OVU logo" className="h-8 w-auto" />
        </a>
      </motion.div>

      {/* Desktop nav links */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={ns.linksGroup}
      >
        {visibleLinks.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={ns.link} onClick={() => handleNavClick(item.id, item.name)}>
            {item.name}
          </a>
        ))}
      </motion.div>

      {/* Desktop CTA */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden md:block"
      >
        <a href="#contact" className={ns.ctaLink} onClick={() => track("navbar cta clicked")}>
          {navbar.cta}
        </a>
      </motion.div>

      {/* Mobile hamburger + CTA */}
      <div className="flex md:hidden items-center gap-3">
        <a href="#contact" className={ns.ctaLink} onClick={() => { setMenuOpen(false); track("navbar cta clicked"); }}>
          {navbar.cta}
        </a>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={ns.hamburger}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? ns.hamburgerLineOpen1 : ns.hamburgerLine} />
          <span className={menuOpen ? ns.hamburgerLineOpen2 : ns.hamburgerLine} />
          <span className={menuOpen ? ns.hamburgerLineOpen3 : ns.hamburgerLine} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className={ns.mobileMenu}
          >
            {visibleLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={ns.mobileLink}
                onClick={() => handleNavClick(item.id, item.name)}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
