import { AlertTriangle } from "lucide-react";

export function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="border border-rust/50 bg-rust/10 text-rust-bright px-4 py-3 flex items-center gap-2 text-sm mb-6">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
