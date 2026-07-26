import { createContext, useContext, useState, useCallback } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "../../lib/utils";

const ToastContext = createContext(null);

/** Call this from anywhere to fire a dispatch note: toast({ title, variant }) */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = "default" }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map((t) => (
          <ToastPrimitive.Root
            key={t.id}
            className={cn(
              "border-2 bg-ink px-4 py-3 shadow-xl flex items-start gap-3 data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-2",
              t.variant === "destructive" ? "border-rust/70" : "border-amber/60"
            )}
            duration={4000}
          >
            {t.variant === "destructive" ? (
              <XCircle className="h-5 w-5 text-rust-bright shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-amber-bright shrink-0 mt-0.5" />
            )}
            <div>
              <ToastPrimitive.Title className="font-display tracking-wide2 uppercase text-sm text-canvas">
                {t.title}
              </ToastPrimitive.Title>
              {t.description && (
                <ToastPrimitive.Description className="text-xs text-canvas-dim mt-0.5">
                  {t.description}
                </ToastPrimitive.Description>
              )}
            </div>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-6 w-full max-w-sm" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}
