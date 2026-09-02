export const OPENWEATHER_API_KEY =
  process.env.OPENWEATHER_API_KEY?.trim() ||
  process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY?.trim() ||
  "";

export const hasOpenWeatherApiKey = OPENWEATHER_API_KEY.length > 0;
