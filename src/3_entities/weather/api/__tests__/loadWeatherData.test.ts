import {
  WEATHER_REVALIDATE_SECONDS,
  weatherCacheTags
} from "../requestOptions";
import { getCurrentWeather } from "../getCurrentWeather";
import { getForecast } from "../getForecast";
import { loadWeatherData } from "../loadWeatherData";

jest.mock("../getCurrentWeather", () => ({
  getCurrentWeather: jest.fn()
}));

jest.mock("../getForecast", () => ({
  getForecast: jest.fn()
}));

const mockedGetCurrentWeather = jest.mocked(getCurrentWeather);
const mockedGetForecast = jest.mocked(getForecast);

const currentWeather = {
  city: "Seoul" as const,
  country: "KR",
  temperature: 21.4,
  feelsLike: 20.9,
  humidity: 48,
  pressure: 1012,
  windSpeed: 3.2,
  description: "clear sky",
  iconCode: "01d",
  observedAt: "2026-05-22T18:00:00.000Z",
  timezoneOffsetSeconds: 9 * 60 * 60
};

const forecast = [
  {
    date: "2026-05-23",
    minTemperature: 21.4,
    maxTemperature: 24.6,
    representativeDescription: "clear sky",
    timezoneOffsetSeconds: 9 * 60 * 60,
    points: [
      {
        timestamp: "2026-05-22T18:00:00.000Z",
        temperature: 21.4,
        humidity: 40,
        description: "clear sky",
        iconCode: "01d",
        precipitationProbability: 0
      }
    ]
  }
];

describe("loadWeatherData", () => {
  beforeEach(() => {
    mockedGetCurrentWeather.mockReset();
    mockedGetForecast.mockReset();
  });

  it("skips API calls when an API key is not available", async () => {
    const result = await loadWeatherData("Seoul", { apiKey: "" });

    expect(result).toEqual({
      hasApiKey: false,
      current: {
        data: null,
        error: null
      },
      forecast: {
        data: null,
        error: null
      }
    });
    expect(mockedGetCurrentWeather).not.toHaveBeenCalled();
    expect(mockedGetForecast).not.toHaveBeenCalled();
  });

  it("loads current weather and forecast in parallel with ISR cache options", async () => {
    mockedGetCurrentWeather.mockResolvedValue(currentWeather);
    mockedGetForecast.mockResolvedValue(forecast);

    const result = await loadWeatherData("Seoul", { apiKey: "test-key" });

    expect(mockedGetCurrentWeather).toHaveBeenCalledWith("Seoul", {
      apiKey: "test-key",
      next: {
        revalidate: WEATHER_REVALIDATE_SECONDS,
        tags: weatherCacheTags.current("Seoul")
      }
    });
    expect(mockedGetForecast).toHaveBeenCalledWith("Seoul", {
      apiKey: "test-key",
      next: {
        revalidate: WEATHER_REVALIDATE_SECONDS,
        tags: weatherCacheTags.forecast("Seoul")
      }
    });
    expect(result).toMatchObject({
      hasApiKey: true,
      current: {
        data: currentWeather,
        error: null
      },
      forecast: {
        data: forecast,
        error: null
      }
    });
  });

  it("keeps successful data when only one API call fails", async () => {
    const forecastError = new Error("forecast failed");

    mockedGetCurrentWeather.mockResolvedValue(currentWeather);
    mockedGetForecast.mockRejectedValue(forecastError);

    const result = await loadWeatherData("Seoul", { apiKey: "test-key" });

    expect(result.current).toEqual({
      data: currentWeather,
      error: null
    });
    expect(result.forecast).toEqual({
      data: null,
      error: forecastError
    });
  });
});
