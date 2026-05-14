export class WeatherApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "WeatherApiError";
    this.status = status;
  }
}

export async function createWeatherApiError(response: Response) {
  let apiMessage = "";

  try {
    const body = (await response.json()) as { message?: string };
    apiMessage = body.message ? ` (${body.message})` : "";
  } catch {
    apiMessage = "";
  }

  return new WeatherApiError(
    `OpenWeather 요청에 실패했습니다${apiMessage}.`,
    response.status
  );
}

export function getWeatherErrorMessage(error: unknown) {
  if (error instanceof WeatherApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "알 수 없는 오류가 발생했습니다.";
}
