import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CookieConsent from "@/src/components/organisms/CookieConsent/CookieConsent";
import { CONSENT_KEY, PREFERENCES_KEY, openCookieSettings } from "@/src/lib/consent";

const { applyConsent } = vi.hoisted(() => ({ applyConsent: vi.fn(() => false) }));
vi.mock("@/src/lib/tracking", () => ({ applyConsent, activateTracking: vi.fn() }));

describe("CookieConsent", () => {
  beforeEach(() => {
    window.localStorage.clear();
    applyConsent.mockClear();
  });

  it("shows the banner when no decision is stored", () => {
    render(<CookieConsent />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-live", "polite");
    expect(screen.getByRole("button", { name: "Accept All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reject All" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/privacy-policy");
  });

  it("stays hidden when a decision already exists", () => {
    window.localStorage.setItem(CONSENT_KEY, "rejected");
    render(<CookieConsent />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("gives Accept All and Reject All identical styling", () => {
    render(<CookieConsent />);
    expect(screen.getByRole("button", { name: "Accept All" }).className).toBe(
      screen.getByRole("button", { name: "Reject All" }).className,
    );
  });

  it("stores 'accepted' and applies consent on Accept All", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(screen.getByRole("button", { name: "Accept All" }));
    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("accepted");
    expect(applyConsent).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("stores 'rejected' on Reject All", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(screen.getByRole("button", { name: "Reject All" }));
    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("rejected");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(JSON.parse(window.localStorage.getItem(PREFERENCES_KEY)!)).toMatchObject({
      analytics: false,
      marketing: false,
    });
  });

  it("opens preferences with every optional category unchecked", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    const manage = screen.getByRole("button", { name: "Manage Preferences" });
    expect(manage).toHaveAttribute("aria-expanded", "false");
    await user.click(manage);
    expect(manage).toHaveAttribute("aria-expanded", "true");

    for (const name of ["Functional", "Analytics", "Marketing"]) {
      expect(screen.getByRole("switch", { name })).not.toBeChecked();
    }
    const necessary = screen.getByRole("checkbox", { name: "Necessary" });
    expect(necessary).toBeChecked();
    expect(necessary).toBeDisabled();
  });

  it("saves custom preferences", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(screen.getByRole("button", { name: "Manage Preferences" }));
    await user.click(screen.getByRole("switch", { name: "Analytics" }));
    await user.click(screen.getByRole("button", { name: "Save Preferences" }));

    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("custom");
    expect(JSON.parse(window.localStorage.getItem(PREFERENCES_KEY)!)).toEqual({
      necessary: true,
      functional: false,
      analytics: true,
      marketing: false,
    });
    expect(applyConsent).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("re-opens with saved choices so consent can be withdrawn", async () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    render(<CookieConsent />);
    expect(screen.queryByRole("dialog")).toBeNull();

    act(() => openCookieSettings());
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: "Analytics" })).toBeChecked();
    expect(screen.getByRole("button", { name: /close cookie settings/i })).toBeInTheDocument();
  });
});
