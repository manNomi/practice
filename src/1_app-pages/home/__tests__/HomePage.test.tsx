import { render, screen } from "@testing-library/react";
import { HomePage } from "../HomePage";

describe("HomePage", () => {
  it("renders city links for the assignment routes", () => {
    render(<HomePage />);

    expect(screen.getByRole("link", { name: /Seoul/i })).toHaveAttribute(
      "href",
      "/Seoul"
    );
    expect(screen.getByRole("link", { name: /Tokyo/i })).toHaveAttribute(
      "href",
      "/Tokyo"
    );
    expect(screen.getByRole("link", { name: /Paris/i })).toHaveAttribute(
      "href",
      "/Paris"
    );
    expect(screen.getByRole("link", { name: /London/i })).toHaveAttribute(
      "href",
      "/London"
    );
  });
});
