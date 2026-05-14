import { CITY_META, type City } from "@/shared/config/cities";
import { OPENWEATHER_API_KEY } from "@/shared/config/env";
import { createWeatherApiError, WeatherApiError } from "../lib/apiError";
import { mapForecast } from "../lib/mapForecast";
import type {
  DailyForecast,
  OpenWeatherForecastResponse
} from "../model/types";
import type { WeatherRequestOptions } from "./cache";

const FORECAST_ENDPOINT = "https://api.openweathermap.org/data/2.5/forecast";

export function buildForecastUrl(city: City, apiKey: string) {
  const { lat, lon } = CITY_META[city].coordinates;
  const url = new URL(FORECAST_ENDPOINT);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "kr");

  return url;
}

export async function getForecast(
  city: City,
  options: WeatherRequestOptions = {}
): Promise<DailyForecast[]> {
  const apiKey = options.apiKey ?? OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new WeatherApiError("OpenWeather API key가 설정되지 않았습니다.");
  }

  const response = await fetch(buildForecastUrl(city, apiKey), {
    next: options.next
  });

  if (!response.ok) {
    throw await createWeatherApiError(response);
  }

  return mapForecast((await response.json()) as OpenWeatherForecastResponse);
}
