import { describe, test, expect } from "vitest";
import { buildAirportIndex, toAirportOptions } from "./airports";
import type { Airport } from "./types";

const airports: Airport[] = [
  { ItemName: "AMS", AirportName: "Amsterdam", Description: "" },
  { ItemName: "AGP", AirportName: "Malaga", Description: "" },
  { ItemName: "BCN", AirportName: "Barcelona", Description: "" },
];

describe("buildAirportIndex", () => {
  test("maps each airport code to its name", () => {
    const index = buildAirportIndex(airports);

    expect(index.get("AMS")).toBe("Amsterdam");
    expect(index.get("AGP")).toBe("Malaga");
    expect(index.get("BCN")).toBe("Barcelona");
  });

  test("returns a Map sized to the number of airports", () => {
    const index = buildAirportIndex(airports);

    expect(index.size).toBe(3);
  });

  test("returns undefined for an unknown code", () => {
    const index = buildAirportIndex(airports);

    expect(index.get("XXX")).toBeUndefined();
  });

  test("returns an empty Map for an empty input", () => {
    const index = buildAirportIndex([]);

    expect(index.size).toBe(0);
  });

  test("keeps the last entry when a code is duplicated", () => {
    const withDuplicate: Airport[] = [
      { ItemName: "AGP", AirportName: "Malaga", Description: "" },
      { ItemName: "AGP", AirportName: "Malaga Airport", Description: "" },
    ];

    const index = buildAirportIndex(withDuplicate);

    expect(index.get("AGP")).toBe("Malaga Airport");
  });
});
describe("toAirportOptions", () => {
  const airports: Airport[] = [
    { ItemName: "BCN", AirportName: "Barcelona", Description: "" },
    { ItemName: "AMS", AirportName: "Amsterdam", Description: "" },
    { ItemName: "AGP", AirportName: "Malaga", Description: "" },
  ];

  test("maps each airport to a { code, name } option", () => {
    const options = toAirportOptions(airports);

    expect(options).toContainEqual({ code: "AMS", name: "Amsterdam" });
    expect(options).toContainEqual({ code: "AGP", name: "Malaga" });
  });

  test("sorts options alphabetically by name", () => {
    const options = toAirportOptions(airports);

    expect(options.map((o) => o.name)).toEqual([
      "Amsterdam",
      "Barcelona",
      "Malaga",
    ]);
  });

  test("does not mutate the input array", () => {
    const input: Airport[] = [
      { ItemName: "BCN", AirportName: "Barcelona", Description: "" },
      { ItemName: "AMS", AirportName: "Amsterdam", Description: "" },
    ];
    toAirportOptions(input);

    expect(input[0].ItemName).toBe("BCN");
  });

  test("returns an empty array for empty input", () => {
    expect(toAirportOptions([])).toEqual([]);
  });
});
