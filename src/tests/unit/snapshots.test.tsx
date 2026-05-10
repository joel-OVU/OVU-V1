/**
 * Snapshot Tests — OVU Design System Components
 *
 * WHY SNAPSHOTS?
 * Each test renders a component and captures its HTML output as a `.snap` file
 * stored in `__snapshots__/`. On every subsequent run, Vitest diffs the current
 * output against the stored snapshot. If they differ, the test fails — alerting
 * you to an unintended visual or structural change.
 *
 * UPDATING SNAPSHOTS:
 * If a change is intentional (e.g. copy update, class change), run:
 *   npm run test -- --update-snapshots
 * This overwrites the stored snapshots with the new output.
 *
 * WHAT IS COVERED:
 * - All atoms: SectionTag, StatBlock, ExclusionChip, ScrollIndicator
 * - All molecules: ServiceCard, FaqCard, CaseStudyCard, FooterColumn,
 *                  BenefitItem, Testimonial, MidPageCta
 */
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckCircle } from "lucide-react";

// --- Atoms ---
import SectionTag from "@/src/components/atoms/SectionTag/SectionTag";
import StatBlock from "@/src/components/atoms/StatBlock/StatBlock";
import ExclusionChip from "@/src/components/atoms/ExclusionChip/ExclusionChip";
import ScrollIndicator from "@/src/components/atoms/ScrollIndicator/ScrollIndicator";

// --- Molecules ---
import ServiceCard from "@/src/components/molecules/ServiceCard/ServiceCard";
import FaqCard from "@/src/components/molecules/FaqCard/FaqCard";
import CaseStudyCard from "@/src/components/molecules/CaseStudyCard/CaseStudyCard";
import FooterColumn from "@/src/components/molecules/FooterColumn/FooterColumn";
import BenefitItem from "@/src/components/molecules/BenefitItem/BenefitItem";
import Testimonial from "@/src/components/molecules/Testimonial/Testimonial";
import MidPageCta from "@/src/components/molecules/MidPageCta/MidPageCta";

// ---------------------------------------------------------------------------
// ATOMS
// ---------------------------------------------------------------------------
describe("Atom Snapshots", () => {
  it("SectionTag — default styling", () => {
    const { asFragment } = render(<SectionTag>OVU Focus</SectionTag>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("SectionTag — custom className override", () => {
    const { asFragment } = render(
      <SectionTag className="text-sm text-ink">Custom Class</SectionTag>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("StatBlock — renders value and label", () => {
    const { asFragment } = render(
      <StatBlock value="£1.2M+" label="Revenue generated" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("ExclusionChip — renders label with X icon", () => {
    const { asFragment } = render(<ExclusionChip label="SEO" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("ScrollIndicator — renders motion scroll hint", () => {
    const { asFragment } = render(<ScrollIndicator />);
    expect(asFragment()).toMatchSnapshot();
  });
});

// ---------------------------------------------------------------------------
// MOLECULES
// ---------------------------------------------------------------------------
describe("Molecule Snapshots", () => {
  it("ServiceCard — closed state (default)", () => {
    const { asFragment } = render(
      <ServiceCard
        title="Funnel Engineering"
        desc="High-performance acquisition via Meta and Google."
        details="Includes precise audience targeting, creative testing, and attribution setup."
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("FaqCard — renders question and answer", () => {
    const { asFragment } = render(
      <FaqCard
        question="How fast will the protocol deliver results?"
        answer="Timelines depend on your current setup, traffic, and offer."
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("CaseStudyCard — renders with image, metric, and title", () => {
    const { asFragment } = render(
      <CaseStudyCard
        id="cs-test"
        image="https://images.unsplash.com/photo-1600880292203?w=800"
        title="Global Property Collective"
        metric="£480K"
        description="A 90-day funnel rebuild that generated £480K in revenue."
        className="md:col-span-8 h-[500px]"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("FooterColumn — renders heading and links", () => {
    const { asFragment } = render(
      <FooterColumn
        heading="Protocol"
        links={[
          { label: "Services", href: "#services" },
          { label: "FAQ", href: "#faq" },
        ]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("BenefitItem — renders icon, title and description", () => {
    const { asFragment } = render(
      <BenefitItem
        icon={CheckCircle}
        title="Conversion Audit"
        description="We map every friction point in your current funnel."
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("Testimonial — renders quote, initials, name and role", () => {
    const { asFragment } = render(
      <Testimonial
        quote="OVU transformed our enquiry pipeline completely."
        initials="SC"
        name="Sarah Collins"
        role="Director, Kensington Suites"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("MidPageCta — light variant (default)", () => {
    const { asFragment } = render(
      <MidPageCta
        heading="Ready to scale?"
        body="Join the OVU partner programme today."
        cta="Book a call"
        href="#contact"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("MidPageCta — dark variant", () => {
    const { asFragment } = render(
      <MidPageCta
        heading="The OVU Protocol"
        body="Built for businesses that are serious about growth."
        cta="Learn more"
        href="#features"
        variant="dark"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
