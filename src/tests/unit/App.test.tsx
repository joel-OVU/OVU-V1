import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../../App";
import { SHOW_RESULTS, SHOW_CASE_STUDIES, SHOW_TESTIMONIALS } from "@/src/config/flags";

const showSuccess = SHOW_RESULTS || SHOW_CASE_STUDIES;

describe("OVU landing page", () => {
  it("renders the main navigation and primary CTA", () => {
    render(<App />);

    const nav = screen.getByRole("navigation");

    expect(within(nav).getByRole("link", { name: /ovu/i })).toHaveAttribute(
      "href",
      "#hero"
    );

    expect(within(nav).getByRole("link", { name: /services/i })).toHaveAttribute(
      "href",
      "#services"
    );

    expect(within(nav).getByRole("link", { name: /features/i })).toHaveAttribute(
      "href",
      "#features"
    );

    expect(within(nav).getByRole("link", { name: /about/i })).toHaveAttribute(
      "href",
      "#about"
    );

    if (showSuccess) {
      expect(within(nav).getByRole("link", { name: /success/i })).toHaveAttribute(
        "href",
        "#success"
      );
    } else {
      expect(within(nav).queryByRole("link", { name: /success/i })).toBeNull();
    }

    expect(within(nav).getByRole("link", { name: /faq/i })).toHaveAttribute(
      "href",
      "#faq"
    );

    expect(within(nav).getByRole("link", { name: /book call/i })).toHaveAttribute(
      "href",
      "#contact"
    );
  });

  it("renders the hero section with headline and calls to action", () => {
    render(<App />);

    expect(
      screen.getByText(/digital enquiry engineering/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /transforming local traffic into elite enquiry flows/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /ovu builds the high-performance architecture required to capture and convert every visitor/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /schedule your free audit/i })
    ).toHaveAttribute("href", "#contact");

    if (showSuccess) {
      expect(screen.getByRole("link", { name: /our results/i })).toHaveAttribute(
        "href",
        "#success"
      );
    } else {
      expect(screen.getByRole("link", { name: /explore services/i })).toHaveAttribute(
        "href",
        "#services"
      );
    }
  });

  it("renders the services section", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /ovu focus/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /funnel engineering/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /enquiry optimisation/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /predictable roi/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/strictly excluded/i)).toBeInTheDocument();

    // Use getAllByText for short patterns that may match multiple elements
    const prElements = screen.getAllByText(/^PR$/);
    expect(prElements.length).toBeGreaterThanOrEqual(1);

    const seoElements = screen.getAllByText(/^SEO$/);
    expect(seoElements.length).toBeGreaterThanOrEqual(1);

    expect(screen.getByText(/^Logos$/)).toBeInTheDocument();
    expect(screen.getByText(/^Social Posts$/)).toBeInTheDocument();
    expect(screen.getByText(/^Influencers$/)).toBeInTheDocument();
    expect(screen.getByText(/^Newsletters$/)).toBeInTheDocument();
  });

  it("renders the feature/protocol section", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /the architecture of unrivalled growth/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/statistical edge/i)).toBeInTheDocument();
    expect(screen.getByText(/high velocity/i)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /the ovu protocol/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/psychological architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/friction eradication/i)).toBeInTheDocument();
    expect(screen.getByText(/live roi dashboard/i)).toBeInTheDocument();
  });

  it("renders the about section", () => {
    render(<App />);

    expect(screen.getByText(/about ovu/i)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /we look for a specific kind of partner/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /apply to work with ovu/i })
    ).toBeInTheDocument();
  });

  it("conditionally renders client results and case studies", () => {
    render(<App />);

    if (showSuccess) {
      expect(
        screen.getByRole("heading", { name: /elite results for real local businesses/i })
      ).toBeInTheDocument();

      expect(screen.getByText(/£1\.2m\+/i)).toBeInTheDocument();
      expect(screen.getByText(/18\.5%/i)).toBeInTheDocument();

      expect(
        screen.getByRole("heading", { name: /global property collective/i })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("heading", { name: /aesthetic medical center/i })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("heading", { name: /the kensington suites/i })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("heading", { name: /tech solutions uk/i })
      ).toBeInTheDocument();
    } else {
      // Success section should not render when flags are off
      expect(
        screen.queryByRole("heading", { name: /elite results for real local businesses/i })
      ).toBeNull();

      expect(screen.queryByText(/£1\.2m\+/i)).toBeNull();
      expect(screen.queryByText(/global property collective/i)).toBeNull();
    }
  });

  it("renders the contact section", () => {
    render(<App />);

    expect(screen.getByText(/selective intake/i)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /apply to scale with ovu/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/conversion audit/i)).toBeInTheDocument();
    expect(screen.getByText(/roi roadmap/i)).toBeInTheDocument();

    // Cal.com embed renders inside the Protocol Portal card
    expect(screen.getByText(/protocol portal/i)).toBeInTheDocument();

    if (SHOW_TESTIMONIALS) {
      expect(screen.getByText(/sarah collins/i)).toBeInTheDocument();
    } else {
      expect(screen.queryByText(/sarah collins/i)).toBeNull();
    }
  });

  it("renders the FAQ section", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /protocol faq/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/how fast will the protocol deliver results/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/is ovu suitable for local retail/i)).toBeInTheDocument();
    expect(screen.getByText(/who are your typical partners/i)).toBeInTheDocument();

    expect(
      screen.getByText(/what is the minimum requirements to start/i)
    ).toBeInTheDocument();
  });

  it("renders footer legal and company details", () => {
    render(<App />);

    expect(screen.getByText(/© 2026 ovu digital ltd/i)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      "mailto:joel.ndlovu@ingeous-media.co.uk"
    );

    expect(screen.getByRole("link", { name: /terms/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /privacy/i })).toBeInTheDocument();
  });

  it("renders service detail buttons", async () => {
    const user = userEvent.setup();

    render(<App />);

    const buttons = screen.getAllByRole("button", { name: /strategy details/i });

    expect(buttons).toHaveLength(3);

    await user.click(buttons[0]);

    expect(
      screen.getByText(/includes precise audience targeting/i)
    ).toBeInTheDocument();
  });
});