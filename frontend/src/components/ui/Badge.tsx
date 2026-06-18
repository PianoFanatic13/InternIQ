import { cn } from "../../utils/cn";

export type BadgeVariant =
  | "default"
  | "remote"
  | "visa"
  | "pay"
  | "tech"
  | "source"
  | "grad"
  | "success"
  | "warning"
  | "partial"
  | "unknown";

const variantStyles: Record<BadgeVariant, string> = {
  default:  "bg-[#F3F4F6] text-[#6B7280]",
  remote:   "bg-cyan-50 text-cyan-700",
  visa:     "bg-violet-50 text-violet-700",
  pay:      "bg-[#EFF6FF] text-[#1D5BDA]",
  tech:     "bg-[#F3F4F6] text-[#374151]",
  source:   "bg-transparent text-[#9CA3AF]",
  grad:     "bg-[#EFF6FF] text-[#1D5BDA]",
  success:  "bg-emerald-50 text-emerald-700",
  warning:  "bg-amber-50 text-amber-700",
  partial:  "bg-amber-50 text-amber-600",
  unknown:  "bg-[#F3F4F6] text-[#9CA3AF]",
};

const monoVariants: BadgeVariant[] = ["pay", "tech", "source"];

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ label, variant = "default", className }: BadgeProps) {
  const isMono = monoVariants.includes(variant);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[11px] font-medium leading-none",
        variantStyles[variant],
        className
      )}
      style={isMono ? { fontFamily: "var(--font-mono)" } : undefined}
    >
      {label}
    </span>
  );
}
