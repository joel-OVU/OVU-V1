import { Megaphone } from "lucide-react";
import { navbar, footer } from "@/src/content/en";
import { footerStyles as fts } from "@/src/styles/footer";
import FooterColumn from "@/src/components/molecules/FooterColumn";

export default function SiteFooter() {
  return (
    <footer className={fts.footer}>
      <div className={fts.container}>
        <div className={fts.brandCol}>
          <a href="#hero" className={fts.brandLink}>
            <Megaphone className={fts.brandIcon} />
            {navbar.logo}
          </a>
          <p className={fts.brandText}>
            {footer.tagline}
            <br /><br />
            © {new Date().getFullYear()} {footer.company.name} <br />
            Company Number: {footer.company.companyNumber}.
          </p>
        </div>
        <div className={fts.columns}>
          {Object.values(footer.columns).map((column) => (
            <FooterColumn key={column.heading} heading={column.heading} links={column.links} />
          ))}
        </div>
      </div>
      <div className={fts.marquee}>{footer.marquee}</div>
    </footer>
  );
}
