import type { City } from "@/4_shared/config/cities";
import { OPENWEATHER_PATHS } from "@/4_shared/config/openWeather";
import { mapForecast } from "@/4_shared/lib/weather/mapForecast";
import type {
  DailyForecast,
  OpenWeatherForecastResponse
} from "@/4_shared/types/weather";
import { buildWeatherUrl, fetchWeatherJson } from "./request";
import type { WeatherRequestOptions } from "./requestOptions";

export function buildForecastUrl(city: City, apiKey: string) {
  return buildWeatherUrl(city, apiKey, OPENWEATHER_PATHS.forecast);
}

export async function getForecast(
  city: City,
  options: WeatherRequestOptions = {}
): Promise<DailyForecast[]> {
  const response = await fetchWeatherJson<OpenWeatherForecastResponse>({
    city,
    path: OPENWEATHER_PATHS.forecast,
    errorLabel: "OpenWeather 5일 예보 요청",
    options
  });

  return mapForecast(response);
}
