import type { City } from "@/shared/config/cities";
import { OPENWEATHER_API_KEY } from "@/shared/config/env";
import type { CurrentWeather, DailyForecast } from "@/shared/types/weather";
import {
  WEATHER_REVALIDATE_SECONDS,
  weatherCacheTags,
  type WeatherRequestOptions
} from "./cache";
import { getCurrentWeather } from "./getCurrentWeather";
import { getForecast } from "./getForecast";

type WeatherResource<T> = {
  data: T | null;
  error: unknown | null;
};

export type WeatherLoadResult = {
  hasApiKey: boolean;
  current: WeatherResource<CurrentWeather>;
  forecast: WeatherResource<DailyForecast[]>;
};

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

function createRequestOptions(
  city: City,
  tags: string[],
  apiKey: string
): WeatherRequestOptions {
  return {
    apiKey,
    next: {
      revalidate: WEATHER_REVALIDATE_SECONDS,
      tags
    }
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
      createRequestOptions(city, weatherCacheTags.current(city), apiKey)
    ),
    getForecast(
      city,
      createRequestOptions(city, weatherCacheTags.forecast(city), apiKey)
    )
  ]);

  return {
    hasApiKey: true,
    current: toResource(current),
    forecast: toResource(forecast)
  };
}
