import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/wg/ui";

export const Route = createFileRoute("/_app/hotspots")({
  head: () => ({
    meta: [
      { title: "Hotspots — WildGuard" },
      { name: "description", content: "Wildlife crossing hotspot heatmap with species, time, season and risk filters." },
      { property: "og:title", content: "Hotspots — WildGuard" },
      { property: "og:description", content: "Where and when animals cross the monitored corridor." },
    ],
  }),
  component: Hotspots,
});

const ZONES = [
  { x: 22, y: 60, r: 130, level: "high", km: "KM 42–44" },
  { x: 48, y: 35, r: 110, level: "high", km: "KM 51–53" },
  { x: 68, y: 62, r: 90, level: "medium", km: "KM 60–61" },
  { x: 84, y: 30, r: 70, level: "medium", km: "KM 68–69" },
  { x: 12, y: 25, r: 60, level: "low", km: "KM 33–34" },
];

const COLOR: Record<string, string> = {
  high: "oklch(0.62 0.22 22 / .45)",
  medium: "oklch(0.78 0.15 78 / .4)",
  low: "oklch(0.74 0.19 145 / .32)",
};

function Hotspots() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
      <Panel
        title="Wildlife Crossing Hotspots"
        action={<span className="font-mono text-[10px] tracking-widest text-muted-foreground">LAST 24 HOURS</span>}
        bodyClass="p-4"
      >
        <div
          className="relative h-[460px] w-full overflow-hidden rounded-lg border border-border"
          style={{
            background:
              "repeating-linear-gradient(135deg, oklch(0.22 0.02 165) 0 16px, oklch(0.2 0.018 168) 16px 32px)",
          }}
        >
          {ZONES.map((z) => (
            <div
              key={z.km}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${z.x}%`,
                top: `${z.y}%`,
                width: z.r,
                height: z.r,
                background: `radial-gradient(circle, ${COLOR[z.level]} 0%, transparent 70%)`,
              }}
            >
              <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-foreground/80">
                {z.km}
              </span>
            </div>
          ))}
          <div className="absolute bottom-3 left-4 flex gap-4">
            {(["high", "medium", "low"] as const).map((l) => (
              <span key={l} className="flex items-center gap-1.5 text-[11px] text-muted-foreground capitalize">
                <span className="size-2 rounded-full" style={{ background: COLOR[l] }} />
                {l}
              </span>
            ))}
          </div>
        </div>
      </Panel>

      <Panel title="Hotspot Filters">
        <div className="space-y-3">
          {[
            ["Species", "All"],
            ["Time", "24 Hours"],
            ["Season", "Monsoon"],
            ["Risk", "All"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between rounded-md border border-border bg-panel/60 px-3 py-2.5 text-xs">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-mono">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2 border-t border-border pt-4 text-xs">
          <p className="text-primary">5 active zones</p>
          <p className="text-muted-foreground">Highest activity: KM 42–44</p>
          <p className="text-muted-foreground">Peak window: 18:00–22:00</p>
        </div>
      </Panel>
    </div>
  );
}
