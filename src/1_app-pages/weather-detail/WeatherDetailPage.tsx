import Image from "next/image";
import type { City } from "@/4_shared/config/cities";
import { CITY_META } from "@/4_shared/config/cities";
import { WEATHER_GLOBE_IMAGE } from "@/4_shared/config/layout";
import { getApiErrorMessage } from "@/4_shared/lib/apiError";
import type { WeatherLoadResult } from "@/4_shared/types/weather";
import { CurrentWeatherCard } from "@/2_widgets/current-weather/CurrentWeatherCard";
import { ForecastList } from "@/2_widgets/forecast/ForecastList";
import { ErrorState } from "@/4_shared/ui/ErrorState";
import {
  WeatherErrorToasts,
  type WeatherToastError
} from "./ui/WeatherErrorToasts";

type WeatherDetailPageProps = {
  city: City;
  weather: WeatherLoadResult;
};

export function WeatherDetailPage({ city, weather }: WeatherDetailPageProps) {
  const meta = CITY_META[city];
  const { current, forecast, hasApiKey } = weather;
  const currentErrorMessage = current.error
    ? getApiErrorMessage(current.error)
    : null;
  const forecastErrorMessage = forecast.error
    ? getApiErrorMessage(forecast.error)
    : null;
  const toastErrors: WeatherToastError[] = [
    ...(hasApiKey && currentErrorMessage
      ? [{ id: `${city}:current-weather-error`, message: currentErrorMessage }]
      : []),
    ...(hasApiKey && forecastErrorMessage
      ? [{ id: `${city}:forecast-error`, message: forecastErrorMessage }]
      : [])
  ];

  return (
    <main className="min-w-[var(--app-min-width)]">
      <WeatherErrorToasts errors={toastErrors} />
      <section className="relative mx-auto min-h-[var(--weather-artboard-min-height)] w-full max-w-[var(--app-max-width)] bg-[var(--background)] px-10 pb-20 pt-[var(--detail-top-padding)]">
        <header className="flex flex-col items-center text-center">
          <Image
            src="/assets/weather-globe.png"
            alt=""
            width={WEATHER_GLOBE_IMAGE.detail.width}
            height={WEATHER_GLOBE_IMAGE.detail.height}
            priority
            className="h-[var(--detail-globe-height)] w-[var(--detail-globe-width)] object-contain"
          />
          <h1 className="mt-2 text-[40px] font-black leading-[1.1] tracking-normal text-[var(--foreground)]">
            Weather Information for {city}
          </h1>
          <p className="sr-only">{meta.headline}</p>
        </header>

        {!hasApiKey ? (
          <div className="mx-auto mt-10 max-w-[var(--weather-content-max-width)]">
            <ErrorState
              title="OpenWeather API key가 필요합니다"
              message=".env.local 파일에 OPENWEATHER_API_KEY 값을 설정한 뒤 개발 서버를 다시 시작하세요. 과제 호환용으로 NEXT_PUBLIC_OPENWEATHER_API_KEY도 사용할 수 있습니다."
            />
          </div>
        ) : null}

        {hasApiKey && current.error ? (
          <div className="mx-auto mt-10 max-w-[var(--weather-content-max-width)]">
            <ErrorState
              title="현재 날씨를 불러오지 못했습니다"
              message={currentErrorMessage ?? "알 수 없는 오류가 발생했습니다."}
            />
          </div>
        ) : null}

        {current.data ? (
          <div className="mt-[var(--detail-card-offset)]">
            <CurrentWeatherCard weather={current.data} />
          </div>
        ) : null}

        {hasApiKey && forecast.error ? (
          <div className="mx-auto mt-[var(--weather-section-gap)] max-w-[var(--weather-content-max-width)]">
            <ErrorState
              title="5일 예보를 불러오지 못했습니다"
              message={forecastErrorMessage ?? "알 수 없는 오류가 발생했습니다."}
            />
          </div>
        ) : null}

        <div className="mt-[var(--weather-section-gap)]">
          {forecast.data ? <ForecastList days={forecast.data} /> : null}
        </div>
      </section>
    </main>
  );
}
