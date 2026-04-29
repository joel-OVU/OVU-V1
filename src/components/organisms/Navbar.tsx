import { motion } from "motion/react";
import { Megaphone } from "lucide-react";
import { navbar } from "@/src/content/en";
import { navbarStyles as ns } from "@/src/styles/navbar";

export default function Navbar() {
  return (
    <nav id="navbar" className={ns.nav}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={ns.logoGroup}
      >
        <a href="#hero" className={ns.logoLink}>
          <div className={ns.logoIcon}>
            <Megaphone className={ns.logoIconInner} />
          </div>
          {navbar.logo}
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={ns.linksGroup}
      >
        {navbar.links.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={ns.link}>
            {item.name}
          </a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <a href="#contact" className={ns.ctaLink}>
          {navbar.cta}
        </a>
      </motion.div>
    </nav>
  );
}
