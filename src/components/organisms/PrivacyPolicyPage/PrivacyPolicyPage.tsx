import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { footer, privacyPolicy as copy } from "@/src/content/en";
import { privacyPolicyStyles as ps } from "@/src/styles/privacyPolicy";
import { openCookieSettings } from "@/src/lib/consent";
import CookieConsent from "@/src/components/organisms/CookieConsent/CookieConsent";

interface PolicySection {
  readonly id: string;
  readonly heading: string;
  readonly paragraphs?: readonly string[];
  readonly list?: readonly string[];
  readonly paragraphsAfter?: readonly string[];
  readonly showCookieSettings?: boolean;
  readonly showEmail?: boolean;
}

export default function PrivacyPolicyPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = copy.metaTitle;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = meta?.content;
    if (meta) meta.content = copy.metaDescription;
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== undefined) meta.content = previousDescription;
    };
  }, []);

  return (
    <div id="privacy-policy-page" className={ps.page}>
      <CookieConsent />

      <header className={ps.topBar}>
        <div className={ps.topBarInner}>
          <a href="/" className={ps.logoLink} aria-label="OVU home">
            <img src="/ovu-logo.png" alt="OVU logo" className={ps.logo} />
          </a>
          <a href={copy.backLink.href} className={ps.backLink}>
            <ArrowLeft className={ps.backIcon} aria-hidden="true" />
            {copy.backLink.label}
          </a>
        </div>
      </header>

      <main className={ps.main}>
        <p className={ps.tag}>{copy.tag}</p>
        <h1 className={ps.title}>{copy.title}</h1>
        <p className={ps.updated}>{copy.lastUpdated}</p>
        <p className={ps.intro}>{copy.intro}</p>

        {(copy.sections as readonly PolicySection[]).map((section) => (
          <section key={section.id} id={section.id} className={ps.section} aria-labelledby={`${section.id}-heading`}>
            <h2 id={`${section.id}-heading`} className={ps.heading}>
              {section.heading}
            </h2>
            {section.paragraphs?.map((text) => (
              <p key={text} className={ps.paragraph}>
                {text}
              </p>
            ))}
            {section.list && (
              <ul className={ps.list}>
                {section.list.map((item) => (
                  <li key={item} className={ps.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.paragraphsAfter?.map((text) => (
              <p key={text} className={ps.paragraph}>
                {text}
              </p>
            ))}
            {section.showCookieSettings && (
              <button type="button" className={ps.actionButton} onClick={openCookieSettings}>
                {copy.cookieSettingsLabel}
              </button>
            )}
            {section.showEmail && (
              <a href={`mailto:${copy.email}`} className={ps.actionButton}>
                {copy.emailLabel}
              </a>
            )}
          </section>
        ))}
      </main>

      <footer className={ps.footer}>
        © {new Date().getFullYear()} {footer.company.name}
      </footer>
    </div>
  );
}
