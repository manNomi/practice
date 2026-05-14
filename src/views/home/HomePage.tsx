import Image from "next/image";
import { WEATHER_GLOBE_IMAGE } from "@/shared/config/layout";
import { CitySelector } from "@/widgets/city-selector/CitySelector";

export function HomePage() {
  return (
    <main className="min-w-[var(--app-min-width)]">
      <section className="relative mx-auto min-h-[var(--weather-artboard-min-height)] w-full max-w-[var(--app-max-width)] overflow-hidden bg-[var(--background)]">
        <header className="absolute left-1/2 top-[101px] flex -translate-x-1/2 flex-col items-center gap-5 text-center">
          <h1 className="whitespace-nowrap text-[82px] font-black leading-[1.1] tracking-normal">
            <span className="block text-[var(--foreground)]">Welcome to</span>
            <span className="block text-[var(--primary)]">Weather App!</span>
          </h1>
          <p className="w-[486px] text-base leading-normal tracking-normal text-[var(--muted)]">
            Choose a city from the list below to check the weather.
          </p>
        </header>

        <div className="absolute left-1/2 top-[345px] -translate-x-1/2">
          <CitySelector />
        </div>

        <div className="absolute left-[155px] top-[321px] flex flex-col items-start">
          <p className="text-base leading-normal text-black">Hover</p>
          <div className="flex h-10 min-w-[140px] items-center justify-center rounded-md border border-[var(--primary-strong)] bg-[var(--accent)] px-[50px] text-base leading-normal text-[var(--primary)]">
            Seoul
          </div>
        </div>

        <div className="absolute left-[155px] top-[393px] flex flex-col items-start">
          <p className="text-base leading-normal text-black">Select</p>
          <div className="flex h-10 min-w-[140px] items-center justify-center rounded-md border border-[var(--primary)] bg-[#ffaba1] px-[50px] text-base leading-normal text-[var(--primary)]">
            Seoul
          </div>
        </div>

        <Image
          src="/assets/weather-globe.png"
          alt=""
          width={WEATHER_GLOBE_IMAGE.home.width}
          height={WEATHER_GLOBE_IMAGE.home.height}
          priority
          className="absolute left-1/2 top-[451px] h-[var(--home-globe-height)] w-[var(--home-globe-width)] -translate-x-1/2 object-contain"
        />
      </section>
    </main>
  );
}
