export const privacyPolicy = {
  metaTitle: "Privacy Policy — OVU",
  metaDescription:
    "How Ovu Digital Ltd. collects, uses and protects your personal data, and how we use cookies on this website.",
  tag: "Legal",
  title: "Privacy Policy",
  lastUpdated: "Last updated: 13 October 2026",
  intro:
    "We keep this simple: we collect as little as we can, we tell you exactly what we use it for, and you stay in control. This policy explains how Ovu Digital Ltd. (“OVU”, “we”, “us”) handles personal data when you visit this website or get in touch.",
  email: "joel.ndlovu@ingeous-media.co.uk",
  backLink: { label: "Back to home", href: "/" },
  cookieSettingsLabel: "Change cookie settings",
  emailLabel: "Email us",
  sections: [
    {
      id: "who-we-are",
      heading: "1. Who we are",
      paragraphs: [
        "Ovu Digital Ltd. is the data controller for personal data collected through this website. We are based in the United Kingdom and process personal data in line with the UK GDPR and the Data Protection Act 2018.",
        "If you have any questions about this policy or your data, contact us using the details in section 10.",
      ],
    },
    {
      id: "what-we-collect",
      heading: "2. What we collect and why",
      list: [
        "Enquiries and bookings — when you book a discovery call (through Cal.com) or email us, we receive your name, email address, the time you choose and anything you tell us. We use this to reply, run the call and follow up on your enquiry.",
        "Website usage — we use PostHog in cookieless mode to see which pages are viewed and which buttons are clicked, along with your browser type, device and approximate location (derived from your IP address). Nothing is stored on your device, and you cannot be recognised from one page load to the next.",
        "Performance and audience measurement (only with your consent) — Vercel Web Analytics and Speed Insights help us understand traffic and page speed.",
        "Advertising measurement (only with your consent) — the Meta Pixel lets us measure how our adverts perform and may set cookies on your device.",
      ],
    },
    {
      id: "lawful-bases",
      heading: "3. Our lawful bases",
      list: [
        "Legitimate interests — running and improving our website using cookieless analytics, and replying to business enquiries.",
        "Taking steps at your request before a contract — handling bookings and enquiries you send us.",
        "Consent — Vercel Web Analytics, Speed Insights and the Meta Pixel. You can withdraw consent at any time (see section 4).",
        "Legal obligation — where we must keep records, for example for tax or accounting purposes.",
      ],
    },
    {
      id: "cookies",
      heading: "4. Cookies and similar technologies",
      paragraphs: [
        "When you first visit, a banner asks you to accept or reject optional cookies. Rejecting is as easy as accepting, and nothing optional runs until you choose. Your choice is saved in your browser's local storage (key: site_cookie_consent).",
      ],
      list: [
        "Necessary — remembers your cookie choice. This cannot be switched off.",
        "Functional — reserved for optional preference features. None are currently in use.",
        "Analytics (consent) — Vercel Web Analytics and Speed Insights.",
        "Marketing (consent) — Meta Pixel, which may set the cookies _fbp and _fbc.",
        "Cookieless analytics (always on) — PostHog runs without cookies or local storage.",
        "Embedded services — the Cal.com booking calendar and Google Fonts are loaded from their providers and may receive your IP address and browser details when they load. Cal.com may also set its own cookies.",
      ],
      paragraphsAfter: [
        "You can review or withdraw your choice at any time using the button below or the “Cookie Settings” link in the site footer. You can also delete cookies in your browser settings.",
      ],
      showCookieSettings: true,
    },
    {
      id: "sharing",
      heading: "5. Who we share data with",
      paragraphs: [
        "We never sell your personal data. We share it only with service providers that help us run the website and our business, each acting on our instructions or under their own privacy terms:",
      ],
      list: [
        "Cal.com — discovery call scheduling.",
        "PostHog (EU cloud) — cookieless product analytics.",
        "Vercel — website hosting, web analytics and performance monitoring.",
        "Meta Platforms — advertising measurement, only if you accept marketing cookies.",
        "Google — web fonts.",
        "Professional advisers, and authorities where the law requires it.",
      ],
    },
    {
      id: "transfers",
      heading: "6. International transfers",
      paragraphs: [
        "Some providers process data outside the UK, including in the United States. Where this happens we rely on UK adequacy regulations, the UK Extension to the EU–US Data Privacy Framework, or the UK International Data Transfer Agreement or Addendum, so your data stays protected.",
      ],
    },
    {
      id: "retention",
      heading: "7. How long we keep data",
      paragraphs: [
        "We keep personal data only for as long as we need it for the purposes above. Enquiry and booking details are kept while we are in contact with you and for a reasonable period afterwards, and records we are legally required to keep are held for the required period. Cookieless analytics data is kept in aggregate form and reviewed regularly.",
      ],
    },
    {
      id: "your-rights",
      heading: "8. Your rights",
      paragraphs: ["Under UK data protection law you have the right to:"],
      list: [
        "be informed about how your data is used (this policy);",
        "access the personal data we hold about you;",
        "have inaccurate data corrected;",
        "have your data erased, in certain circumstances;",
        "restrict or object to our processing, including processing based on legitimate interests;",
        "receive your data in a portable format; and",
        "withdraw consent at any time, without affecting earlier processing.",
      ],
      paragraphsAfter: [
        "To use any of these rights, contact us. We will respond within one month. If you are unhappy with how we handle your data, you can complain to the Information Commissioner's Office (ICO) at ico.org.uk or on 0303 123 1113.",
      ],
    },
    {
      id: "security-children",
      heading: "9. Security and children",
      paragraphs: [
        "We use appropriate technical and organisational measures to protect personal data, including encrypted connections (HTTPS) and access controls on the services we use. This website is intended for businesses and is not directed at anyone under 18.",
      ],
    },
    {
      id: "contact",
      heading: "10. Contact and changes",
      paragraphs: [
        "Questions, requests or concerns about your data? Email us and we will help. We may update this policy from time to time; the date at the top shows when it last changed, and we will highlight any significant changes on this page.",
      ],
      showEmail: true,
    },
  ],
} as const;
