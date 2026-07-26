import { Compass } from "lucide-react";

export function EmptyState({ title = "Nothing charted yet", description, action }) {
  return (
    <div className="border border-dashed border-canvas-dim/40 py-16 flex flex-col items-center text-center px-6">
      <Compass className="h-10 w-10 text-amber/50 mb-4" strokeWidth={1.5} />
      <p className="font-display tracking-wide2 uppercase text-xl text-canvas">{title}</p>
      {description && <p className="text-canvas-dim text-sm mt-2 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
