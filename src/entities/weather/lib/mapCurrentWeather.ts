import type { City } from "@/shared/config/cities";
import type {
  CurrentWeather,
  OpenWeatherCurrentResponse
} from "../model/types";

export function mapCurrentWeather(
  response: OpenWeatherCurrentResponse,
  city: City
): CurrentWeather {
  const weather = response.weather[0];

  if (!weather) {
    throw new Error("현재 날씨 응답에 weather 정보가 없습니다.");
  }

  return {
    city,
    country: response.sys.country,
    temperature: response.main.temp,
    feelsLike: response.main.feels_like,
    humidity: response.main.humidity,
    pressure: response.main.pressure,
    windSpeed: response.wind?.speed ?? 0,
    description: weather.description,
    iconCode: weather.icon,
    observedAt: new Date(response.dt * 1000).toISOString(),
    timezoneOffsetSeconds: response.timezone ?? 0
  };
}
