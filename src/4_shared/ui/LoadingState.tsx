export function LoadingState({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]"
    >
      {label}
    </div>
  );
}
