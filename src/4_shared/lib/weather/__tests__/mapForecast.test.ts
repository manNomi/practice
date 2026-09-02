import { mapForecast } from "../mapForecast";

describe("mapForecast", () => {
  it("maps OpenWeather forecast response into grouped daily forecasts", () => {
    const result = mapForecast({
      city: {
        timezone: 9 * 60 * 60
      },
      list: [
        {
          dt: Date.parse("2026-05-14T21:00:00.000Z") / 1000,
          pop: 0.3,
          main: {
            temp: 12,
            humidity: 40
          },
          weather: [
            {
              description: "clear sky",
              icon: "01d"
            }
          ]
        },
        {
          dt: Date.parse("2026-05-15T00:00:00.000Z") / 1000,
          main: {
            temp: 16,
            humidity: 45
          },
          weather: [
            {
              description: "few clouds",
              icon: "02d"
            }
          ]
        },
        {
          dt: Date.parse("2026-05-15T21:00:00.000Z") / 1000,
          pop: 0.6,
          main: {
            temp: 18,
            humidity: 50
          },
          weather: [
            {
              description: "light rain",
              icon: "10d"
            }
          ]
        }
      ]
    });

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      date: "2026-05-15",
      minTemperature: 12,
      maxTemperature: 16,
      timezoneOffsetSeconds: 9 * 60 * 60,
      points: [
        {
          temperature: 12,
          humidity: 40,
          description: "clear sky",
          iconCode: "01d",
          precipitationProbability: 0.3
        },
        {
          temperature: 16,
          humidity: 45,
          description: "few clouds",
          iconCode: "02d",
          precipitationProbability: 0
        }
      ]
    });
    expect(result[1]).toMatchObject({
      date: "2026-05-16",
      minTemperature: 18,
      maxTemperature: 18,
      representativeDescription: "light rain"
    });
  });
});
