import type { DailyForecast, ForecastPoint } from "@/4_shared/types/weather";

function toLocalDateKey(timestamp: string, timezoneOffsetSeconds: number) {
  const localTime =
    new Date(timestamp).getTime() + timezoneOffsetSeconds * 1000;

  return new Date(localTime).toISOString().slice(0, 10);
}

export function groupForecastByDay(
  points: ForecastPoint[],
  timezoneOffsetSeconds = 0
): DailyForecast[] {
  const groups = new Map<string, ForecastPoint[]>();

  points.forEach((point) => {
    const dateKey = toLocalDateKey(point.timestamp, timezoneOffsetSeconds);
    const dayPoints = groups.get(dateKey) ?? [];
    dayPoints.push(point);
    groups.set(dateKey, dayPoints);
  });

  return Array.from(groups.entries())
    .map(([date, dayPoints]) => {
      const sortedPoints = [...dayPoints].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      const temperatures = sortedPoints.map((point) => point.temperature);
      const representative =
        sortedPoints[Math.floor(sortedPoints.length / 2)] ?? sortedPoints[0];

      return {
        date,
        points: sortedPoints,
        minTemperature: Math.min(...temperatures),
        maxTemperature: Math.max(...temperatures),
        representativeDescription: representative?.description ?? "예보 없음",
        timezoneOffsetSeconds
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);
}
