import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FadeUp from "@/components/ui/FadeUp";

describe("FadeUp", () => {
  it("renders children", () => {
    render(<FadeUp><p>Hello world</p></FadeUp>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders content inside a div", () => {
    render(<FadeUp><span>Content</span></FadeUp>);
    const span = screen.getByText("Content");
    // Parent should be a div (the mocked motion.div renders as <div>)
    expect(span.parentElement?.tagName).toBe("DIV");
  });

  it("applies custom className", () => {
    const { container } = render(<FadeUp className="fade-custom">Hi</FadeUp>);
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass("fade-custom");
  });

  it("renders multiple children", () => {
    render(
      <FadeUp>
        <p>First</p>
        <p>Second</p>
      </FadeUp>
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });
});
