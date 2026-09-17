import { filterFlights } from "./filterFlights";
import type { FlightOffer } from "./types";
import { describe, test, expect } from "vitest";

function offer(
  from: string,
  to: string,
  departureDateTime: string,
): FlightOffer {
  return {
    outboundFlight: {
      departureAirport: { locationCode: from },
      arrivalAirport: { locationCode: to },
      departureDateTime,
    },
  } as FlightOffer;
}

const offers: FlightOffer[] = [
  offer("AMS", "AGP", "2022-11-10T06:25:00"),
  offer("AMS", "BCN", "2022-11-10T14:10:00"),
  offer("AMS", "AGP", "2022-11-15T09:00:00"),
  offer("RTM", "AGP", "2022-11-10T08:00:00"), // different origin
];

describe("filterFlights", () => {
  test("returns all offers when criteria is empty", () => {
    expect(filterFlights(offers, {})).toHaveLength(4);
  });

  test("filters by destination", () => {
    const result = filterFlights(offers, { destination: "BCN" });
    expect(result).toHaveLength(1);
    expect(result[0].outboundFlight.arrivalAirport.locationCode).toBe("BCN");
  });

  test("filters by origin", () => {
    const result = filterFlights(offers, { origin: "AMS" });
    expect(result).toHaveLength(3);
    expect(
      result.every((o) => o.outboundFlight.departureAirport.locationCode === "AMS"),
    ).toBe(true);
  });

  test("filters by date, ignoring time of day", () => {
    const result = filterFlights(offers, { departureDate: "2022-11-10" });
    expect(result).toHaveLength(3);
    expect(
      result.every(
        (o) => o.outboundFlight.departureDateTime.slice(0, 10) === "2022-11-10",
      ),
    ).toBe(true);
  });

  test("combines origin, destination, and date", () => {
    const result = filterFlights(offers, {
      origin: "AMS",
      destination: "AGP",
      departureDate: "2022-11-10",
    });
    expect(result).toHaveLength(1);
    expect(result[0].outboundFlight.departureDateTime).toBe(
      "2022-11-10T06:25:00",
    );
  });

  test("returns [] when nothing matches", () => {
    const result = filterFlights(offers, { origin: "XXX" });
    expect(result).toEqual([]);
  });
});
