import { navbar, footer } from "@/src/content/en";
import { footerStyles as fts } from "@/src/styles/footer";
import { SHOW_RESULTS, SHOW_CASE_STUDIES } from "@/src/config/flags";
import FooterColumn from "@/src/components/molecules/FooterColumn/FooterColumn";

const showResults = SHOW_RESULTS || SHOW_CASE_STUDIES;

export default function SiteFooter() {
  return (
    <footer className={fts.footer}>
      <div className={fts.container}>
        <div className={fts.brandCol}>
          <a href="#hero" className={fts.brandLink}>
            <img src="/ovu-logo.png" alt="OVU logo" className="h-6 w-auto" />
          </a>
          <p className={fts.brandText}>
            {footer.tagline}
            <br /><br />
            © {new Date().getFullYear()} {footer.company.name}
          </p>
        </div>
        <div className={fts.columns}>
          {Object.values(footer.columns).map((column) => {
            const visibleLinks = column.links.filter(
              (link) => !("requiresResults" in link && link.requiresResults && !showResults)
            );
            return (
              <FooterColumn key={column.heading} heading={column.heading} links={visibleLinks} />
            );
          })}
        </div>
      </div>
      <div className={fts.marquee}>{footer.marquee}</div>
    </footer>
  );
}
