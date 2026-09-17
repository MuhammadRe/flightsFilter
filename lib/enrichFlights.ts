import type { FlightOffer, Flight } from "./types";

function durationInMinutes(departISO: string, arriveISO: string): number {
  const ms = new Date(arriveISO).getTime() - new Date(departISO).getTime();
  return Math.round(ms / 60000);
}

export function enrichFlights(
  offers: FlightOffer[],
  airportIndex: Map<string, string>,
): Flight[] {
  return offers.map((offer) => {
    const f = offer.outboundFlight;
    const fromCode = f.departureAirport.locationCode;
    const toCode = f.arrivalAirport.locationCode;
    return {
      id: f.id,
      from: airportIndex.get(fromCode) ?? fromCode,
      fromCode,
      to: airportIndex.get(toCode) ?? toCode,
      toCode,
      departsAt: f.departureDateTime,
      arrivesAt: f.arrivalDateTime,
      durationMinutes: durationInMinutes(
        f.departureDateTime,
        f.arrivalDateTime,
      ),
      airlineCode: f.marketingAirline.companyShortName,
      flightNumber: f.flightNumber,
      price: offer.pricingInfoSum.totalPriceAllPassengers,
      currency: offer.pricingInfoSum.currencyCode,
    };
  });
}
