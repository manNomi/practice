import type { City } from "@/4_shared/config/cities";
import { OPENWEATHER_API_KEY } from "@/4_shared/config/env";
import type { WeatherLoadResult, WeatherResource } from "@/4_shared/types/weather";
import {
  createWeatherRequestOptions,
  weatherCacheTags,
} from "./requestOptions";
import { getCurrentWeather } from "./getCurrentWeather";
import { getForecast } from "./getForecast";

type LoadWeatherDataOptions = {
  apiKey?: string;
};

function emptyResource<T>(): WeatherResource<T> {
  return {
    data: null,
    error: null
  };
}

function toResource<T>(
  result: PromiseSettledResult<T>
): WeatherResource<T> {
  if (result.status === "fulfilled") {
    return {
      data: result.value,
      error: null
    };
  }

  return {
    data: null,
    error: result.reason
  };
}

export async function loadWeatherData(
  city: City,
  options: LoadWeatherDataOptions = {}
): Promise<WeatherLoadResult> {
  const apiKey = options.apiKey ?? OPENWEATHER_API_KEY;

  if (!apiKey) {
    return {
      hasApiKey: false,
      current: emptyResource(),
      forecast: emptyResource()
    };
  }

  const [current, forecast] = await Promise.allSettled([
    getCurrentWeather(
      city,
      createWeatherRequestOptions(apiKey, weatherCacheTags.current(city))
    ),
    getForecast(
      city,
      createWeatherRequestOptions(apiKey, weatherCacheTags.forecast(city))
    )
  ]);

  return {
    hasApiKey: true,
    current: toResource(current),
    forecast: toResource(forecast)
  };
}
