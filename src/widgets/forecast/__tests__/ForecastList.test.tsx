import { fireEvent, render, screen } from "@testing-library/react";
import type { DailyForecast } from "@/entities/weather/model/types";
import { ForecastList } from "../ForecastList";

const days: DailyForecast[] = [
  {
    date: "2026-05-23",
    minTemperature: 21.4,
    maxTemperature: 24.6,
    representativeDescription: "clear sky",
    timezoneOffsetSeconds: 9 * 60 * 60,
    points: [
      {
        timestamp: "2026-05-23T03:00:00.000Z",
        temperature: 21.4,
        humidity: 40,
        description: "clear sky",
        iconCode: "01d",
        precipitationProbability: 0
      }
    ]
  },
  {
    date: "2026-05-24",
    minTemperature: 20,
    maxTemperature: 23,
    representativeDescription: "clouds",
    timezoneOffsetSeconds: 9 * 60 * 60,
    points: [
      {
        timestamp: "2026-05-24T03:00:00.000Z",
        temperature: 20,
        humidity: 44,
        description: "clouds",
        iconCode: "02d",
        precipitationProbability: 0.1
      }
    ]
  }
];

describe("ForecastList", () => {
  it("expands the first day by default and toggles rows", () => {
    render(<ForecastList days={days} />);

    expect(
      screen.getByRole("heading", { name: "5-day Forecast" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /May 23/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByText("21.40℃ / 24.60℃")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /May 23/i }));

    expect(screen.getByRole("button", { name: /May 23/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );

    fireEvent.click(screen.getByRole("button", { name: /May 24/i }));

    expect(screen.getByRole("button", { name: /May 24/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });
});
