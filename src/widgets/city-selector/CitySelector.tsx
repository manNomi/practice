import Link from "next/link";
import { CITY_META, SUPPORTED_CITIES } from "@/shared/config/cities";

export function CitySelector() {
  return (
    <nav
      aria-label="도시 선택"
      className="mx-auto flex h-10 items-center justify-center gap-2.5"
    >
      {SUPPORTED_CITIES.map((city) => {
        return (
          <Link
            key={city}
            href={`/${city}`}
            className="flex h-10 min-w-[140px] items-center justify-center rounded-md border border-[var(--primary)] bg-white px-[50px] text-base leading-normal tracking-normal text-[var(--primary)] transition hover:border-[var(--primary-strong)] hover:bg-[var(--accent)]"
          >
            {CITY_META[city].city}
          </Link>
        );
      })}
    </nav>
  );
}
