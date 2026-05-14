import { WEATHER_REVALIDATE_SECONDS, weatherCacheTags } from "./cache";
import { buildForecastUrl, getForecast } from "./getForecast";

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

const originalFetch = globalThis.fetch;

describe("buildForecastUrl", () => {
  afterEach(() => {
    if (originalFetch) {
      globalThis.fetch = originalFetch;
    } else {
      delete (globalThis as { fetch?: unknown }).fetch;
    }
  });

  it("builds the official OpenWeather 5 day / 3 hour forecast coordinate URL", () => {
    const url = buildForecastUrl("Seoul", "test-key");

    expect(url.origin).toBe("https://api.openweathermap.org");
    expect(url.pathname).toBe("/data/2.5/forecast");
    expect(url.searchParams.get("lat")).toBe("37.5665");
    expect(url.searchParams.get("lon")).toBe("126.978");
    expect(url.searchParams.get("appid")).toBe("test-key");
    expect(url.searchParams.get("units")).toBe("metric");
    expect(url.searchParams.get("lang")).toBe("kr");
  });

  it("passes Next revalidate and tag options to fetch", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => forecastResponse
    } as unknown as Response);
    globalThis.fetch = fetchMock as typeof fetch;

    await getForecast("Seoul", {
      apiKey: "test-key",
      next: {
        revalidate: WEATHER_REVALIDATE_SECONDS,
        tags: weatherCacheTags.forecast("Seoul")
      }
    });

    expect(fetchMock).toHaveBeenCalledWith(expect.any(URL), {
      next: {
        revalidate: 600,
        tags: ["weather:Seoul", "weather:Seoul:forecast"]
      }
    });
  });
});
