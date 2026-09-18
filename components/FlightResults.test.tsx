import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import FlightResults from "./FlightResults";
import type { Flight } from "@/lib/types";

const flight: Flight = {
  id: "AMSAGP1",
  from: "Amsterdam",
  fromCode: "AMS",
  to: "Malaga",
  toCode: "AGP",
  departsAt: "2022-11-10T06:25:00",
  arrivesAt: "2022-11-10T09:35:00",
  durationMinutes: 190,
  airlineCode: "HV",
  flightNumber: 6629,
  price: 58.7,
  currency: "EUR",
};

describe("FlightResults", () => {
  test("shows an empty state when there are no flights", () => {
    render(<FlightResults flights={[]} />);
    expect(screen.getByText(/no flights found/i)).toBeInTheDocument();
  });

  test("renders resolved names, times and price", () => {
    render(<FlightResults flights={[flight]} />);
    expect(
      screen.getByRole("heading", { name: "Amsterdam → Malaga" }),
    ).toBeInTheDocument();
    expect(screen.getByText("06:25")).toBeInTheDocument();
    expect(screen.getByText(/58,70/)).toBeInTheDocument();
    expect(screen.getByText("HV 6629")).toBeInTheDocument();
  });

  test("shows a generic header and per-flight destination names when results span multiple destinations", () => {
    const otherFlight: Flight = {
      ...flight,
      id: "AMSBCN1",
      to: "Barcelona",
      toCode: "BCN",
    };
    render(<FlightResults flights={[flight, otherFlight]} />);
    expect(
      screen.getByRole("heading", { name: "Flights from Amsterdam" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Malaga")).toBeInTheDocument();
    expect(screen.getByText("Barcelona")).toBeInTheDocument();
  });
});
