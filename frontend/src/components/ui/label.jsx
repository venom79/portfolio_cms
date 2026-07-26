import * as LabelPrimitive from "@radix-ui/react-label";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Label = forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn("font-display tracking-wide2 uppercase text-xs text-canvas-dim block mb-1.5", className)}
    {...props}
  />
));
Label.displayName = "Label";
