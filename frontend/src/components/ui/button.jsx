import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display tracking-wide2 uppercase text-sm transition-colors disabled:opacity-40 disabled:pointer-events-none border",
  {
    variants: {
      variant: {
        default: "bg-amber text-ink border-amber hover:bg-amber-bright hover:border-amber-bright",
        outline: "bg-transparent text-canvas border-canvas-dim/50 hover:border-amber hover:text-amber-bright",
        ghost: "bg-transparent border-transparent text-canvas-dim hover:text-amber-bright hover:bg-ink-lighter",
        destructive: "bg-rust text-canvas border-rust hover:bg-rust-bright hover:border-rust-bright",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export const Button = forwardRef(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";
