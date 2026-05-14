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
npm install
cp .env.example .env.local
```

`.env.local`에 OpenWeather API key를 입력합니다.

```env
OPENWEATHER_API_KEY=your_openweather_api_key
```

기존 과제 호환이 필요하면 `NEXT_PUBLIC_OPENWEATHER_API_KEY`도 fallback으로 사용할 수 있습니다.

개발 서버를 실행합니다.

```bash
npm run dev
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
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run start
```

## Architecture

```text
src/app       Next.js route entries, layout
src/views     Page-level screen composition
src/widgets   Meaningful UI sections
src/entities  Weather domain API, cache config, mappers, types
src/shared    Config, formatters, common UI
```

테스트는 구현 파일과 같은 책임 영역 안의 `__tests__` 폴더에 둡니다. 예를 들어 `src/entities/weather/api/__tests__`처럼 배치해 코드 탐색 시 실제 구현 파일 목록이 과하게 붐비지 않도록 했습니다.

OpenWeather API 호출은 `src/entities/weather/api`의 순수 함수로 분리했고, 상세 페이지는 Server Component에서 데이터를 가져옵니다. UI 컴포넌트는 OpenWeather 원본 응답 대신 mapper가 만든 domain model만 사용합니다.

날씨 상세 라우트는 `generateStaticParams`로 네 도시 경로를 생성하고 `revalidate = 600`으로 10분 단위 ISR을 적용합니다. Current Weather와 5 Day / 3 Hour Forecast는 서버에서 `Promise.allSettled`로 병렬 호출하므로 한쪽 API가 실패해도 성공한 데이터는 가능한 범위까지 표시합니다.

React Query는 과제 stack 요구를 반영해 dependency로 유지하지만, 현재 초기 날씨 데이터는 RSC + Next fetch cache가 더 적합하므로 렌더 경로에서는 사용하지 않습니다. 클라이언트 상태는 forecast accordion의 열림/닫힘 상태만 local state로 둡니다.

OpenWeather API 실패는 화면 내 `ErrorState`로 접근 가능한 상태를 유지하면서 `react-hot-toast`로도 보조 알림을 띄웁니다.

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
npm run lint
npm run typecheck
npm run test
npm run build
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
