import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function NordMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="var(--color-accent)" />
      <circle cx="16" cy="17" r="7.2" fill="none" stroke="var(--color-accent-ink)" strokeWidth="1.6" />
      <path d="M16 7.4l2.3 9.1-2.3-1.7-2.3 1.7z" fill="var(--color-accent-ink)" />
    </svg>
  );
}

export function IconButton({
  label,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "tap grid size-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-fg",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
