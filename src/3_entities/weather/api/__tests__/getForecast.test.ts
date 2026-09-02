import { OPENWEATHER_PATHS } from "@/4_shared/config/openWeather";
import {
  expectOpenWeatherUrl,
  mockFetchJson,
  restoreFetch
} from "../__test-utils__/helpers";
import { buildForecastUrl, getForecast } from "../getForecast";
import {
  WEATHER_REVALIDATE_SECONDS,
  weatherCacheTags
} from "../requestOptions";

const forecastResponse = {
  city: {
    timezone: 9 * 60 * 60
  },
  list: [
    {
      dt: 1778755200,
      pop: 0,
      main: {
        temp: 21.4,
        humidity: 48
      },
      weather: [
        {
          description: "clear sky",
          icon: "01d"
        }
      ]
    }
  ]
};

describe("buildForecastUrl", () => {
  afterEach(() => {
    restoreFetch();
  });

  it("builds the official OpenWeather 5 day / 3 hour forecast coordinate URL", () => {
    const url = buildForecastUrl("Seoul", "test-key");

    expectOpenWeatherUrl(url, OPENWEATHER_PATHS.forecast);
  });

  it("passes Next revalidate and tag options to fetch", async () => {
    const fetchMock = mockFetchJson(forecastResponse);

    await getForecast("Seoul", {
      apiKey: "test-key",
      next: {
        revalidate: WEATHER_REVALIDATE_SECONDS,
        tags: weatherCacheTags.forecast("Seoul")
      }
    });

    expect(fetchMock).toHaveBeenCalledWith(expect.any(URL), {
      next: {
        revalidate: WEATHER_REVALIDATE_SECONDS,
        tags: ["weather:Seoul", "weather:Seoul:forecast"]
      }
    });
  });
});
