import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatCard from "@/components/ui/StatCard";

describe("StatCard", () => {
  it("renders value and label", () => {
    render(<StatCard value="42" label="Projects" />);
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("applies light variant by default", () => {
    const { container } = render(<StatCard value="10" label="Items" />);
    const card = container.firstElementChild as HTMLElement;
    expect(card.style.backgroundColor).toBe("rgb(249, 248, 246)"); // #F9F8F6
  });

  it("applies dark variant styles", () => {
    const { container } = render(
      <StatCard value="10" label="Items" variant="dark" />
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card.style.backgroundColor).toBe("rgb(17, 17, 16)"); // #111110
  });

  it("value in dark variant has white text", () => {
    render(<StatCard value="5" label="Count" variant="dark" />);
    const value = screen.getByText("5");
    expect(value.style.color).toBe("rgb(255, 255, 255)");
  });

  it("value in light variant has dark text", () => {
    render(<StatCard value="5" label="Count" variant="light" />);
    const value = screen.getByText("5");
    expect(value.style.color).toBe("rgb(17, 17, 16)"); // #111110
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatCard value="1" label="X" className="stat-custom" />
    );
    expect(container.firstElementChild).toHaveClass("stat-custom");
  });

  it("renders label uppercase", () => {
    render(<StatCard value="1" label="test label" />);
    const label = screen.getByText("test label");
    expect(label.style.textTransform).toBe("uppercase");
  });
});
