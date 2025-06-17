import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageHeader from "./PageHeader";

describe("<PageHeader/>", () => {
  it('should display "Test"', () => {
    render(<PageHeader title="Test" />)

    expect(screen.getByTestId("page-header").textContent).toBe("Test")
  })


  it('should display ""', () => {
    render(<PageHeader title="" />)

    expect(screen.getByTestId("page-header").textContent).toBe("")
  })
})

