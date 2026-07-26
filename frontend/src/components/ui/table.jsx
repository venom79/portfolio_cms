import { cn } from "../../lib/utils";

export function Table({ className, ...props }) {
  return (
    <div className="w-full overflow-auto border border-canvas-dim/30">
      <table className={cn("w-full text-sm text-left", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }) {
  return <thead className={cn("bg-ink-lighter border-b border-canvas-dim/30", className)} {...props} />;
}

export function TableBody({ className, ...props }) {
  return <tbody className={cn("divide-y divide-canvas-dim/15", className)} {...props} />;
}

export function TableRow({ className, ...props }) {
  return <tr className={cn("hover:bg-ink-lighter/60 transition-colors", className)} {...props} />;
}

export function TableHead({ className, ...props }) {
  return (
    <th
      className={cn(
        "px-4 py-3 font-display tracking-wide2 uppercase text-xs text-amber-bright",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }) {
  return <td className={cn("px-4 py-3 align-middle text-canvas", className)} {...props} />;
}
