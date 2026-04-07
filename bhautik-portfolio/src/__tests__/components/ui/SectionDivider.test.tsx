import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import SectionDivider from "@/components/ui/SectionDivider";

describe("SectionDivider", () => {
  it("renders a div element", () => {
    const { container } = render(<SectionDivider />);
    expect(container.firstElementChild?.tagName).toBe("DIV");
  });

  it("has a 1px top border", () => {
    const { container } = render(<SectionDivider />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.borderTop).toContain("1px solid");
  });

  it("has 56px vertical margin", () => {
    const { container } = render(<SectionDivider />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.margin).toBe("56px 0px");
  });

  it("applies custom className", () => {
    const { container } = render(<SectionDivider className="custom" />);
    expect(container.firstElementChild).toHaveClass("custom");
  });
});
