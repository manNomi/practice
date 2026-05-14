import {
  OPENWEATHER_API_ORIGIN,
  OPENWEATHER_QUERY_DEFAULTS
} from "@/shared/config/openWeather";

const originalFetch = globalThis.fetch;

export function restoreFetch() {
  if (originalFetch) {
    globalThis.fetch = originalFetch;
  } else {
    delete (globalThis as { fetch?: unknown }).fetch;
  }
}

export function mockFetchJson(body: unknown) {
  const fetchMock = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => body
  } as unknown as Response);

  globalThis.fetch = fetchMock as typeof fetch;

  return fetchMock;
}

export function expectOpenWeatherUrl(url: URL, pathname: string) {
  expect(url.origin).toBe(OPENWEATHER_API_ORIGIN);
  expect(url.pathname).toBe(pathname);
  expect(url.searchParams.get("lat")).toBe("37.5665");
  expect(url.searchParams.get("lon")).toBe("126.978");
  expect(url.searchParams.get("appid")).toBe("test-key");
  expect(url.searchParams.get("units")).toBe(OPENWEATHER_QUERY_DEFAULTS.units);
  expect(url.searchParams.get("lang")).toBe(OPENWEATHER_QUERY_DEFAULTS.lang);
}
