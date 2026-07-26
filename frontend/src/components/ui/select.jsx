import * as SelectPrimitive from "@radix-ui/react-select";
import { forwardRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../../lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between border border-canvas-dim/40 bg-ink-light px-3 py-2 text-sm text-canvas",
      "focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon>
      <ChevronDown className="h-4 w-4 text-amber-bright" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn("z-50 border border-canvas-dim/40 bg-ink-light text-canvas shadow-lg", className)}
      position="popper"
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

export const SelectItem = forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex items-center px-6 py-2 text-sm cursor-pointer select-none outline-none",
      "hover:bg-amber/10 focus:bg-amber/10 data-[state=checked]:text-amber-bright",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemIndicator className="absolute left-1.5">
      <Check className="h-3.5 w-3.5" />
    </SelectPrimitive.ItemIndicator>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";
