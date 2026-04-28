import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../../App";

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

    expect(within(nav).getByRole("link", { name: /success/i })).toHaveAttribute(
      "href",
      "#success"
    );

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

    expect(screen.getByRole("link", { name: /our results/i })).toHaveAttribute(
      "href",
      "#success"
    );
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

    expect(screen.getByText(/pr/i)).toBeInTheDocument();
    expect(screen.getByText(/seo/i)).toBeInTheDocument();
    expect(screen.getByText(/logos/i)).toBeInTheDocument();
    expect(screen.getByText(/social posts/i)).toBeInTheDocument();
    expect(screen.getByText(/influencers/i)).toBeInTheDocument();
    expect(screen.getByText(/newsletters/i)).toBeInTheDocument();
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

  it("renders client results and case studies", () => {
    render(<App />);

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

    expect(screen.getByAltText(/global property collective/i)).toBeInTheDocument();
    expect(screen.getByAltText(/aesthetic medical center/i)).toBeInTheDocument();
    expect(screen.getByAltText(/the kensington suites/i)).toBeInTheDocument();
    expect(screen.getByAltText(/tech solutions uk/i)).toBeInTheDocument();
  });

  it("renders the contact section", () => {
    render(<App />);

    expect(screen.getByText(/selective intake/i)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /apply to scale with ovu/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/conversion audit/i)).toBeInTheDocument();
    expect(screen.getByText(/roi roadmap/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /access calendar/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/protocol active/i)).toBeInTheDocument();
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
    expect(screen.getByText(/company number: 11178977/i)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      "mailto:hello@ovu.digital"
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