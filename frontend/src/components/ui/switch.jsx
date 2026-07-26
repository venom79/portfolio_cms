import * as SwitchPrimitive from "@radix-ui/react-switch";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Switch = forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "w-10 h-5 border border-canvas-dim/40 bg-ink-lighter relative shrink-0 transition-colors",
      "data-[state=checked]:bg-amber/30 data-[state=checked]:border-amber",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "block h-3.5 w-3.5 bg-canvas-dim translate-x-0.5 transition-transform",
        "data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-amber-bright"
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";
