import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Mountain, Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function LoginPage() {
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Mountain
            className="h-10 w-10 text-amber-bright mb-3"
            strokeWidth={1.5}
          />
          <p className="stamp-text text-xs tracking-wide2 uppercase">
            Restricted Access
          </p>
          <h1 className="font-display tracking-wide2 uppercase text-3xl text-canvas mt-1">
            Base Camp HQ
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-canvas-dim/30 bg-ink-light/50 p-6 space-y-5"
        >
          <div>
            <Label htmlFor="email">Username or Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="commander"
              autoComplete="email"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="text-rust-bright text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Enter Base Camp
          </Button>
        </form>
      </div>
    </div>
  );
}
