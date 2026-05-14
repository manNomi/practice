export const SUPPORTED_CITIES = ["Seoul", "Tokyo", "Paris", "London"] as const;

export type City = (typeof SUPPORTED_CITIES)[number];

type CityMeta = {
  city: City;
  country: string;
  headline: string;
  population: number;
  coordinates: {
    lat: number;
    lon: number;
  };
};

export const CITY_META: Record<City, CityMeta> = {
  Seoul: {
    city: "Seoul",
    country: "KR",
    headline: "서울의 현재 날씨와 앞으로의 변화를 빠르게 확인하세요.",
    population: 10349312,
    coordinates: {
      lat: 37.5665,
      lon: 126.978
    }
  },
  Tokyo: {
    city: "Tokyo",
    country: "JP",
    headline: "도쿄의 현재 날씨와 5일 예보를 한 화면에 정리했습니다.",
    population: 13960000,
    coordinates: {
      lat: 35.6762,
      lon: 139.6503
    }
  },
  Paris: {
    city: "Paris",
    country: "FR",
    headline: "파리의 기온, 습도, 바람, 예보를 안정적으로 확인하세요.",
    population: 2148000,
    coordinates: {
      lat: 48.8566,
      lon: 2.3522
    }
  },
  London: {
    city: "London",
    country: "GB",
    headline: "런던의 흐린 날도 놓치지 않도록 3시간 단위 예보를 제공합니다.",
    population: 8982000,
    coordinates: {
      lat: 51.5072,
      lon: -0.1276
    }
  }
};

export function isSupportedCity(value: string): value is City {
  return SUPPORTED_CITIES.includes(value as City);
}

export function getCanonicalCity(value: string): City | null {
  const foundCity = SUPPORTED_CITIES.find(
    (city) => city.toLowerCase() === value.toLowerCase()
  );

  return foundCity ?? null;
}
