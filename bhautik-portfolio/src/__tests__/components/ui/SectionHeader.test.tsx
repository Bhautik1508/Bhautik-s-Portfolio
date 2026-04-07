import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionHeader from "@/components/ui/SectionHeader";

describe("SectionHeader", () => {
  const defaultProps = {
    label: "Test Label",
    heading: "Test Heading",
  };

  it("renders the label badge", () => {
    render(<SectionHeader {...defaultProps} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders the heading as an h2", () => {
    render(<SectionHeader {...defaultProps} />);
    const heading = screen.getByText("Test Heading");
    expect(heading.tagName).toBe("H2");
  });

  it("renders subtext when provided", () => {
    render(<SectionHeader {...defaultProps} subtext="Some subtext" />);
    expect(screen.getByText("Some subtext")).toBeInTheDocument();
  });

  it("does not render subtext paragraph when omitted", () => {
    const { container } = render(<SectionHeader {...defaultProps} />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs.length).toBe(0);
  });

  it("centres text", () => {
    const { container } = render(<SectionHeader {...defaultProps} />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.textAlign).toBe("center");
  });

  it("applies custom className", () => {
    const { container } = render(
      <SectionHeader {...defaultProps} className="custom-header" />
    );
    expect(container.firstElementChild).toHaveClass("custom-header");
  });
});
