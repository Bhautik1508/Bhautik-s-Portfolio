import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";

// Wrap in MemoryRouter since motion.div doesn't need it but the test environment may
function renderPageWrapper(children: React.ReactNode) {
  return render(
    <MemoryRouter>
      <PageWrapper>{children}</PageWrapper>
    </MemoryRouter>
  );
}

describe("PageWrapper", () => {
  it("renders children", () => {
    const { getByText } = renderPageWrapper(<p>Hello World</p>);
    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("renders a motion.div wrapper", () => {
    const { container } = renderPageWrapper(<p>Content</p>);
    // framer-motion is mocked, so it renders as a plain div
    const wrapper = container.firstChild;
    expect(wrapper).toBeTruthy();
    expect(wrapper?.nodeName).toBe("DIV");
  });

  it("passes through multiple children", () => {
    const { getByText } = renderPageWrapper(
      <>
        <p>First</p>
        <p>Second</p>
      </>
    );
    expect(getByText("First")).toBeInTheDocument();
    expect(getByText("Second")).toBeInTheDocument();
  });
});
