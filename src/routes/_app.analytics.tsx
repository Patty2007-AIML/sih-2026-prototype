import { createFileRoute } from "@tanstack/react-router";
import { Panel, Stat } from "@/components/wg/ui";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — WildGuard" },
      { name: "description", content: "Species mix, crossing time-of-day distribution and corridor risk trends." },
      { property: "og:title", content: "Analytics — WildGuard" },
      { property: "og:description", content: "Corridor analytics for wildlife crossings and warning performance." },
    ],
  }),
  component: Analytics,
});

const HOURS = [
  { h: "00", v: 42 }, { h: "02", v: 55 }, { h: "04", v: 71 }, { h: "06", v: 38 },
  { h: "08", v: 21 }, { h: "10", v: 14 }, { h: "12", v: 11 }, { h: "14", v: 18 },
  { h: "16", v: 29 }, { h: "18", v: 64 }, { h: "20", v: 88 }, { h: "22", v: 76 },
];

const SPECIES = [
  { name: "Deer", pct: 41, tone: "bg-primary" },
  { name: "Wild Boar", pct: 24, tone: "bg-warning" },
  { name: "Elephant", pct: 17, tone: "bg-destructive" },
  { name: "Nilgai", pct: 11, tone: "bg-info" },
  { name: "Other", pct: 7, tone: "bg-muted-foreground" },
];

function Analytics() {
  const max = Math.max(...HOURS.map((x) => x.v));
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Detections (7d)" value="1,284" hint="+8.4% vs previous week" />
        <Stat label="Critical Warnings" value="46" hint="Carriageway occupancy" tone="destructive" />
        <Stat label="Avg Warning Lead" value="7.4 s" hint="Before conflict point" tone="info" />
        <Stat label="False Positive Rate" value="3.1%" hint="Reviewed clips" tone="warning" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <Panel title="Crossing Activity by Hour" action={<span className="font-mono text-[10px] tracking-widest text-muted-foreground">LAST 7 DAYS</span>}>
          <div className="flex h-64 items-end gap-2">
            {HOURS.map((x) => (
              <div key={x.h} className="flex flex-1 flex-col items-center gap-2">
                <span className="font-mono text-[10px] text-muted-foreground">{x.v}</span>
                <div
                  className="w-full rounded-t bg-primary/70"
                  style={{ height: `${(x.v / max) * 100}%` }}
                />
                <span className="font-mono text-[10px] text-muted-foreground">{x.h}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Species Distribution">
          <div className="space-y-4">
            {SPECIES.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className="font-mono">{s.pct}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-muted">
                  <div className={`h-2 rounded-full ${s.tone}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
