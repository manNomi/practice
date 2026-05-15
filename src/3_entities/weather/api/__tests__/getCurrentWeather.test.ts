import { OPENWEATHER_PATHS } from "@/4_shared/config/openWeather";
import {
  expectOpenWeatherUrl,
  mockFetchJson,
  restoreFetch
} from "../__test-utils__/helpers";
import { buildCurrentWeatherUrl, getCurrentWeather } from "../getCurrentWeather";
import {
  WEATHER_REVALIDATE_SECONDS,
  weatherCacheTags
} from "../requestOptions";

const currentResponse = {
  dt: 1778755200,
  sys: {
    country: "KR"
  },
  main: {
    temp: 21.4,
    feels_like: 20.9,
    humidity: 48,
    pressure: 1012
  },
  wind: {
    speed: 3.2
  },
  timezone: 9 * 60 * 60,
  weather: [
    {
      description: "clear sky",
      icon: "01d"
    }
  ]
};

describe("buildCurrentWeatherUrl", () => {
  afterEach(() => {
    restoreFetch();
  });

  it("builds the official OpenWeather Current Weather coordinate URL", () => {
    const url = buildCurrentWeatherUrl("Seoul", "test-key");

    expectOpenWeatherUrl(url, OPENWEATHER_PATHS.currentWeather);
  });

  it("passes Next revalidate and tag options to fetch", async () => {
    const fetchMock = mockFetchJson(currentResponse);

    await getCurrentWeather("Seoul", {
      apiKey: "test-key",
      next: {
        revalidate: WEATHER_REVALIDATE_SECONDS,
        tags: weatherCacheTags.current("Seoul")
      }
    });

    expect(fetchMock).toHaveBeenCalledWith(expect.any(URL), {
      next: {
        revalidate: WEATHER_REVALIDATE_SECONDS,
        tags: ["weather:Seoul", "weather:Seoul:current"]
      }
    });
  });
});
