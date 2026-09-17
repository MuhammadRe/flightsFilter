import type { Airport, AirportOption } from "./types";

export function buildAirportIndex(airports: Airport[]): Map<string, string> {
  const index = new Map<string, string>();
  for (const airport of airports) {
    index.set(airport.ItemName, airport.AirportName);
  }
  return index;
}

export function toAirportOptions(airports: Airport[]): AirportOption[] {
  return airports
    .map((airport) => ({ code: airport.ItemName, name: airport.AirportName }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
