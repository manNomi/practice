import type { CurrentWeather } from "@/shared/types/weather";
import { CITY_META } from "@/shared/config/cities";
import { formatCurrentDateTime } from "@/shared/lib/formatDate";
import { formatTemperature } from "@/shared/lib/formatTemperature";
import { WeatherIconBadge } from "@/shared/ui/WeatherIconBadge";

type CurrentWeatherCardProps = {
  weather: CurrentWeather;
};

export function CurrentWeatherCard({ weather }: CurrentWeatherCardProps) {
  const meta = CITY_META[weather.city];

  return (
    <article className="mx-auto flex h-[140px] w-full max-w-[var(--weather-content-max-width)] items-center justify-between rounded-md border border-[var(--line)] bg-white px-[30px]">
      <div className="flex items-center gap-[40px]">
        <WeatherIconBadge iconCode={weather.iconCode} size="md" />
        <div className="flex flex-col gap-2.5 whitespace-nowrap tracking-normal">
          <time
            dateTime={weather.observedAt}
            className="text-2xl font-bold leading-[1.1] text-[#555]"
          >
            {formatCurrentDateTime(
              weather.observedAt,
              weather.timezoneOffsetSeconds
            )}
          </time>
          <div className="flex items-end gap-1">
            <h2 className="text-4xl font-bold leading-[1.1] text-[var(--foreground)]">
              {weather.city}, {weather.country}
            </h2>
            <p className="pb-1 text-sm font-semibold leading-[1.1] text-[var(--muted)]">
              (인구수 : {meta.population.toLocaleString("ko-KR")})
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2.5 whitespace-nowrap tracking-normal">
        <p className="text-[50px] font-bold leading-[1.1] text-[var(--foreground)]">
          {formatTemperature(weather.temperature, { precision: 2 })}
        </p>
        <p className="text-sm font-semibold leading-[1.4] text-[var(--muted)]">
          Feels like{" "}
          {formatTemperature(weather.feelsLike, {
            precision: 2
          })}{" "}
          {weather.description} 풍속 {weather.windSpeed}m/s 습도{" "}
          {weather.humidity}%
        </p>
      </div>
    </article>
  );
}
