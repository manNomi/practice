import { render, screen } from "@testing-library/react";
import type { WeatherLoadResult } from "@/4_shared/types/weather";
import { WeatherDetailPage } from "../WeatherDetailPage";

jest.mock("../ui/WeatherErrorToasts", () => ({
  WeatherErrorToasts: () => null
}));

const emptyWeather: WeatherLoadResult = {
  hasApiKey: true,
  current: {
    data: null,
    error: null
  },
  forecast: {
    data: null,
    error: null
  }
};

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

describe("WeatherDetailPage", () => {
  it("shows an API key error when the env value is missing", () => {
    render(
      <WeatherDetailPage
        city="Seoul"
        weather={{
          ...emptyWeather,
          hasApiKey: false
        }}
      />
    );

    expect(
      screen.getByText("OpenWeather API key가 필요합니다")
    ).toBeInTheDocument();
  });

  it("shows a partial API error without hiding successful data", () => {
    render(
      <WeatherDetailPage
        city="Seoul"
        weather={{
          hasApiKey: true,
          current: {
            data: currentWeather,
            error: null
          },
          forecast: {
            data: null,
            error: new Error("network failed")
          }
        }}
      />
    );

    expect(screen.getByText("Seoul, KR")).toBeInTheDocument();
    expect(
      screen.getByText("5일 예보를 불러오지 못했습니다")
    ).toBeInTheDocument();
  });

  it("shows both inline errors when both weather APIs fail", () => {
    render(
      <WeatherDetailPage
        city="Seoul"
        weather={{
          hasApiKey: true,
          current: {
            data: null,
            error: new Error("current failed")
          },
          forecast: {
            data: null,
            error: new Error("forecast failed")
          }
        }}
      />
    );

    expect(
      screen.getByText("현재 날씨를 불러오지 못했습니다")
    ).toBeInTheDocument();
    expect(
      screen.getByText("5일 예보를 불러오지 못했습니다")
    ).toBeInTheDocument();
    expect(screen.queryByText("Seoul, KR")).not.toBeInTheDocument();
  });
});
