type FormatTemperatureOptions = {
  precision?: number;
};

export function formatTemperature(
  value: number,
  options: FormatTemperatureOptions = {}
) {
  const precision = options.precision ?? 0;

  return `${value.toFixed(precision)}℃`;
}
