import type { City } from "@/shared/config/cities";

export type CurrentWeather = {
  city: City;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
  iconCode: string;
  observedAt: string;
  timezoneOffsetSeconds: number;
};

export type ForecastPoint = {
  timestamp: string;
  temperature: number;
  humidity: number;
  description: string;
  iconCode: string;
  precipitationProbability: number;
};

export type DailyForecast = {
  date: string;
  points: ForecastPoint[];
  minTemperature: number;
  maxTemperature: number;
  representativeDescription: string;
  timezoneOffsetSeconds: number;
};

export type OpenWeatherCurrentResponse = {
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind?: {
    speed?: number;
  };
  dt: number;
  timezone?: number;
  weather: Array<{
    description: string;
    icon: string;
  }>;
};

export type OpenWeatherForecastResponse = {
  city: {
    timezone: number;
  };
  list: Array<{
    dt: number;
    pop?: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
};
