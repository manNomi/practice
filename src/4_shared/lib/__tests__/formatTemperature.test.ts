import { formatTemperature } from "../formatTemperature";

describe("formatTemperature", () => {
  it("rounds celsius values", () => {
    expect(formatTemperature(21.4)).toBe("21℃");
    expect(formatTemperature(-2.6)).toBe("-3℃");
  });

  it("formats celsius values with precision", () => {
    expect(formatTemperature(21.4, { precision: 2 })).toBe("21.40℃");
  });
});
