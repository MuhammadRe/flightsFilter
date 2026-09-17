import airportsData from "@/lib/data/airports.json";
import flightsData from "@/lib/data/flights-from-AMS.json";
import { buildAirportIndex, toAirportOptions } from "@/lib/airports";
import { filterFlights } from "@/lib/filterFlights";
import { enrichFlights } from "@/lib/enrichFlights";
import { getDepartureDateRange } from "@/lib/dateRange";
import FlightSearchForm from "@/components/FlightSearchForm";
import FlightResults from "@/components/FlightResults";
import type { Airport, FlightsFromAMSData } from "@/lib/types";

type SearchParams = Promise<{
  origin?: string;
  destination?: string;
  departureDate?: string;
}>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { origin, destination, departureDate } = await searchParams;

  const airports = (airportsData as { Airports: Airport[] }).Airports;
  const offers = (flightsData as FlightsFromAMSData).flightOffer;

  const airportIndex = buildAirportIndex(airports);
  const options = toAirportOptions(airports);
  const dateRange = getDepartureDateRange(offers);

  const hasSearched = Boolean(destination || departureDate);
  const results = hasSearched
    ? enrichFlights(
        filterFlights(offers, { origin, destination, departureDate }),
        airportIndex,
      )
    : [];

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 p-6">
      <div className="flex items-center gap-2">
        <span className="text-lg font-medium text-gray-900">Transavia</span>
        <span className="text-sm text-gray-500">flight search</span>
      </div>
      <FlightSearchForm
        options={options}
        minDate={dateRange?.min}
        maxDate={dateRange?.max}
      />
      {hasSearched && <FlightResults flights={results} />}
    </main>
  );
}
