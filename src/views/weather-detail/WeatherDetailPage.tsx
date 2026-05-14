import Image from "next/image";
import type { WeatherLoadResult } from "@/entities/weather/api/loadWeatherData";
import type { City } from "@/shared/config/cities";
import { CITY_META } from "@/shared/config/cities";
import { getWeatherErrorMessage } from "@/entities/weather/lib/apiError";
import { CurrentWeatherCard } from "@/widgets/current-weather/CurrentWeatherCard";
import { ForecastList } from "@/widgets/forecast/ForecastList";
import { ErrorState } from "@/shared/ui/ErrorState";

type WeatherDetailPageProps = {
  city: City;
  weather: WeatherLoadResult;
};

export function WeatherDetailPage({ city, weather }: WeatherDetailPageProps) {
  const meta = CITY_META[city];
  const { current, forecast, hasApiKey } = weather;

  return (
    <main className="min-w-[800px]">
      <section className="relative mx-auto min-h-[863px] w-full max-w-[1280px] bg-[var(--background)] px-10 pb-20 pt-[43px]">
        <header className="flex flex-col items-center text-center">
          <Image
            src="/assets/weather-globe.png"
            alt=""
            width={68}
            height={51}
            priority
            className="h-[51px] w-[68px] object-contain"
          />
          <h1 className="mt-2 text-[40px] font-black leading-[1.1] tracking-normal text-[var(--foreground)]">
            Weather Information for {city}
          </h1>
          <p className="sr-only">{meta.headline}</p>
        </header>

        {!hasApiKey ? (
          <div className="mx-auto mt-10 max-w-[1200px]">
            <ErrorState
              title="OpenWeather API key가 필요합니다"
              message=".env.local 파일에 OPENWEATHER_API_KEY 값을 설정한 뒤 개발 서버를 다시 시작하세요. 과제 호환용으로 NEXT_PUBLIC_OPENWEATHER_API_KEY도 사용할 수 있습니다."
            />
          </div>
        ) : null}

        {hasApiKey && current.error ? (
          <div className="mx-auto mt-10 max-w-[1200px]">
            <ErrorState
              title="현재 날씨를 불러오지 못했습니다"
              message={getWeatherErrorMessage(current.error)}
            />
          </div>
        ) : null}

        <div className="mt-[74px]">
          {current.data ? <CurrentWeatherCard weather={current.data} /> : null}
        </div>

        {hasApiKey && forecast.error && !current.error ? (
          <div className="mx-auto mt-[25px] max-w-[1200px]">
            <ErrorState
              title="5일 예보를 불러오지 못했습니다"
              message={getWeatherErrorMessage(forecast.error)}
            />
          </div>
        ) : null}

        <div className="mt-[25px]">
          {forecast.data ? <ForecastList days={forecast.data} /> : null}
        </div>
      </section>
    </main>
  );
}
