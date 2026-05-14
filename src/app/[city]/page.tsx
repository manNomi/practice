import { notFound, redirect } from "next/navigation";
import { loadWeatherData } from "@/entities/weather/api/loadWeatherData";
import { WeatherDetailPage } from "@/views/weather-detail/WeatherDetailPage";
import {
  getCanonicalCity,
  isSupportedCity,
  SUPPORTED_CITIES
} from "@/shared/config/cities";

// Next route segment config must be statically analyzable, so keep this literal.
export const revalidate = 600;

type CityPageProps = {
  params: Promise<{
    city: string;
  }>;
};

export function generateStaticParams() {
  return SUPPORTED_CITIES.map((city) => ({ city }));
}

export async function generateMetadata({ params }: CityPageProps) {
  const { city: rawCity } = await params;
  const city = getCanonicalCity(rawCity);

  if (!city) {
    return {
      title: "City not found | Toss Weather"
    };
  }

  return {
    title: `${city} weather | Toss Weather`
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: rawCity } = await params;
  const canonicalCity = getCanonicalCity(rawCity);

  if (!canonicalCity) {
    notFound();
  }

  if (rawCity !== canonicalCity && isSupportedCity(canonicalCity)) {
    redirect(`/${canonicalCity}`);
  }

  const weather = await loadWeatherData(canonicalCity);

  return <WeatherDetailPage city={canonicalCity} weather={weather} />;
}
