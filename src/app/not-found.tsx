import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-w-[var(--app-min-width)] px-8 py-10">
      <section className="mx-auto flex max-w-7xl flex-col gap-6 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
          404
        </p>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">지원하지 않는 도시입니다</h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
            현재 과제 범위에서는 Seoul, Tokyo, Paris, London 상세 페이지만
            제공합니다.
          </p>
        </div>
        <Link
          href="/"
          className="w-fit rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
        >
          메인으로 돌아가기
        </Link>
      </section>
    </main>
  );
}
