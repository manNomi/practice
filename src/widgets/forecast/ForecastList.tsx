"use client";

import { useState } from "react";
import type { DailyForecast } from "@/entities/weather/model/types";
import { EmptyState } from "@/shared/ui/EmptyState";
import { formatForecastDay, formatForecastTime } from "@/shared/lib/formatDate";
import { formatTemperature } from "@/shared/lib/formatTemperature";
import { WeatherIconBadge } from "@/shared/ui/WeatherIconBadge";

type ForecastListProps = {
  days: DailyForecast[];
};

export function ForecastList({ days }: ForecastListProps) {
  const [expandedDate, setExpandedDate] = useState<string | null>(
    days[0]?.date ?? null
  );

  if (days.length === 0) {
    return <EmptyState message="표시할 예보 데이터가 없습니다." />;
  }

  return (
    <section
      aria-labelledby="forecast-title"
      className="mx-auto w-full max-w-[var(--weather-content-max-width)] overflow-hidden rounded-md border border-[var(--line)] bg-white"
    >
      <div className="flex h-20 items-center justify-center border-b border-[var(--line)] bg-white px-[30px]">
        <h2
          id="forecast-title"
          className="text-4xl font-bold leading-6 text-[var(--foreground)]"
        >
          5-day Forecast
        </h2>
      </div>

      <div>
        {days.map((day) => (
          <article key={day.date} className="border-b border-[var(--line)]">
            <button
              type="button"
              aria-expanded={expandedDate === day.date}
              aria-controls={`forecast-panel-${day.date}`}
              onClick={() =>
                setExpandedDate((current) =>
                  current === day.date ? null : day.date
                )
              }
              className="flex h-20 w-full items-center justify-between bg-white px-[30px] text-left"
            >
              <span className="text-3xl font-bold leading-6 text-[var(--foreground)]">
                {formatForecastDay(day.date)}
              </span>
              <span className="text-2xl leading-none text-[var(--primary)]">
                {expandedDate === day.date ? "^" : "v"}
              </span>
            </button>

            {expandedDate === day.date ? (
              <ul id={`forecast-panel-${day.date}`} className="bg-white">
                {day.points.slice(0, 8).map((point) => (
                  <li
                    key={point.timestamp}
                    className="grid h-[110px] grid-cols-[60px_220px_1fr] items-center gap-5 px-[50px]"
                  >
                    <WeatherIconBadge iconCode={point.iconCode} size="sm" />
                    <time
                      dateTime={point.timestamp}
                      className="text-3xl font-bold leading-[1.1] tracking-normal text-[#555]"
                    >
                      {formatForecastTime(
                        point.timestamp,
                        day.timezoneOffsetSeconds
                      )}
                    </time>
                    <div className="flex flex-col items-end gap-1.5 whitespace-nowrap tracking-normal">
                      <p className="text-xl font-semibold leading-[1.4] capitalize text-[var(--muted)]">
                        {point.description}
                      </p>
                      <p className="text-3xl font-bold leading-[1.1] text-[var(--foreground)]">
                        {formatTemperature(day.minTemperature, {
                          precision: 2
                        })}{" "}
                        /{" "}
                        {formatTemperature(day.maxTemperature, {
                          precision: 2
                        })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export default ForecastList;
