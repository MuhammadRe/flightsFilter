import type { FlightOffer } from "./types";

export interface FlightCriteria {
  origin?: string;
  destination?: string;
  departureDate?: string;
}

export function filterFlights(
  offers: FlightOffer[],
  criteria: FlightCriteria,
): FlightOffer[] {
  const { origin, destination, departureDate } = criteria;

  return offers.filter((offer) => {
    const flight = offer.outboundFlight;
    const originMatches =
      !origin || flight.departureAirport.locationCode === origin;
    const destinationMatches =
      !destination || flight.arrivalAirport.locationCode === destination;
    const dateMatches =
      !departureDate || flight.departureDateTime.slice(0, 10) === departureDate;

    return originMatches && destinationMatches && dateMatches;
  });
}
