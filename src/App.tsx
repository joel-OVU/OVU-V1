/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { 
  ArrowRight, 
  Target, 
  BarChart3, 
  Calendar, 
  Zap, 
  CheckCircle2, 
  Users,
  Menu,
  X,
  Megaphone,
  Globe,
  TrendingUp,
  MousePointer2
} from "lucide-react";
import { useState } from "react";
import {
  navbar,
  hero,
  services,
  features,
  about,
  success,
  contact,
  faq,
  footer,
} from "@/src/content/en";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div id="app-root" className="relative min-h-screen font-sans selection:bg-accent selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav id="navbar" className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-paper/90 backdrop-blur-md border-b border-ink/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <a href="#hero" className="text-xl font-mono tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-accent" />
            </div>
            {navbar.logo}
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-8 px-6 py-2 rounded-full"
        >
          {navbar.links.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-xs font-mono uppercase tracking-widest hover:text-accent transition-colors">
              {item.name}
            </a>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <a href="#contact" className="px-5 py-2 bg-ink text-paper rounded-full text-xs font-mono uppercase tracking-wider hover:bg-accent transition-colors">
            {navbar.cta}
          </a>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.div style={{ opacity, scale }} className="max-w-5xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-sm uppercase tracking-widest text-accent mb-6"
          >
            {hero.tag}
          </motion.p>
          
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
            className="text-6xl md:text-8xl font-medium leading-[0.9] tracking-[-0.05em] mb-8"
          >
            {hero.heading.split(" ").map((word, i) => (
              <motion.span 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
                }}
                className={`inline-block mr-[0.2em] ${word === "elite" || word === "enquiry" ? "italic text-ink/30" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-ink/60 max-w-2xl mx-auto mb-12 font-light"
          >
            {hero.subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#contact" className="px-10 py-5 bg-ink text-paper rounded-full text-lg font-medium hover:scale-105 transition-transform flex items-center gap-3">
              {hero.primaryCta} <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#success" className="px-10 py-5 bg-transparent border border-ink/10 rounded-full text-lg font-medium hover:bg-ink/5 transition-colors">
              {hero.secondaryCta}
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10"
        >
          <div className="w-5 h-10 rounded-full border border-ink/20 flex justify-center p-1">
            <div className="w-1 h-2 bg-ink/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8 italic">{services.title}</h2>
            <p className="text-xl text-ink/60 max-w-2xl mx-auto">
              {services.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.items.map((service, i) => (
              <ServiceCard key={i} title={service.title} desc={service.description} details={service.details} />
            ))}
          </div>

          {/* Exclusions Sub-section */}
          <div className="mt-24 pt-24 border-t border-ink/5 text-center">
            <p className="text-sm font-mono uppercase tracking-widest text-ink/30 mb-8">{services.exclusions.label}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {services.exclusions.items.map(item => (
                <div key={item} className="px-6 py-2 border border-ink/5 rounded-full flex items-center gap-2 text-ink/20 font-mono text-xs">
                  <X className="w-3 h-3" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 md:px-12 bg-ink text-paper relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full text-accent">
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
          <div>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-12 leading-[0.9]">
              {features.heading.prefix} <br />
              <span className="text-accent italic uppercase">{features.heading.highlight}</span>
            </h2>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <Zap className="w-8 h-8 text-accent mb-4" />
                <h4 className="text-lg font-medium mb-2 uppercase tracking-widest font-mono">{features.capabilities[0].title}</h4>
                <p className="text-sm text-paper/50">{features.capabilities[0].description}</p>
              </div>
              <div>
                <Target className="w-8 h-8 text-accent mb-4" />
                <h4 className="text-lg font-medium mb-2 uppercase tracking-widest font-mono">{features.capabilities[1].title}</h4>
                <p className="text-sm text-paper/50">{features.capabilities[1].description}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-medium mb-12 font-mono uppercase tracking-widest">{features.protocol.title}</h3>
            <div className="space-y-12">
              {features.protocol.steps.map((step, idx) => (
                <div key={idx} className="relative pl-12 border-l border-white/10 group">
                  <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-accent group-hover:scale-150 transition-transform" />
                  <h4 className="text-xl font-medium mb-2">{step.title}</h4>
                  <p className="text-paper/40 font-light">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-12 bg-white flex flex-col items-center">
        <div className="max-w-4xl text-center">
           <p className="font-mono text-xs uppercase tracking-widest text-accent mb-8">{about.tag}</p>
           <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-12 leading-none">
             {about.heading.prefix}<span className="italic">{about.heading.highlight}</span>
           </h2>
           <div className="space-y-8 text-xl font-light text-ink/70 text-left md:text-center">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 group text-ink font-medium border-b border-ink/10 pb-1 hover:border-accent transition-colors"
              >
                {about.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>

      {/* Proof Section - Testimonials */}
      <section id="success" className="py-32 px-6 md:px-12 bg-paper">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 leading-none">
                {success.heading.replace(" local businesses.", "")} <br />local businesses.
              </h2>
              <p className="text-lg text-ink/60 font-light">
                {success.description}
              </p>
            </div>
            <div className="flex items-center gap-4 py-4">
              {success.stats.map((stat, i) => (
                <div key={i} className={`${i > 0 ? "flex items-center gap-4" : ""}`}>
                  {i > 0 && <div className="w-[1px] h-12 bg-ink/10" />}
                  <div className="text-right">
                    <p className="text-4xl font-medium leading-none">{stat.value}</p>
                    <p className="text-sm font-mono text-ink/40 uppercase">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {success.caseStudies.map((cs, i) => {
              const spanClasses = [
                "md:col-span-8 h-[500px]",
                "md:col-span-4 h-[500px]",
                "md:col-span-4 h-[600px] md:-mt-12",
                "md:col-span-8 h-[480px]",
              ];
              return (
                <CaseStudyCard 
                  key={cs.id}
                  id={cs.id}
                  className={spanClasses[i]}
                  image={cs.image}
                  title={cs.title}
                  metric={cs.metric}
                  description={cs.description}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-8">
              {contact.tag}
            </div>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8 leading-none">
              {contact.heading.prefix} <br /><span className="text-accent underline decoration-1 underline-offset-8">{contact.heading.highlight}</span>
            </h2>
            <p className="text-xl text-ink/60 mb-12 leading-relaxed font-light">
              {contact.description}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-paper flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">{contact.benefits[0].title}</h4>
                  <p className="text-ink/50 text-sm">{contact.benefits[0].description}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-paper flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">{contact.benefits[1].title}</h4>
                  <p className="text-ink/50 text-sm">{contact.benefits[1].description}</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 border-l-4 border-accent bg-paper/50 rounded-r-2xl italic text-ink/70">
              {contact.testimonial.quote}
              <div className="mt-4 not-italic flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center font-bold text-xs uppercase text-ink/40">{contact.testimonial.initials}</div>
                <div>
                  <p className="text-sm font-bold">{contact.testimonial.name}</p>
                  <p className="text-xs font-mono text-ink/40 uppercase">{contact.testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent to-accent-dark opacity-10 blur-3xl group-hover:opacity-20 transition-opacity" />
            <div className="relative bg-white border border-ink/5 shadow-2xl rounded-[32px] overflow-hidden min-h-[600px] flex flex-col">
              <div className="px-8 py-6 border-b border-ink/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs font-mono text-ink/20 uppercase">{contact.portal.label}</div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 rounded-2xl bg-ink flex items-center justify-center mb-8 transform group-hover:rotate-12 transition-transform shadow-xl">
                   <Megaphone className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-medium mb-4">{contact.portal.title}</h3>
                <p className="text-ink/50 mb-10 max-w-xs mx-auto font-light">{contact.portal.description}</p>
                <div className="w-full max-w-sm space-y-4">
                  <button className="w-full py-4 px-6 bg-ink text-paper rounded-2xl font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2">
                    {contact.portal.cta} <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-accent font-bold">{contact.portal.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 md:px-12 bg-white/30 border-t border-ink/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-16 text-center">{faq.title}</h2>
          <div className="space-y-4">
            {faq.items.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-white border border-ink/5 rounded-3xl"
              >
                <h4 className="text-xl font-medium mb-4">{item.question}</h4>
                <p className="text-ink/60 font-light leading-relaxed">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 border-t border-ink/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <a href="#hero" className="text-xl font-mono tracking-tighter mb-6 block flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-accent" />
              {navbar.logo}
            </a>
            <p className="text-sm text-ink/40 font-light">
              {footer.tagline}
              <br /><br />
              © {new Date().getFullYear()} {footer.company.name} <br />Company Number: {footer.company.companyNumber}.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            {Object.values(footer.columns).map((column) => (
              <div key={column.heading}>
                <h5 className="text-xs font-mono uppercase tracking-widest text-ink/30 mb-6">{column.heading}</h5>
                <ul className="space-y-4 text-sm font-medium">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="hover:text-accent transition-colors">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-ink/5 text-[10vw] font-medium tracking-tighter text-ink/5 whitespace-nowrap overflow-hidden select-none">
          {footer.marquee}
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ title, desc, details }: { title: string, desc: string, details: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 bg-paper border border-ink/5 rounded-[32px] group hover:border-accent/20 transition-all duration-500"
    >
      <h3 className="text-2xl font-medium mb-4 group-hover:text-accent transition-colors">{title}</h3>
      <p className="text-ink/60 font-light mb-6 leading-relaxed">
        {desc}
      </p>
      
      <motion.div 
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="text-sm text-ink/80 bg-white/50 p-4 rounded-2xl mb-6 border border-ink/5 font-light">
          {details}
        </p>
      </motion.div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs font-mono uppercase tracking-widest font-bold text-ink/30 hover:text-accent transition-colors flex items-center gap-2"
      >
        {isOpen ? services.cardActions.close : services.cardActions.open} <ArrowRight className={`w-3 h-3 transition-transform ${isOpen ? "-rotate-90" : ""}`} />
      </button>
    </motion.div>
  );
}

function CaseStudyCard({ image, title, metric, description, className, id }: { 
  image: string, 
  title: string, 
  metric: string, 
  description: string,
  className?: string,
  id: string
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative rounded-[40px] overflow-hidden bg-ink cursor-pointer ${className}`}
      id={id}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 blur-[2px] group-hover:blur-0" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
        <div className="inline-block px-3 py-1 bg-accent rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-white mb-4">
          {metric}
        </div>
        <h3 className="text-3xl md:text-4xl text-paper font-medium mb-4 leading-none tracking-tight">{title}</h3>
        
        <motion.div
           animate={{ height: isExpanded ? "auto" : "0", opacity: isExpanded ? 1 : 0 }}
           className="overflow-hidden"
        >
          <p className="text-paper font-light max-w-sm">
            {description}
            {isExpanded && (
              <span className="block mt-4 text-accent font-mono text-[10px] uppercase tracking-widest font-bold">
                {success.protocolNote.label}
                <br /> 
                {success.protocolNote.description}
              </span>
            )}
          </p>
        </motion.div>

        <div className="mt-6 text-xs font-mono uppercase tracking-widest text-white/30 group-hover:text-accent transition-colors">
          {isExpanded ? success.caseStudyActions.collapse : success.caseStudyActions.expand}
        </div>
      </div>
      <div className="absolute top-10 right-12 w-10 h-10 rounded-full bg-paper/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
        <ArrowRight className={`w-5 h-5 text-accent transition-transform ${isExpanded ? "rotate-90" : ""}`} />
      </div>
    </motion.div>
  );
}
