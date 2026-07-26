import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

export const AlertDialogContent = forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-[2px]" />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2",
        "bg-ink border-2 border-rust/60 shadow-2xl p-6",
        className
      )}
      {...props}
    />
  </AlertDialogPrimitive.Portal>
));
AlertDialogContent.displayName = "AlertDialogContent";

export function AlertDialogTitle({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Title
      className={cn("font-display tracking-wide2 uppercase text-xl text-rust-bright", className)}
      {...props}
    />
  );
}

export function AlertDialogDescription({ className, ...props }) {
  return <AlertDialogPrimitive.Description className={cn("text-sm text-canvas-dim mt-2", className)} {...props} />;
}

export function AlertDialogFooter({ className, ...props }) {
  return <div className={cn("mt-6 flex justify-end gap-3", className)} {...props} />;
}

export const AlertDialogCancel = AlertDialogPrimitive.Cancel;
export const AlertDialogAction = AlertDialogPrimitive.Action;
