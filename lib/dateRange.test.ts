import { describe, test, expect } from "vitest";
import { getDepartureDateRange } from "./dateRange";
import type { FlightOffer } from "./types";

function offer(departureDateTime: string): FlightOffer {
  return {
    outboundFlight: { departureDateTime },
  } as FlightOffer;
}

describe("getDepartureDateRange", () => {
  test("returns the earliest and latest departure date", () => {
    const range = getDepartureDateRange([
      offer("2022-11-15T09:00:00"),
      offer("2022-11-10T06:25:00"),
      offer("2022-11-20T14:10:00"),
    ]);

    expect(range).toEqual({ min: "2022-11-10", max: "2022-11-20" });
  });

  test("ignores time of day", () => {
    const range = getDepartureDateRange([
      offer("2022-11-10T23:59:00"),
      offer("2022-11-10T00:01:00"),
    ]);

    expect(range).toEqual({ min: "2022-11-10", max: "2022-11-10" });
  });

  test("returns null for an empty list", () => {
    expect(getDepartureDateRange([])).toBeNull();
  });
});
