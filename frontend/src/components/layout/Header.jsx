export function Header() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-canvas-dim/25 bg-ink/60 backdrop-blur-sm sticky top-0 z-10">
      <p className="stamp-text text-xs tracking-wide2 uppercase">{today}</p>
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-moss-bright" />
        <p className="stencil-label text-xs">Backend Online</p>
      </div>
    </header>
  );
}
