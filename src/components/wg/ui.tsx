import type { ReactNode } from "react";
import type { Risk } from "@/lib/wildguard-data";

export function Panel({
  title,
  action,
  children,
  className = "",
  bodyClass = "p-5",
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClass?: string;
}) {
  return (
    <section className={`panel overflow-hidden ${className}`}>
      {title && (
        <header className="flex items-center justify-between border-b border-border px-5 py-3">
          <h2 className="label-xs text-foreground/80">{title}</h2>
          {action}
        </header>
      )}
      <div className={bodyClass}>{children}</div>
    </section>
  );
}

const RISK_CLASS: Record<string, string> = {
  CRITICAL: "bg-destructive/15 text-destructive border-destructive/40",
  WARNING: "bg-warning/15 text-warning border-warning/40",
  INFO: "bg-info/15 text-info border-info/40",
  RESOLVED: "bg-muted text-muted-foreground border-border",
  ACTIVE: "bg-primary/15 text-primary border-primary/40",
  READY: "bg-primary/15 text-primary border-primary/40",
  ARCHIVED: "bg-muted text-muted-foreground border-border",
  Healthy: "bg-primary/15 text-primary border-primary/40",
  Good: "bg-primary/15 text-primary border-primary/40",
  Degraded: "bg-warning/15 text-warning border-warning/40",
  Fair: "bg-warning/15 text-warning border-warning/40",
  Critical: "bg-destructive/15 text-destructive border-destructive/40",
  Offline: "bg-muted text-muted-foreground border-border",
  Lost: "bg-muted text-muted-foreground border-border",
};

export function Tag({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase ${
        RISK_CLASS[label] ?? "bg-muted text-muted-foreground border-border"
      } ${className}`}
    >
      {label}
    </span>
  );
}

export function Stat({
  label,
  value,
  hint,
  icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
  tone?: "primary" | "destructive" | "info" | "warning";
}) {
  const toneClass = {
    primary: "bg-primary/12 text-primary",
    destructive: "bg-destructive/12 text-destructive",
    info: "bg-info/12 text-info",
    warning: "bg-warning/12 text-warning",
  }[tone];
  return (
    <div className="panel flex items-center gap-4 p-4">
      {icon && (
        <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${toneClass}`}>{icon}</div>
      )}
      <div className="min-w-0">
        <p className="label-xs">{label}</p>
        <p className="mt-0.5 font-mono text-2xl leading-tight font-semibold">{value}</p>
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
}

export function KeyVal({ k, v, tone }: { k: string; v: string; tone?: Risk | "ok" }) {
  const c =
    tone === "CRITICAL"
      ? "text-destructive"
      : tone === "WARNING"
        ? "text-warning"
        : tone === "ok"
          ? "text-primary"
          : "text-foreground";
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-2 last:border-0">
      <span className="text-xs text-muted-foreground">{k}</span>
      <span className={`font-mono text-xs ${c}`}>{v}</span>
    </div>
  );
}

export function PageIntro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
