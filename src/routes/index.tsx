import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { OFFICERS } from "@/lib/wildguard-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Command Center Login — WildGuard" },
      {
        name: "description",
        content:
          "Secure officer login for the WildGuard offline-first wildlife crossing detection and corridor response system.",
      },
      { property: "og:title", content: "Command Center Login — WildGuard" },
      {
        property: "og:description",
        content: "Government wildlife crossing detection and corridor response system.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const officer = OFFICERS.find((o) => o.id === id.trim() && o.password === pw);
    if (!officer) {
      setError("Invalid officer ID or password.");
      return;
    }
    window.localStorage.setItem(
      "wg-officer",
      JSON.stringify({ id: officer.id, name: officer.name, role: officer.role }),
    );
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="auth-bg grid min-h-screen items-center gap-12 px-8 py-16 lg:grid-cols-2 lg:px-20">
      <div className="max-w-lg">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Leaf className="size-6" />
          </span>
          <div>
            <p className="text-lg font-bold tracking-[0.18em]">WILDGUARD</p>
            <p className="label-xs text-[9px]">Edge • Wildlife Crossing</p>
          </div>
        </div>

        <p className="mt-14 flex items-center gap-3 label-xs">
          <span className="h-px w-8 bg-border" /> Edge AI • Offline-First
        </p>
        <h1 className="mt-4 text-5xl leading-tight font-semibold tracking-tight">
          Safer roads.
          <br />
          <span className="text-primary">Wildlife protected.</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Government wildlife crossing detection and corridor response system.
        </p>

        <div className="mt-8 flex max-w-sm items-center gap-3 rounded-lg border border-primary/40 bg-primary/10 p-4">
          <ShieldCheck className="size-5 text-primary" />
          <div>
            <p className="font-mono text-[11px] tracking-widest text-primary uppercase">Full local operation</p>
            <p className="text-[11px] text-muted-foreground">
              Edge AI, local database and warning network operational
            </p>
          </div>
        </div>
      </div>

      <div className="panel w-full max-w-md justify-self-center p-8 lg:justify-self-end">
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Lock className="size-6" />
        </span>
        <p className="mt-6 label-xs text-primary">Secure officer access</p>
        <h2 className="mt-1 text-2xl font-semibold">Command Center Login</h2>
        <p className="mt-1 text-sm text-muted-foreground">Enter your assigned Wildlife Guard credentials.</p>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <div>
            <label className="text-xs text-muted-foreground" htmlFor="officer">
              Officer ID
            </label>
            <input
              id="officer"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="eg. WGO-1001"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground" htmlFor="pw">
              Password
            </label>
            <input
              id="pw"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Enter password"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-primary"
            />
          </div>
          {error && <p className="font-mono text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            className="flex w-full items-center justify-between rounded-md bg-primary px-4 py-3 font-mono text-xs tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            Login to system <ArrowRight className="size-4" />
          </button>
        </form>

        <div className="mt-7 border-t border-border pt-5">
          <p className="label-xs">Demo officer accounts</p>
          <div className="mt-3 space-y-2">
            {OFFICERS.map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setId(o.id);
                  setPw(o.password);
                }}
                className="flex w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-left transition-colors hover:border-primary/50"
              >
                <span className="font-mono text-[11px]">{o.id}</span>
                <span className="font-mono text-[11px] text-primary">{o.password}</span>
                <span className="text-[10px] text-muted-foreground">{o.role}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
          <ShieldCheck className="size-3.5" /> Secure local authentication • Activity logged
        </p>
      </div>
    </div>
  );
}
