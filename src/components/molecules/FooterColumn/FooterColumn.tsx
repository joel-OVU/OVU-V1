import React from "react";
import { footerStyles as fts } from "@/src/styles/footer";
import { track } from "@/src/lib/track";
import { COOKIE_SETTINGS_HREF, openCookieSettings } from "@/src/lib/consent";

interface FooterColumnProps {
  key?: React.Key;
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
            <a
              href={link.href}
              className={fts.columnLink}
              onClick={(event) => {
                if (link.href === COOKIE_SETTINGS_HREF) {
                  event.preventDefault();
                  openCookieSettings();
                }
                track("footer link clicked", { label: link.label, href: link.href, column: heading });
              }}
            >{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
