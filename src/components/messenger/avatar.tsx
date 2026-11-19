import { Bookmark, Megaphone, Users } from "lucide-react";
import { cn } from "@/lib/cn";
import { initials, type ChatKind, type Pattern } from "@/lib/messenger/model";

const SIZE = {
  sm: "size-8 text-xs",
  md: "size-12 text-sm",
  lg: "size-11 text-sm",
  xl: "size-24 text-2xl",
} as const;

function PatternMark({ pattern }: { pattern: Pattern }) {
  const stroke = "var(--color-accent)";
  if (pattern === 0) {
    return (
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="20" cy="20" r="15" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.55" />
        <circle cx="20" cy="20" r="7" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.35" />
      </svg>
    );
  }
  if (pattern === 1) {
    return (
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M0 28 L40 8" stroke={stroke} strokeWidth="1.4" opacity="0.45" />
        <path d="M0 18 L40 -2" stroke={stroke} strokeWidth="1.4" opacity="0.3" />
        <path d="M0 38 L40 18" stroke={stroke} strokeWidth="1.4" opacity="0.3" />
      </svg>
    );
  }
  if (pattern === 2) {
    return (
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="12" cy="14" r="2" fill={stroke} opacity="0.55" />
        <circle cx="24" cy="12" r="1.4" fill={stroke} opacity="0.4" />
        <circle cx="28" cy="24" r="2.2" fill={stroke} opacity="0.45" />
        <circle cx="14" cy="28" r="1.5" fill={stroke} opacity="0.35" />
      </svg>
    );
  }
  if (pattern === 3) {
    return (
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M20 6 L34 20 L20 34 L6 20 Z" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
      </svg>
    );
  }
  if (pattern === 4) {
    return (
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M8 32 V12" stroke={stroke} strokeWidth="1.3" opacity="0.45" />
        <path d="M16 32 V18" stroke={stroke} strokeWidth="1.3" opacity="0.35" />
        <path d="M24 32 V10" stroke={stroke} strokeWidth="1.3" opacity="0.5" />
        <path d="M32 32 V20" stroke={stroke} strokeWidth="1.3" opacity="0.3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.35" />
      <path d="M20 8 V20 L30 24" fill="none" stroke={stroke} strokeWidth="1.4" opacity="0.7" />
    </svg>
  );
}

export function Avatar({
  name,
  pattern,
  size = "md",
  online,
  kind,
  badge = true,
}: {
  name: string;
  pattern: Pattern;
  size?: keyof typeof SIZE;
  online?: boolean;
  kind?: ChatKind;
  badge?: boolean;
}) {
  const mark =
    kind === "group" ? (
      <Users className="size-3" />
    ) : kind === "channel" ? (
      <Megaphone className="size-3" />
    ) : kind === "saved" ? (
      <Bookmark className="size-3" />
    ) : null;

  return (
    <span className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-raised text-fg", SIZE[size])}>
      <PatternMark pattern={pattern} />
      <span className="relative font-display tracking-wide">{kind === "saved" ? "" : initials(name)}</span>
      {badge && online && kind !== "group" && kind !== "channel" && kind !== "saved" && (
        <span className="absolute right-0 bottom-0 size-3 rounded-full bg-accent ring-2 ring-panel" />
      )}
      {badge && mark && size !== "sm" && (
        <span className="absolute -right-0.5 -bottom-0.5 grid size-5 place-items-center rounded-full bg-accent text-accent-ink">
          {mark}
        </span>
      )}
    </span>
  );
}
