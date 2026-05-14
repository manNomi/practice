import { CITY_META, type City } from "@/shared/config/cities";
import { OPENWEATHER_API_KEY } from "@/shared/config/env";
import { createWeatherApiError, WeatherApiError } from "../lib/apiError";
import { mapCurrentWeather } from "../lib/mapCurrentWeather";
import type {
  CurrentWeather,
  OpenWeatherCurrentResponse
} from "../model/types";
import type { WeatherRequestOptions } from "./cache";

const CURRENT_WEATHER_ENDPOINT =
  "https://api.openweathermap.org/data/2.5/weather";

export function buildCurrentWeatherUrl(city: City, apiKey: string) {
  const { lat, lon } = CITY_META[city].coordinates;
  const url = new URL(CURRENT_WEATHER_ENDPOINT);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "kr");

  return url;
}

export async function getCurrentWeather(
  city: City,
  options: WeatherRequestOptions = {}
): Promise<CurrentWeather> {
  const apiKey = options.apiKey ?? OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new WeatherApiError("OpenWeather API key가 설정되지 않았습니다.");
  }

  const response = await fetch(buildCurrentWeatherUrl(city, apiKey), {
    next: options.next
  });

  if (!response.ok) {
    throw await createWeatherApiError(response);
  }

  return mapCurrentWeather(
    (await response.json()) as OpenWeatherCurrentResponse,
    city
  );
}
