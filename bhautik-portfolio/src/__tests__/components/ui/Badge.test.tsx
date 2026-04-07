import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>Hello</Badge>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    render(<Badge>Test</Badge>);
    expect(screen.getByText("Test").tagName).toBe("SPAN");
  });

  it("applies default variant styles", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge.style.backgroundColor).toBe("rgb(249, 248, 246)"); // #F9F8F6
  });

  it("applies accent variant styles", () => {
    render(<Badge variant="accent">Accent</Badge>);
    const badge = screen.getByText("Accent");
    expect(badge.style.backgroundColor).toBe("rgb(234, 243, 238)"); // #EAF3EE
    expect(badge.style.color).toBe("rgb(45, 106, 79)"); // #2D6A4F
  });

  it("applies outline variant styles", () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText("Outline");
    expect(badge.style.backgroundColor).toBe("transparent");
  });

  it("applies custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText("Custom")).toHaveClass("custom-class");
  });

  it("renders uppercase text", () => {
    render(<Badge>Test</Badge>);
    expect(screen.getByText("Test").style.textTransform).toBe("uppercase");
  });
});
