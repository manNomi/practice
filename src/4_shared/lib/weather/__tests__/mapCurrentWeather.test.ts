import { mapCurrentWeather } from "../mapCurrentWeather";

describe("mapCurrentWeather", () => {
  it("maps OpenWeather current response into the domain model", () => {
    const result = mapCurrentWeather(
      {
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
      },
      "Seoul"
    );

    expect(result).toMatchObject({
      city: "Seoul",
      country: "KR",
      temperature: 21.4,
      feelsLike: 20.9,
      humidity: 48,
      pressure: 1012,
      windSpeed: 3.2,
      description: "clear sky",
      iconCode: "01d",
      timezoneOffsetSeconds: 9 * 60 * 60
    });
  });
});
