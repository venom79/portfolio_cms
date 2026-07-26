import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2 py-0.5 text-[11px] font-display tracking-wide2 uppercase",
  {
    variants: {
      variant: {
        default: "bg-amber/15 text-amber-bright border-amber/40",
        moss: "bg-moss/15 text-moss-bright border-moss/40",
        rust: "bg-rust/15 text-rust-bright border-rust/40",
        outline: "bg-transparent text-canvas-dim border-canvas-dim/40",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
