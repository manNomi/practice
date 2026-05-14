# Toss Weather Assignment

OpenWeather API를 사용해 Seoul, Tokyo, Paris, London의 현재 날씨와 5일 / 3시간 단위 예보를 보여주는 Next.js 16 과제 구현입니다.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- TanStack React Query
- react-hot-toast
- Jest + Testing Library

## Getting Started

```bash
pnpm install
cp .env.example .env.local
```

`.env.local`에 OpenWeather API key를 입력합니다.

```env
OPENWEATHER_API_KEY=your_openweather_api_key
```

기존 과제 호환이 필요하면 `NEXT_PUBLIC_OPENWEATHER_API_KEY`도 fallback으로 사용할 수 있습니다.

개발 서버를 실행합니다.

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속합니다.

## Routes

- `/`
- `/Seoul`
- `/Tokyo`
- `/Paris`
- `/London`

소문자 경로(`/seoul`)는 canonical route(`/Seoul`)로 redirect합니다. 지원하지 않는 도시는 not found 화면을 보여줍니다.

## Scripts

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

## Architecture

```text
src/app          0_App, Next.js reserved route entries and layout
src/1_app-pages 1_App-pages, page-level screen composition
src/2_widgets   2_Widgets, meaningful UI sections
src/3_entities  3_Entities, weather API call layer only
src/4_shared    4_Shared, config, formatters, mappers, types, common UI
```

`src/app`은 Next.js App Router가 요구하는 예약 경로라 `src/0_app`으로 물리 이름을 바꾸지 않고, FSD 순서상 0번 레이어로 취급합니다.

테스트는 구현 파일과 같은 책임 영역 안의 `__tests__` 폴더에 둡니다. 예를 들어 `src/3_entities/weather/api/__tests__`처럼 배치해 코드 탐색 시 실제 구현 파일 목록이 과하게 붐비지 않도록 했습니다.

OpenWeather API 호출은 `src/3_entities/weather/api`의 순수 함수로 분리했고, 상세 페이지는 Server Component에서 데이터를 가져옵니다. API error, URL config, mapper, type처럼 API 호출 자체가 아닌 공통 코드는 `src/4_shared`에 둡니다.

날씨 상세 라우트는 `generateStaticParams`로 네 도시 경로를 생성하고 `revalidate = 600`으로 10분 단위 ISR을 적용합니다. Current Weather와 5 Day / 3 Hour Forecast는 서버에서 `Promise.allSettled`로 병렬 호출하므로 한쪽 API가 실패해도 성공한 데이터는 가능한 범위까지 표시합니다.

React Query는 과제 stack 요구를 반영해 dependency로 유지합니다. 다만 현재 화면의 서버 상태는 도시 상세 진입 시 필요한 초기 날씨 데이터이고, 백엔드/Route Handler 없이 API key 노출을 줄이는 것이 더 중요하다고 판단해 렌더 경로는 Server Component + Next `fetch` cache + ISR로 구성했습니다. 클라이언트에서 사용자 입력에 따라 재조회하거나 polling/optimistic update가 필요한 요구가 생기면 React Query를 붙일 수 있도록 API 함수는 순수 함수로 유지했습니다.

OpenWeather API 실패는 화면 내 `ErrorState`로 접근 가능한 상태를 유지하면서 `react-hot-toast`로도 보조 알림을 띄웁니다.

## Design Rationale

이번 구현은 과제 요구사항을 만족하면서 리뷰어가 데이터 흐름과 책임 경계를 빠르게 읽을 수 있게 만드는 데 초점을 뒀습니다.

