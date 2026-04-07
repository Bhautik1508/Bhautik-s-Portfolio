import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Divider from "@/components/ui/Divider";

describe("Divider", () => {
  it("renders an <hr> element", () => {
    const { container } = render(<Divider />);
    const hr = container.querySelector("hr");
    expect(hr).toBeInTheDocument();
  });

  it("has a top border style", () => {
    const { container } = render(<Divider />);
    const hr = container.querySelector("hr")!;
    // jsdom converts hex to rgb format
    expect(hr.style.borderTop).toContain("1px solid");
  });

  it("has margin set to 0", () => {
    const { container } = render(<Divider />);
    const hr = container.querySelector("hr")!;
    expect(hr.style.margin).toBe("0px");
  });

  it("applies custom className", () => {
    const { container } = render(<Divider className="my-divider" />);
    expect(container.querySelector("hr")).toHaveClass("my-divider");
  });
});
