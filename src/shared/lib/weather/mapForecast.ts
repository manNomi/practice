import type {
  DailyForecast,
  ForecastPoint,
  OpenWeatherForecastResponse
} from "@/shared/types/weather";
import { groupForecastByDay } from "./groupForecastByDay";

export function mapForecastPoint(
  item: OpenWeatherForecastResponse["list"][number]
): ForecastPoint {
  const weather = item.weather[0];

  if (!weather) {
    throw new Error("예보 응답에 weather 정보가 없습니다.");
  }

  return {
    timestamp: new Date(item.dt * 1000).toISOString(),
    temperature: item.main.temp,
    humidity: item.main.humidity,
    description: weather.description,
    iconCode: weather.icon,
    precipitationProbability: item.pop ?? 0
  };
}

export function mapForecast(
  response: OpenWeatherForecastResponse
): DailyForecast[] {
  const points = response.list.map(mapForecastPoint);

  return groupForecastByDay(points, response.city.timezone ?? 0);
}
