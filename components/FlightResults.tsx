import type { Flight } from "@/lib/types";

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency }).format(
    price,
  );
}

const time = (iso: string) => iso.slice(11, 16);

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function formatHeaderDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso.slice(0, 10)));
}

function formatRowDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(new Date(iso.slice(0, 10)));
}

const dateOnly = (iso: string) => iso.slice(0, 10);

interface FlightResultsProps {
  flights: Flight[];
}

export default function FlightResults({ flights }: FlightResultsProps) {
  if (flights.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <p className="font-medium text-gray-900">No flights found</p>
        <p className="mt-1 text-sm text-gray-500">
          Try a different destination or date.
        </p>
      </div>
    );
  }

  const first = flights[0];
  const isSingleDestination = flights.every(
    (flight) => flight.toCode === first.toCode,
  );
  const isSingleDate = flights.every(
    (flight) => dateOnly(flight.departsAt) === dateOnly(first.departsAt),
  );

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h2 className="font-medium text-gray-900">
          {isSingleDestination ? (
            <>
              {first.from} <span className="text-gray-400">→</span>{" "}
              {first.to}
            </>
          ) : (
            <>Flights from {first.from}</>
          )}
        </h2>
        <span className="text-sm text-gray-500">
          {flights.length} {flights.length === 1 ? "flight" : "flights"}
          {isSingleDate && <> · {formatHeaderDate(first.departsAt)}</>}
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {flights.map((flight) => (
          <li
            key={flight.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4"
          >
            <div className="flex items-center gap-5">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-900">
                  {time(flight.departsAt)}
                </div>
                <div className="text-xs text-gray-400">{flight.fromCode}</div>
                {!isSingleDate && (
                  <div className="text-xs text-gray-400">
                    {formatRowDate(flight.departsAt)}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center text-gray-400">
                <span>→</span>
                <span className="mt-0.5 text-xs">
                  {formatDuration(flight.durationMinutes)}
                </span>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-gray-900">
                  {time(flight.arrivesAt)}
                </div>
                <div className="text-xs text-gray-400">{flight.toCode}</div>
              </div>
            </div>
            <div className="text-right">
              {!isSingleDestination && (
                <div className="text-sm font-medium text-gray-900">
                  {flight.to}
                </div>
              )}
              <div className="text-lg font-medium text-gray-900">
                {formatPrice(flight.price, flight.currency)}
              </div>
              <div className="text-xs text-gray-400">
                {flight.airlineCode} {flight.flightNumber}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
