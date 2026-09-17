import { describe, test, expect } from "vitest";
import { enrichFlights } from "./enrichFlights";
import type { FlightOffer } from "./types";

function offer(from: string, to: string): FlightOffer {
  return {
    outboundFlight: {
      id: `${from}${to}123`,
      departureDateTime: "2022-11-10T06:25:00",
      arrivalDateTime: "2022-11-10T09:35:00",
      departureAirport: { locationCode: from },
      arrivalAirport: { locationCode: to },
      marketingAirline: { companyShortName: "HV" },
      flightNumber: 123,
    },
    pricingInfoSum: { totalPriceAllPassengers: 58.7, currencyCode: "EUR" },
  } as FlightOffer;
}

const index = new Map([
  ["AMS", "Amsterdam"],
  ["AGP", "Malaga"],
]);

describe("enrichFlights", () => {
  test("resolves airport codes to names and keeps codes", () => {
    const [flight] = enrichFlights([offer("AMS", "AGP")], index);
    expect(flight.from).toBe("Amsterdam");
    expect(flight.to).toBe("Malaga");
    expect(flight.fromCode).toBe("AMS");
    expect(flight.toCode).toBe("AGP");
  });

  test("maps id, price, currency and times", () => {
    const [flight] = enrichFlights([offer("AMS", "AGP")], index);
    expect(flight.id).toBe("AMSAGP123");
    expect(flight.price).toBe(58.7);
    expect(flight.currency).toBe("EUR");
    expect(flight.departsAt).toBe("2022-11-10T06:25:00");
    expect(flight.arrivesAt).toBe("2022-11-10T09:35:00");
  });

  test("maps airline code and flight number", () => {
    const [flight] = enrichFlights([offer("AMS", "AGP")], index);
    expect(flight.airlineCode).toBe("HV");
    expect(flight.flightNumber).toBe(123);
  });

  test("falls back to the code when the airport is unknown", () => {
    const [flight] = enrichFlights([offer("AMS", "ZZZ")], index);
    expect(flight.to).toBe("ZZZ");
  });

  test("returns an empty array for no offers", () => {
    expect(enrichFlights([], index)).toEqual([]);
  });
  test("computes duration in minutes from departure and arrival", () => {
    const [flight] = enrichFlights([offer("AMS", "AGP")], index);
    // 06:25 → 09:35 = 3h 10m = 190 minutes
    expect(flight.durationMinutes).toBe(190);
  });
});
