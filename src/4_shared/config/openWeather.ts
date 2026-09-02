export const OPENWEATHER_API_ORIGIN = "https://api.openweathermap.org";
export const OPENWEATHER_ICON_ORIGIN = "https://openweathermap.org";

export const OPENWEATHER_PATHS = {
  currentWeather: "/data/2.5/weather",
  forecast: "/data/2.5/forecast",
  icon: "/img/wn"
} as const;

export const OPENWEATHER_QUERY_DEFAULTS = {
  units: "metric",
  lang: "kr"
} as const;

export function createOpenWeatherApiUrl(path: string) {
  return new URL(path, OPENWEATHER_API_ORIGIN);
}

export function createOpenWeatherIconUrl(iconCode: string) {
  return `${OPENWEATHER_ICON_ORIGIN}${OPENWEATHER_PATHS.icon}/${iconCode}@2x.png`;
}
