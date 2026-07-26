import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn("border border-canvas-dim/30 bg-ink-light/60 relative", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("border-b border-canvas-dim/30 px-5 py-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("font-display tracking-wide2 uppercase text-xl text-canvas", className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-canvas-dim mt-1", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("px-5 py-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return <div className={cn("border-t border-canvas-dim/30 px-5 py-3", className)} {...props} />;
}
