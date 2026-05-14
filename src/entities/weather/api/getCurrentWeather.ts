import type { City } from "@/shared/config/cities";
import { OPENWEATHER_PATHS } from "@/shared/config/openWeather";
import { mapCurrentWeather } from "@/shared/lib/weather/mapCurrentWeather";
import type {
  CurrentWeather,
  OpenWeatherCurrentResponse
} from "@/shared/types/weather";
import { buildWeatherUrl, fetchWeatherJson } from "./request";
import type { WeatherRequestOptions } from "./requestOptions";

export function buildCurrentWeatherUrl(city: City, apiKey: string) {
  return buildWeatherUrl(city, apiKey, OPENWEATHER_PATHS.currentWeather);
}

export async function getCurrentWeather(
  city: City,
  options: WeatherRequestOptions = {}
): Promise<CurrentWeather> {
  const response = await fetchWeatherJson<OpenWeatherCurrentResponse>({
    city,
    path: OPENWEATHER_PATHS.currentWeather,
    errorLabel: "OpenWeather 현재 날씨 요청",
    options
  });

  return mapCurrentWeather(response, city);
}
