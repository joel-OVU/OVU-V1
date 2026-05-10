interface SectionTagProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTag({ children, className = "font-mono text-xs uppercase tracking-widest text-accent mb-8" }: SectionTagProps) {
  return <p className={className}>{children}</p>;
}
