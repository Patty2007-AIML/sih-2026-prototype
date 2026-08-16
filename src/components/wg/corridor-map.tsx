import { CORRIDOR_NODES } from "@/lib/wildguard-data";

const COLORS: Record<string, string> = {
  healthy: "var(--primary)",
  caution: "var(--warning)",
  critical: "var(--destructive)",
  offline: "var(--muted-foreground)",
};

export function CorridorMap({ height = 300 }: { height?: number }) {
  const path = CORRIDOR_NODES.map((n) => `${n.x},${n.y}`).join(" ");
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg border border-border"
      style={{
        height,
        background:
          "radial-gradient(120% 100% at 30% 20%, oklch(0.28 0.05 155 / .55), transparent 60%), repeating-linear-gradient(135deg, oklch(0.22 0.02 165) 0 14px, oklch(0.2 0.018 168) 14px 28px)",
      }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <polyline points={path} fill="none" stroke="oklch(0.35 0.02 165)" strokeWidth="3.6" strokeLinecap="round" />
        <polyline
          points={path}
          fill="none"
          stroke="oklch(0.85 0.01 160 / .8)"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
      </svg>
      {CORRIDOR_NODES.map((n) => (
        <div
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span
            className="block size-3 rounded-full"
            style={{
              background: COLORS[n.state],
              boxShadow: `0 0 12px ${COLORS[n.state]}`,
              animation: n.state === "critical" ? "pulse 1.2s ease-in-out infinite" : undefined,
            }}
          />
          <span className="mt-1 block font-mono text-[9px] tracking-widest text-muted-foreground">{n.id}</span>
        </div>
      ))}

      <div className="absolute left-[48%] top-[52%] w-44 rounded-md border border-destructive/50 bg-destructive/10 p-3 backdrop-blur">
        <span className="font-mono text-[9px] tracking-widest text-destructive">CRITICAL</span>
        <p className="mt-1 text-xs font-semibold">ANIMAL DETECTED</p>
        <p className="font-mono text-[10px] text-muted-foreground">Node N04 • 14:37:42</p>
      </div>

      <div className="absolute bottom-3 left-4 flex flex-wrap gap-4">
        {(
          [
            ["Healthy", "healthy"],
            ["Caution", "caution"],
            ["Critical", "critical"],
            ["Offline", "offline"],
          ] as const
        ).map(([label, key]) => (
          <span key={key} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="size-2 rounded-full" style={{ background: COLORS[key] }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
