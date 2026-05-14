import { CITY_META, type City } from "@/shared/config/cities";
import { OPENWEATHER_API_KEY } from "@/shared/config/env";
import {
  createOpenWeatherApiUrl,
  OPENWEATHER_PATHS,
  OPENWEATHER_QUERY_DEFAULTS
} from "@/shared/config/openWeather";
import { ApiError, createApiError } from "@/shared/lib/apiError";
import { mapForecast } from "@/shared/lib/weather/mapForecast";
import type {
  DailyForecast,
  OpenWeatherForecastResponse
} from "@/shared/types/weather";
import type { WeatherRequestOptions } from "./cache";

export function buildForecastUrl(city: City, apiKey: string) {
  const { lat, lon } = CITY_META[city].coordinates;
  const url = createOpenWeatherApiUrl(OPENWEATHER_PATHS.forecast);

  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", OPENWEATHER_QUERY_DEFAULTS.units);
  url.searchParams.set("lang", OPENWEATHER_QUERY_DEFAULTS.lang);

  return url;
}

export async function getForecast(
  city: City,
  options: WeatherRequestOptions = {}
): Promise<DailyForecast[]> {
  const apiKey = options.apiKey ?? OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new ApiError("OpenWeather API key가 설정되지 않았습니다.");
  }

  const response = await fetch(buildForecastUrl(city, apiKey), {
    next: options.next
  });

  if (!response.ok) {
    throw await createApiError(response, "OpenWeather 5일 예보 요청");
  }

  return mapForecast((await response.json()) as OpenWeatherForecastResponse);
}