- **라우트에서 데이터 로드**: 날씨 상세 화면의 API 호출은 `src/app/[city]/page.tsx`에서 수행하고, 화면 컴포넌트는 `weather` props를 렌더링만 합니다. 이렇게 하면 App Router의 Server Component, `generateStaticParams`, `revalidate`를 한곳에서 이해할 수 있고, 페이지 UI가 API 호출 방식에 직접 묶이지 않습니다.
- **RSC + ISR 우선**: 날씨 데이터는 초 단위 실시간성이 필요하지 않고, 도시도 네 개로 고정되어 있습니다. 그래서 상세 페이지를 10분 단위로 재검증되는 정적 경로로 만들고, OpenWeather 요청에는 Next `fetch` cache tag를 붙였습니다. React Query는 요구 stack을 고려해 유지하되, 현재 요구에서는 클라이언트 fetch보다 서버 캐시가 더 단순하고 API key 노출도 줄일 수 있다고 판단했습니다.
- **가벼운 FSD 구조**: `app`은 Next 예약 경로라 0번 레이어로 두고, `1_app-pages`, `2_widgets`, `3_entities`, `4_shared` 순서로 책임을 분리했습니다. `entities`에는 OpenWeather API 호출 함수만 두고, URL 설정, formatter, mapper, 에러 유틸, 공용 타입은 `shared`로 옮겨 도메인 폴더가 비대해지지 않게 했습니다.
- **부분 실패를 허용하는 UI**: current와 forecast는 `Promise.allSettled`로 병렬 호출합니다. 한쪽 API가 실패해도 성공한 데이터는 계속 보여주고, 실패한 영역은 inline error와 toast로 함께 알려 접근성과 즉시성을 둘 다 챙겼습니다.
- **Figma와 과제 반응형의 균형**: Figma의 1280px 아트보드형 디자인, 연분홍 배경, 핫핑크 액센트, weather globe asset은 유지하되, 과제의 1280px 이상 중앙 정렬, 800px 이상 full width, 800px 미만 horizontal scroll 규칙을 우선했습니다.
- **테스트 기준**: 단순 문구 렌더링보다 city validation, timezone formatter, OpenWeather mapper, forecast grouping, API partial failure, accordion 상태처럼 동작이 깨졌을 때 실제 회귀를 알려주는 테스트를 우선했습니다.

현재 날씨 API 주소는 OpenWeather Current Weather API 문서 기준입니다.

```text
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
```

5일 예보는 과제 필수 요구를 유지하기 위해 OpenWeather 5 Day / 3 Hour Forecast API를 사용합니다.

```text
https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
```

두 API 모두 city name이 아니라 좌표 기반으로 호출하므로 앱 내부에서 네 도시의 `lat`, `lon`을 관리합니다.

## API Key / Cache Trade-off

과제에 "백엔드는 구현 하지 않는다"는 조건이 있어 Next Route Handler나 별도 API 서버를 만들지 않았습니다. 대신 App Router Server Component에서 OpenWeather API를 직접 호출해 브라우저 번들로 key가 전달되지 않도록 했습니다.

권장 환경 변수는 `OPENWEATHER_API_KEY`입니다. `NEXT_PUBLIC_OPENWEATHER_API_KEY`는 이전 브라우저 직접 호출 방식과의 호환을 위한 fallback이며, 사용 시 클라이언트 번들 노출 가능성이 있으므로 실서비스에서는 서버 측 proxy, rate limiting, key rotation을 적용해야 합니다.

날씨 데이터는 초 단위 실시간성이 필요하지 않다고 보고 10분 revalidation을 적용했습니다. `fetch`에는 city별 cache tag도 붙여 두어 향후 on-demand revalidation이 필요할 때 확장할 수 있습니다.

## Responsive Rules

- 1280px 이상: 레이아웃을 `max-width: 1280px`로 화면 가운데 배치
- 800px 이상 1280px 미만: 레이아웃이 화면 width를 100% 차지
- 800px 미만: 레이아웃은 더 줄어들지 않고 horizontal scroll로 확인

## Implementation Notes

리서치와 구현 해석은 [docs/implementation-notes.md](docs/implementation-notes.md)에 정리했습니다.

## Figma Design

제공된 Figma 화면을 기준으로 연분홍 배경, 핫핑크 버튼/accordion accent, Pretendard 우선 폰트, 중앙 정렬된 1280px 아트보드형 레이아웃을 반영했습니다. Figma 이미지 자산은 `public/assets/weather-globe.png`로 고정해 사용합니다.

## Verification

제출 전 다음 명령으로 확인합니다.

```bash
pnpm lint
pnpm typecheck
pnpm test --runInBand
pnpm build
```

수동 확인 항목:

- 메인 페이지에서 네 도시 버튼이 보이는지 확인
- 각 버튼 클릭 시 `/Seoul`, `/Tokyo`, `/Paris`, `/London`으로 이동하는지 확인
- API key가 없을 때 안내 메시지가 보이는지 확인
- Current/Forecast 중 한 API가 실패해도 성공한 영역이 유지되는지 확인
- 1280px, 1000px, 799px viewport에서 레이아웃 규칙 확인

## Codex Plugin

Toss Place FE Superpowers 플러그인을 repo-local plugin으로 함께 포함했습니다.

- Plugin source: `plugins/toss-place-fe-superpowers`
- Marketplace entry: `.agents/plugins/marketplace.json`

Vercel React Best Practices 스킬도 repo-local 자료로 포함했습니다.

- Skill source: `.agents/skills/react-best-practices`
