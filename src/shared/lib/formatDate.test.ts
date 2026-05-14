import {
  formatCurrentDateTime,
  formatForecastDay,
  formatForecastTime
} from "./formatDate";

describe("Figma date formatters", () => {
  it("formats forecast days", () => {
    expect(formatForecastDay("2026-05-23")).toBe("May 23");
  });

  it("formats forecast time", () => {
    expect(formatForecastTime("2026-05-22T18:00:00.000Z", 9 * 60 * 60)).toBe(
      "03:00am"
    );
  });

  it("formats current date time", () => {
    expect(
      formatCurrentDateTime("2026-05-22T18:00:00.000Z", 9 * 60 * 60)
    ).toBe("May 23. 03:00am");
  });

  it("uses the provided timezone offset instead of the browser timezone", () => {
    expect(
      formatCurrentDateTime("2026-05-23T23:00:00.000Z", -4 * 60 * 60)
    ).toBe("May 23. 07:00pm");
  });
});
