import { render } from "@testing-library/react";
import { toast } from "react-hot-toast";
import { WeatherErrorToasts } from "../WeatherErrorToasts";

jest.mock("react-hot-toast", () => ({
  toast: {
    error: jest.fn()
  }
}));

const mockedToastError = jest.mocked(toast.error);

describe("WeatherErrorToasts", () => {
  beforeEach(() => {
    mockedToastError.mockClear();
  });

  it("does not show a toast when there are no API errors", () => {
    render(<WeatherErrorToasts errors={[]} />);

    expect(mockedToastError).not.toHaveBeenCalled();
  });

  it("shows API error toasts with stable ids", () => {
    render(
      <WeatherErrorToasts
        errors={[
          {
            id: "Seoul:current-weather-error",
            message: "현재 날씨 요청 실패"
          },
          {
            id: "Seoul:forecast-error",
            message: "예보 요청 실패"
          }
        ]}
      />
    );

    expect(mockedToastError).toHaveBeenNthCalledWith(
      1,
      "현재 날씨 요청 실패",
      {
        id: "Seoul:current-weather-error"
      }
    );
    expect(mockedToastError).toHaveBeenNthCalledWith(2, "예보 요청 실패", {
      id: "Seoul:forecast-error"
    });
  });
});
