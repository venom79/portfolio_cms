import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Textarea = forwardRef(({ className, rows = 4, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    className={cn(
      "flex w-full border border-canvas-dim/40 bg-ink-light px-3 py-2 text-sm text-canvas placeholder:text-canvas-dim/60",
      "focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber resize-y",
      "disabled:opacity-40 disabled:cursor-not-allowed",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
