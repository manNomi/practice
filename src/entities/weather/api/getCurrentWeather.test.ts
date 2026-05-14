import { WEATHER_REVALIDATE_SECONDS, weatherCacheTags } from "./cache";
import { buildCurrentWeatherUrl, getCurrentWeather } from "./getCurrentWeather";

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

const originalFetch = globalThis.fetch;

describe("buildCurrentWeatherUrl", () => {
  afterEach(() => {
    if (originalFetch) {
      globalThis.fetch = originalFetch;
    } else {
      delete (globalThis as { fetch?: unknown }).fetch;
    }
  });

  it("builds the official OpenWeather Current Weather coordinate URL", () => {
    const url = buildCurrentWeatherUrl("Seoul", "test-key");

    expect(url.origin).toBe("https://api.openweathermap.org");
    expect(url.pathname).toBe("/data/2.5/weather");
    expect(url.searchParams.get("lat")).toBe("37.5665");
    expect(url.searchParams.get("lon")).toBe("126.978");
    expect(url.searchParams.get("appid")).toBe("test-key");
    expect(url.searchParams.get("units")).toBe("metric");
    expect(url.searchParams.get("lang")).toBe("kr");
  });

  it("passes Next revalidate and tag options to fetch", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => currentResponse
    } as unknown as Response);
    globalThis.fetch = fetchMock as typeof fetch;

    await getCurrentWeather("Seoul", {
      apiKey: "test-key",
      next: {
        revalidate: WEATHER_REVALIDATE_SECONDS,
        tags: weatherCacheTags.current("Seoul")
      }
    });

    expect(fetchMock).toHaveBeenCalledWith(expect.any(URL), {
      next: {
        revalidate: 600,
        tags: ["weather:Seoul", "weather:Seoul:current"]
      }
    });
  });
});
