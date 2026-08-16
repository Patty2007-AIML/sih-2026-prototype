import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Check } from "lucide-react";
import { Panel, Stat, Tag } from "@/components/wg/ui";

export const Route = createFileRoute("/_app/risk-intelligence")({
  head: () => ({
    meta: [
      { title: "Risk Intelligence — WildGuard" },
      { name: "description", content: "Collision-risk signals, edge decision pipeline and false-alarm controls." },
      { property: "og:title", content: "Risk Intelligence — WildGuard" },
      { property: "og:description", content: "How WildGuard turns a detection into a confirmed collision risk." },
    ],
  }),
  component: RiskIntelligence,
});

const SIGNALS = [
  ["Road occupancy", "Carriageway", "CRITICAL"],
  ["Trajectory", "Crossing west", "CRITICAL"],
  ["Persistence", "18 confirmed frames", "ACTIVE"],
  ["Vehicle approach", "86 km/h eastbound", "CRITICAL"],
  ["Time to conflict", "6.8 seconds", "CRITICAL"],
  ["Visibility", "Daylight / clear", "ACTIVE"],
] as const;

const PIPELINE = [
  "YOLO detection",
  "Multi-frame tracking",
  "Road ROI classification",
  "Vehicle approach",
  "Risk state",
  "Local + upstream warning",
];

const CONTROLS = [
  "Polygonal road ROI",
  "Class-specific thresholds",
  "Persistent multi-frame track",
  "Duplicate alert suppression",
  "Clear-state cooldown",
  "Officer verification loop",
];

function RiskIntelligence() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Detection Confidence" value="94.7%" hint="Elephant • N04" />
        <Stat label="Risk Score" value="0.93" hint="Critical threshold 0.78" tone="destructive" />
        <Stat label="Time to Conflict" value="6.8 s" hint="Predicted conflict point" tone="warning" />
        <Stat label="Warning Lead" value="7.8 s" hint="Upstream sign to conflict" tone="info" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Panel title="Collision-Risk Signals">
            <div className="grid gap-3 sm:grid-cols-2">
              {SIGNALS.map(([k, v, tag]) => (
                <div key={k} className="flex items-center justify-between rounded-md bg-panel/60 px-3 py-2.5">
                  <div>
                    <p className="text-xs font-medium">{k}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{v}</p>
                  </div>
                  <Tag label={tag} />
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-md border border-destructive/40 bg-destructive/10 p-4">
              <AlertTriangle className="mt-0.5 size-5 text-destructive" />
              <div>
                <p className="font-mono text-[11px] tracking-widest text-destructive uppercase">
                  Critical decision confirmed
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Confirmed animal + road/trajectory conflict + approaching traffic + short time-to-conflict
                </p>
              </div>
            </div>
          </Panel>

          <Panel title="Edge Decision Pipeline">
            <ol className="flex flex-wrap items-center gap-2">
              {PIPELINE.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="flex items-center gap-2 rounded-md border border-border bg-panel/60 px-3 py-2 text-xs">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] text-primary">
                      {i + 1}
                    </span>
                    {step}
                  </span>
                  {i < PIPELINE.length - 1 && <span className="text-muted-foreground">→</span>}
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <Panel title="False-Alarm Controls">
          <ul className="space-y-3">
            {CONTROLS.map((c) => (
              <li key={c} className="flex items-center gap-3 text-sm">
                <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3" />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
