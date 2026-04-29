import { footerStyles as fts } from "@/src/styles/footer";

interface FooterColumnProps {
  heading: string;
  links: ReadonlyArray<{ readonly label: string; readonly href: string }>;
}

export default function FooterColumn({ heading, links }: FooterColumnProps) {
  return (
    <div>
      <h5 className={fts.columnHeading}>{heading}</h5>
      <ul className={fts.columnList}>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={fts.columnLink}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
