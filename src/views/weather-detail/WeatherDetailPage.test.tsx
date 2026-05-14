import { render, screen } from "@testing-library/react";
import type { WeatherLoadResult } from "@/entities/weather/api/loadWeatherData";
import { WeatherDetailPage } from "./WeatherDetailPage";

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

  it("renders the Figma detail heading and current weather card", () => {
    render(
      <WeatherDetailPage
        city="Seoul"
        weather={{
          ...emptyWeather,
          current: {
            data: currentWeather,
            error: null
          }
        }}
      />
    );

    expect(
      screen.getByRole("heading", {
        name: "Weather Information for Seoul"
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Seoul, KR")).toBeInTheDocument();
    expect(screen.getByText("21.40℃")).toBeInTheDocument();
  });

  it("renders the forecast accordion with the first day expanded", () => {
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
            data: [
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
            ],
            error: null
          }
        }}
      />
    );

    expect(screen.getByRole("button", { name: /May 23/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByText("03:00am")).toBeInTheDocument();
  });
});
