import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import type { ReactNode } from "react";

interface MockFormProps {
  children: ReactNode;
  action?: string;
}

vi.mock("next/form", () => ({
  default: ({ children, action, ...props }: MockFormProps) => (
    <form action={typeof action === "string" ? action : undefined} {...props}>
      {children}
    </form>
  ),
}));

import FlightSearchForm from "./FlightSearchForm";

const options = [
  { code: "AGP", name: "Malaga" },
  { code: "BCN", name: "Barcelona" },
];

describe("FlightSearchForm", () => {
  test("renders the three fields and a submit button", () => {
    render(<FlightSearchForm options={options} />);
    expect(screen.getByText("Origin")).toBeInTheDocument();
    expect(screen.getByText("Destination")).toBeInTheDocument();
    expect(screen.getByText("Departure date")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /search flights/i }),
    ).toBeInTheDocument();
  });

  test("renders an option per destination", () => {
    render(<FlightSearchForm options={options} />);
    expect(
      screen.getByRole("option", { name: "Malaga (AGP)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Barcelona (BCN)" }),
    ).toBeInTheDocument();
  });
});
