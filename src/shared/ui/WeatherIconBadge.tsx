import Image from "next/image";

type WeatherIconBadgeProps = {
  iconCode?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClassName = {
  sm: "h-[60px] w-[60px] text-[10px]",
  md: "h-20 w-20 text-[13px]",
  lg: "h-24 w-24 text-sm"
};

const imageSize = {
  sm: 44,
  md: 58,
  lg: 72
};

export function WeatherIconBadge({
  iconCode,
  size = "md"
}: WeatherIconBadgeProps) {
  return (
    <div
      className={`${sizeClassName[size]} relative flex shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-center font-bold leading-[1.1] tracking-normal text-black`}
    >
      {iconCode ? (
        <Image
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt=""
          width={imageSize[size]}
          height={imageSize[size]}
          className="h-auto w-auto"
        />
      ) : (
        <span>
          Weather
          <br />
          icon
        </span>
      )}
    </div>
  );
}
