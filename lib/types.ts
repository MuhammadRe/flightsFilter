// ---------------------------------------------------------------------------
// Raw JSON shapes — mirror app/lib/data/*.json field-for-field, including
// casing (e.g. Airport's PascalCase). Don't "clean these up"; they're a
// truthful contract with data files we don't control. Only the boundary
// functions below (buildAirportIndex, toAirportOptions, enrichFlights)
// should read their fields directly — everything else should consume the
// domain types further down.
// ---------------------------------------------------------------------------

export interface Airport {
  ItemName: string;
  AirportName: string;
  Description: string;
}

export interface AirportsData {
  Airports: Airport[];
}

export interface MarketingAirline {
  companyShortName: string;
}

export interface FlightLocation {
  locationCode: string;
}

export interface OutboundFlight {
  id: string;
  departureDateTime: string;
  arrivalDateTime: string;
  marketingAirline: MarketingAirline;
  flightNumber: number;
  departureAirport: FlightLocation;
  arrivalAirport: FlightLocation;
}

export interface PricingInfoSum {
  totalPriceAllPassengers: number;
  totalPriceOnePassenger: number;
  baseFare: number;
  taxSurcharge: number;
  currencyCode: string;
  productClass: string;
}

export interface Deeplink {
  href: string;
}

export interface FlightOffer {
  outboundFlight: OutboundFlight;
  pricingInfoSum: PricingInfoSum;
  deeplink: Deeplink;
}

export interface ResultSet {
  count: number;
}

export interface FlightsFromAMSData {
  resultSet: ResultSet;
  flightOffer: FlightOffer[];
}

// ---------------------------------------------------------------------------
// Domain types — normalized, camelCase shapes the app/UI actually consumes.
// Produced from the raw types above by a single boundary function each
// (toAirportOptions, enrichFlights) so the rest of the app never has to
// know the raw JSON's field names or casing.
// ---------------------------------------------------------------------------

export interface AirportOption {
  code: string;
  name: string;
}

export interface Flight {
  id: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departsAt: string;
  arrivesAt: string;
  durationMinutes: number;
  airlineCode: string;
  flightNumber: number;
  price: number;
  currency: string;
}
