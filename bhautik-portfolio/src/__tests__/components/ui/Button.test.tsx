import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Button from "@/components/ui/Button";

function renderButton(props: React.ComponentProps<typeof Button>) {
  return render(
    <BrowserRouter>
      <Button {...props} />
    </BrowserRouter>
  );
}

describe("Button", () => {
  /* ── Rendering ── */

  it("renders children text", () => {
    renderButton({ children: "Click me" });
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders as <button> by default", () => {
    renderButton({ children: "Btn" });
    expect(screen.getByText("Btn").tagName).toBe("BUTTON");
  });

  it("renders as <a> when href is provided", () => {
    renderButton({ children: "Link", href: "https://example.com" });
    const link = screen.getByText("Link");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  /* ── Variants ── */

  it("applies primary variant styles by default", () => {
    renderButton({ children: "Primary" });
    const btn = screen.getByText("Primary");
    expect(btn.style.backgroundColor).toBe("rgb(45, 106, 79)"); // #2D6A4F
    expect(btn.style.color).toBe("rgb(255, 255, 255)");
  });

  it("applies ghost variant styles", () => {
    renderButton({ children: "Ghost", variant: "ghost" });
    const btn = screen.getByText("Ghost");
    expect(btn.style.backgroundColor).toBe("transparent");
  });

  it("applies outline variant styles", () => {
    renderButton({ children: "Outline", variant: "outline" });
    const btn = screen.getByText("Outline");
    expect(btn.style.backgroundColor).toBe("rgb(255, 255, 255)");
  });

  /* ── Sizes ── */

  it("applies sm size padding", () => {
    renderButton({ children: "Small", size: "sm" });
    expect(screen.getByText("Small").style.padding).toBe("6px 12px");
  });

  it("applies md size padding by default", () => {
    renderButton({ children: "Medium" });
    expect(screen.getByText("Medium").style.padding).toBe("8px 16px");
  });

  /* ── Disabled ── */

  it("sets disabled attribute on button", () => {
    renderButton({ children: "Disabled", disabled: true });
    expect(screen.getByText("Disabled")).toBeDisabled();
  });

  it("sets not-allowed cursor when disabled", () => {
    renderButton({ children: "No click", disabled: true });
    expect(screen.getByText("No click").style.cursor).toBe("not-allowed");
  });

  /* ── Events ── */

  it("calls onClick when clicked", () => {
    const handler = vi.fn();
    renderButton({ children: "Clicky", onClick: handler });
    fireEvent.click(screen.getByText("Clicky"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not fire click when disabled", () => {
    const handler = vi.fn();
    renderButton({ children: "Nope", onClick: handler, disabled: true });
    fireEvent.click(screen.getByText("Nope"));
    expect(handler).not.toHaveBeenCalled();
  });

  /* ── className ── */

  it("passes className to the element", () => {
    renderButton({ children: "Styled", className: "my-class" });
    expect(screen.getByText("Styled")).toHaveClass("my-class");
  });

  /* ── Link props ── */

  it("passes target and rel to anchor element", () => {
    renderButton({
      children: "External",
      href: "https://x.com",
      target: "_blank",
      rel: "noopener",
    });
    const link = screen.getByText("External");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });
});
