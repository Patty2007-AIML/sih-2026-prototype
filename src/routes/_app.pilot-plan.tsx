import { createFileRoute } from "@tanstack/react-router";
import { Panel, Stat } from "@/components/wg/ui";
import { ROADMAP } from "@/lib/wildguard-data";

export const Route = createFileRoute("/_app/pilot-plan")({
  head: () => ({
    meta: [
      { title: "Pilot Plan — WildGuard" },
      { name: "description", content: "Phased deployment roadmap from corridor survey to field pilot evaluation." },
      { property: "og:title", content: "Pilot Plan — WildGuard" },
      { property: "og:description", content: "Seven-stage rollout plan for the WildGuard corridor safety pilot." },
    ],
  }),
  component: PilotPlan,
});

function PilotPlan() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Pilot Stages" value="07" hint="Survey to field evaluation" />
        <Stat label="Current Stage" value="04" hint="Risk + warnings" tone="info" />
        <Stat label="Pilot Nodes" value="3-5" hint="Controlled hazard tests" tone="warning" />
        <Stat label="Timeline" value="12 wk" hint="Plus 3-6 month field pilot" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <Panel title="Implementation Roadmap">
          <ol className="relative space-y-6 border-l border-border pl-6">
            {ROADMAP.map((r) => (
              <li key={r.n} className="relative">
                <span className="absolute -left-[31px] flex size-6 items-center justify-center rounded-full border border-primary/40 bg-primary/12 font-mono text-[10px] text-primary">
                  {r.n}
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-medium">{r.title}</p>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">{r.when}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{r.detail}</p>
              </li>
            ))}
          </ol>
        </Panel>

        <div className="space-y-4">
          <Panel title="Minimum Demo">
            <ul className="space-y-2">
              {MIN_DEMO.map((d) => (
                <li key={d} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {d}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Validation Gates">
            <ul className="space-y-2">
              {GATES.map((g) => (
                <li key={g} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-info" />
                  {g}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

const MIN_DEMO = [
  "Three simulated or physical camera nodes",
  "YOLO model running on an edge board",
  "Road ROI + tracking + 3 risk states",
  "Node 2 triggers Node 1 upstream beacon",
  "Internet disconnected during detection",
  "Dashboard logs health, class and evidence clip",
];

const GATES = [
  "Model: recall and precision on annotated test videos",
  "Edge: continuous benchmark at field temperature",
  "System: correct upstream warning before conflict",
  "Adverse conditions: night, rain, fog and glare",
  "Fail-safe: blocked camera, reboot and missed heartbeat",
  "Connectivity: internet loss and neighbor-link retry",
];

