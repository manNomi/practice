export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--line)] bg-[var(--surface-strong)] p-5 text-sm text-[var(--muted)]">
      {message}
    </div>
  );
}
