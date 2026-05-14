import { getCanonicalCity, isSupportedCity } from "../cities";

describe("city helpers", () => {
  it("validates supported cities", () => {
    expect(isSupportedCity("Seoul")).toBe(true);
    expect(isSupportedCity("Busan")).toBe(false);
  });

  it("returns canonical city names case-insensitively", () => {
    expect(getCanonicalCity("seoul")).toBe("Seoul");
    expect(getCanonicalCity("TOKYO")).toBe("Tokyo");
    expect(getCanonicalCity("unknown")).toBeNull();
  });
});
