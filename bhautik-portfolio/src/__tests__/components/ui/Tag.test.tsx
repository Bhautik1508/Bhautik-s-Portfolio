import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Tag from "@/components/ui/Tag";

describe("Tag", () => {
  it("renders children text", () => {
    render(<Tag>React</Tag>);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    render(<Tag>TypeScript</Tag>);
    expect(screen.getByText("TypeScript").tagName).toBe("SPAN");
  });

  it("applies base Tailwind classes", () => {
    render(<Tag>Test</Tag>);
    const tag = screen.getByText("Test");
    expect(tag).toHaveClass("inline-flex");
    expect(tag).toHaveClass("rounded-md");
    expect(tag).toHaveClass("text-xs");
  });

  it("applies custom className", () => {
    render(<Tag className="extra">Tag</Tag>);
    expect(screen.getByText("Tag")).toHaveClass("extra");
  });
});
