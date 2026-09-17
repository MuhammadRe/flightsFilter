import Form from "next/form";
import type { AirportOption } from "@/lib/types";

interface FlightSearchFormProps {
  options: AirportOption[];
  minDate?: string;
  maxDate?: string;
}

export default function FlightSearchForm({
  options,
  minDate,
  maxDate,
}: FlightSearchFormProps) {
  return (
    <Form action="/" className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-sm text-gray-600">
          Origin
          <select
            name="origin"
            defaultValue="AMS"
            className="h-10 rounded-md border border-gray-300 px-3 text-gray-900"
          >
            <option value="AMS">Amsterdam (AMS)</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-gray-600">
          Destination
          <select
            name="destination"
            defaultValue=""
            className="h-10 rounded-md border border-gray-300 px-3 text-gray-900"
          >
            <option value="">Select destination</option>
            {options.map((o) => (
              <option key={o.code} value={o.code}>
                {o.name} ({o.code})
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-gray-600">
          Departure date
          <input
            type="date"
            name="departureDate"
            min={minDate}
            max={maxDate}
            className="h-10 rounded-md border border-gray-300 px-3 text-gray-900"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-4 h-11 w-full rounded-md bg-brand font-medium text-white hover:bg-brand-hover"
      >
        Search flights
      </button>
    </Form>
  );
}
