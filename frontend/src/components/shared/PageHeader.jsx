export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 pb-5 border-b-2 border-amber/30">
      <div>
        {eyebrow && <p className="stencil-label mb-1">{eyebrow}</p>}
        <h1 className="font-display tracking-wide2 uppercase text-4xl text-canvas">{title}</h1>
        {description && <p className="text-canvas-dim text-sm mt-2 max-w-xl">{description}</p>}
      </div>
      {actions && <div className="flex gap-3 shrink-0">{actions}</div>}
    </div>
  );
}
