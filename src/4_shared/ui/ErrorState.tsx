type ErrorStateProps = {
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
};

export function ErrorState({
  title,
  message,
  actionLabel = "다시 시도",
  actionHref
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-950"
    >
      <h2 className="text-base font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-6">{message}</p>
      {actionHref ? (
        <a
          href={actionHref}
          className="mt-4 rounded-md bg-[var(--danger)] px-4 py-2 text-sm font-semibold text-white"
        >
          {actionLabel}
        </a>
      ) : null}
    </div>
  );
}
