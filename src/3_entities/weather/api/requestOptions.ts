import type { City } from "@/4_shared/config/cities";

export const WEATHER_REVALIDATE_SECONDS = 600;

export const weatherCacheTags = {
  current: (city: City) => [`weather:${city}`, `weather:${city}:current`],
  forecast: (city: City) => [`weather:${city}`, `weather:${city}:forecast`]
};

export type WeatherRequestOptions = {
  apiKey?: string;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

export function createWeatherRequestOptions(
  apiKey: string,
  tags: string[]
): WeatherRequestOptions {
  return {
    apiKey,
    next: {
      revalidate: WEATHER_REVALIDATE_SECONDS,
      tags
    }
  };
}
