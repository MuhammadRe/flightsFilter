import type { FlightOffer } from "./types";

export interface DateRange {
  min: string;
  max: string;
}

/* Derives the earliest and latest departure date (YYYY-MM-DD) present in a
 * set of offers, so UI bounds (e.g. a date picker) stay in sync with the
 * actual data instead of being hardcoded.
 */
export function getDepartureDateRange(offers: FlightOffer[]): DateRange | null {
  if (offers.length === 0) return null;

  const dates = offers.map((offer) =>
    offer.outboundFlight.departureDateTime.slice(0, 10),
  );

  return {
    min: dates.reduce((earliest, date) => (date < earliest ? date : earliest)),
    max: dates.reduce((latest, date) => (date > latest ? date : latest)),
  };
}
