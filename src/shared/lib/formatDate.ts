const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
  weekday: "short"
});

const timeFormatter = new Intl.DateTimeFormat("ko-KR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC"
});

const figmaDayFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC"
});

const figmaTimeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  hour12: true,
  minute: "2-digit",
  timeZone: "UTC"
});

function toDateKeyDate(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, day));
}

function toCityDate(timestamp: string, timezoneOffsetSeconds = 0) {
  return new Date(
    new Date(timestamp).getTime() + timezoneOffsetSeconds * 1000
  );
}

export function formatDate(dateKey: string) {
  return dateFormatter.format(toDateKeyDate(dateKey));
}

export function formatTime(timestamp: string, timezoneOffsetSeconds = 0) {
  return timeFormatter.format(toCityDate(timestamp, timezoneOffsetSeconds));
}

export function formatDateTime(timestamp: string, timezoneOffsetSeconds = 0) {
  const date = toCityDate(timestamp, timezoneOffsetSeconds);

  return `${dateFormatter.format(date)} ${timeFormatter.format(date)}`;
}

export function formatForecastDay(dateKey: string) {
  return figmaDayFormatter.format(toDateKeyDate(dateKey));
}

export function formatForecastTime(timestamp: string, timezoneOffsetSeconds = 0) {
  return figmaTimeFormatter
    .format(toCityDate(timestamp, timezoneOffsetSeconds))
    .replace(" AM", "am")
    .replace(" PM", "pm");
}

export function formatCurrentDateTime(
  timestamp: string,
  timezoneOffsetSeconds = 0
) {
  const date = toCityDate(timestamp, timezoneOffsetSeconds);

  return `${figmaDayFormatter.format(date)}. ${formatForecastTime(
    timestamp,
    timezoneOffsetSeconds
  )}`;
}
