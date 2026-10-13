import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyPolicyPage from "@/src/components/organisms/PrivacyPolicyPage/PrivacyPolicyPage";

describe("PrivacyPolicyPage", () => {
  it("renders a single h1, section headings and a link home", () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 }).length).toBeGreaterThan(5);
    expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute("href", "/");
  });

  it("offers cookie settings and a contact email", () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByRole("button", { name: /change cookie settings/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email us/i })).toHaveAttribute("href", expect.stringContaining("mailto:"));
  });
});
