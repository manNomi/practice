# 구현 노트

## 요구사항 해석

- 과제에는 "Next.js로 프론트엔드와 백엔드 구현"과 "백엔드는 구현 하지 않는다"가 함께 적혀 있다.
- 이번 구현은 별도 API Route나 Route Handler를 만들지 않고 App Router Server Component에서 OpenWeather API를 직접 호출하는 방식으로 해석했다.
- 권장 API key는 `OPENWEATHER_API_KEY`다. 과제 호환을 위해 `NEXT_PUBLIC_OPENWEATHER_API_KEY` fallback은 유지하지만, public env를 사용하면 클라이언트 번들 노출 가능성이 있으므로 README에 trade-off로 명시했다.
- 현재 날씨는 Current Weather API 문서 기준으로 `https://api.openweathermap.org/data/2.5/weather`를 사용한다.
- 5일 예보는 과제 필수 요구를 유지하기 위해 5 Day / 3 Hour Forecast API 문서 기준으로 `https://api.openweathermap.org/data/2.5/forecast`를 사용한다.
- 두 API 모두 city name 대신 `lat`, `lon` 좌표를 사용하므로 Seoul, Tokyo, Paris, London의 좌표를 앱 상수로 관리한다.

## 아키텍처

- `src/app`: Next.js App Router, layout, route entry.
- `src/views`: route-level screen composition.
- `src/widgets`: 현재 날씨 카드, 5일 예보, 도시 선택처럼 의미 있는 화면 섹션.
- `src/entities/weather`: OpenWeather API 호출, cache/revalidate 설정, mapper, domain type.
- `src/shared`: 도시 설정, env, formatter, 공용 상태 UI.

## 안정성 포인트

- API key 누락, loading, current weather 실패, forecast 실패, empty forecast를 각각 분리해서 표시한다.
- current weather와 forecast는 서버에서 `Promise.allSettled`로 병렬 호출하므로 독립적으로 실패할 수 있고, 한쪽 데이터가 성공하면 가능한 범위까지 보여준다.
- 상세 라우트는 `revalidate = 600`과 OpenWeather fetch `next.revalidate`를 사용해 10분 단위로 재검증한다.
- React Query는 dependency로 유지하지만 초기 날씨 데이터에는 사용하지 않는다. 캐시 가능한 초기 데이터는 RSC/ISR이 더 적합하기 때문이다.
- Current Weather와 5 Day / 3 Hour Forecast는 서로 다른 OpenWeather API라 fetch cache tag를 `current`와 `forecast`로 분리했다.
- 5일 예보는 forecast API가 제공하는 3시간 간격 list를 일자별로 묶어 최대 5일을 표시한다.
- 날짜와 시간은 브라우저 로컬 timezone이 아니라 OpenWeather 응답의 도시 timezone offset을 기준으로 표시한다.

## Figma 디자인 반영

- Figma 기준 색상으로 배경, 텍스트, 라인, 핫핑크 액센트, 연분홍 weather badge 토큰을 맞췄다.
- 메인 화면은 `Welcome to / Weather App!`, 도시 버튼, hover/select 상태 예시, 지구 이미지를 Figma 배치에 맞게 구성했다.
- 상세 화면은 상단 지구 이미지, `Weather Information for {city}`, 현재 날씨 카드, 5일 forecast accordion 구조로 구성했다.
- Figma MCP의 short-lived asset URL은 코드에 직접 쓰지 않고 `public/assets/weather-globe.png`로 고정했다.

## 반응형

- 전체 앱 wrapper는 `min-width: 800px`이다.
- 1280px 이상에서는 `max-width: 1280px`와 `margin-inline: auto`로 중앙 정렬한다.
- 800px 미만에서는 body의 horizontal scroll로 레이아웃이 더 줄어들지 않게 했다.
