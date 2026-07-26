import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2",
        "bg-ink border-2 border-amber/50 shadow-2xl max-h-[88vh] overflow-y-auto",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 text-canvas-dim hover:text-amber-bright transition-colors">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "DialogContent";

export function DialogHeader({ className, ...props }) {
  return <div className={cn("px-6 pt-6 pb-4 border-b border-canvas-dim/30", className)} {...props} />;
}

export function DialogTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      className={cn("font-display tracking-wide2 uppercase text-2xl text-amber-bright", className)}
      {...props}
    />
  );
}

export function DialogDescription({ className, ...props }) {
  return <DialogPrimitive.Description className={cn("text-sm text-canvas-dim mt-1", className)} {...props} />;
}

export function DialogBody({ className, ...props }) {
  return <div className={cn("px-6 py-5 space-y-5", className)} {...props} />;
}

export function DialogFooter({ className, ...props }) {
  return (
    <div
      className={cn("px-6 py-4 border-t border-canvas-dim/30 flex justify-end gap-3", className)}
      {...props}
    />
  );
}
