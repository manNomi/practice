import type { ForecastPoint } from "@/shared/types/weather";
import { groupForecastByDay } from "../groupForecastByDay";

const point = (
  timestamp: string,
  temperature: number,
  description = "clear sky"
): ForecastPoint => ({
  timestamp,
  temperature,
  humidity: 40,
  description,
  iconCode: "01d",
  precipitationProbability: 0
});

describe("groupForecastByDay", () => {
  it("groups forecast points by local city day", () => {
    const result = groupForecastByDay(
      [
        point("2026-05-14T21:00:00.000Z", 12),
        point("2026-05-15T00:00:00.000Z", 16),
        point("2026-05-15T21:00:00.000Z", 18)
      ],
      9 * 60 * 60
    );

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      date: "2026-05-15",
      minTemperature: 12,
      maxTemperature: 16,
      timezoneOffsetSeconds: 9 * 60 * 60
    });
    expect(result[1]?.date).toBe("2026-05-16");
  });

  it("returns at most five days", () => {
    const points = Array.from({ length: 6 }, (_, index) =>
      point(`2026-05-${String(10 + index).padStart(2, "0")}T00:00:00.000Z`, 20)
    );

    expect(groupForecastByDay(points)).toHaveLength(5);
  });
});
