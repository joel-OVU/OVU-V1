export const cookieConsent = {
  title: "Your privacy, your call",
  tag: "Cookies",
  description:
    "We use essential cookies to run this site. With your permission we'd also like to measure how it's used and how our marketing performs. Rejecting is just as easy as accepting.",
  privacy: { label: "Privacy Policy", href: "/privacy-policy" },
  actions: {
    acceptAll: "Accept All",
    rejectAll: "Reject All",
    managePreferences: "Manage Preferences",
    hidePreferences: "Hide Preferences",
    savePreferences: "Save Preferences",
    close: "Close cookie settings",
  },
  preferencesHeading: "Choose which cookies we can use",
  alwaysOn: "Always on",
  categories: [
    {
      id: "necessary",
      label: "Necessary",
      description: "Keep the site secure and working, and remember your cookie choice. These can't be switched off.",
    },
    {
      id: "functional",
      label: "Functional",
      description: "Remember optional settings and enable extra features that improve your experience.",
    },
    {
      id: "analytics",
      label: "Analytics",
      description: "Help us understand how visitors use the site so we can improve it (Vercel Analytics, Speed Insights).",
    },
    {
      id: "marketing",
      label: "Marketing",
      description: "Measure the performance of our adverts and show relevant content (Meta Pixel).",
    },
  ],
} as const;
