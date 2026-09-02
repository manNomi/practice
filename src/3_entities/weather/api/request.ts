import { CITY_META, type City } from "@/4_shared/config/cities";
import { OPENWEATHER_API_KEY } from "@/4_shared/config/env";
import {
  createOpenWeatherApiUrl,
  OPENWEATHER_PATHS,
  OPENWEATHER_QUERY_DEFAULTS
} from "@/4_shared/config/openWeather";
import { ApiError, createApiError } from "@/4_shared/lib/apiError";
import type { WeatherRequestOptions } from "./requestOptions";

type WeatherApiPath =
  | typeof OPENWEATHER_PATHS.currentWeather
  | typeof OPENWEATHER_PATHS.forecast;

type FetchWeatherJsonParams = {
  city: City;
  path: WeatherApiPath;
  errorLabel: string;
  options?: WeatherRequestOptions;
};

export function buildWeatherUrl(
  city: City,
  apiKey: string,
  path: WeatherApiPath
) {
  const { lat, lon } = CITY_META[city].coordinates;
  const url = createOpenWeatherApiUrl(path);

  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", OPENWEATHER_QUERY_DEFAULTS.units);
  url.searchParams.set("lang", OPENWEATHER_QUERY_DEFAULTS.lang);

  return url;
}

function resolveWeatherApiKey(apiKey = OPENWEATHER_API_KEY) {
  if (!apiKey) {
    throw new ApiError("OpenWeather API key가 설정되지 않았습니다.");
  }

  return apiKey;
}

export async function fetchWeatherJson<T>({
  city,
  path,
  errorLabel,
  options = {}
}: FetchWeatherJsonParams): Promise<T> {
  const apiKey = resolveWeatherApiKey(options.apiKey);
  const response = await fetch(buildWeatherUrl(city, apiKey, path), {
    next: options.next
  });

  if (!response.ok) {
    throw await createApiError(response, errorLabel);
  }

  return (await response.json()) as T;
}
