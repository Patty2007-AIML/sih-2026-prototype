import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play } from "lucide-react";
import { Panel, Stat, Tag, KeyVal } from "@/components/wg/ui";
import { SCENARIOS } from "@/lib/wildguard-data";

export const Route = createFileRoute("/_app/ai-model")({
  head: () => ({
    meta: [
      { title: "AI Model — WildGuard" },
      { name: "description", content: "Edge YOLO INT8 model status, offline pilot scenarios and validation profile." },
      { property: "og:title", content: "AI Model — WildGuard" },
      { property: "og:description", content: "Run offline pilot scenarios and review edge model benchmarks." },
    ],
  }),
  component: AIModel,
});

const METRICS = [
  { k: "Hazard recall", v: "92.1%" },
  { k: "Precision", v: "94.8%" },
  { k: "mAP50-95", v: "71.6%" },
  { k: "Edge latency", v: "82 ms" },
  { k: "Night/rain recall", v: "88.6%" },
  { k: "False critical", v: "0.14 / h" },
];

const PROFILE = [
  "Corridor-relevant species only",
  "Location-separated train/test",
  "Day / night / rain coverage",
  "Hard negatives included",
  "Class-level recall reported",
  "Actual edge hardware benchmark",
];

function AIModel() {
  const [active, setActive] = useState(0);
  const scenario = SCENARIOS[active] ?? SCENARIOS[0]!;

  return (
    <div className="space-y-4">
      <Panel title="Offline Pilot Test — Select Scenario">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SCENARIOS.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                i === active
                  ? "border-primary/50 bg-primary/10"
                  : "border-border hover:border-primary/30 hover:bg-accent/40"
              }`}
            >
              <span className="text-xl">{s.emoji}</span>
              <span className="flex-1 text-sm">{s.name}</span>
            </button>
          ))}
        </div>
      </Panel>

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <Panel title="Edge Model Status">
          <p className="text-sm font-medium">WildGuard YOLO-Nano INT8</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Validated model exported to a TFLite/LiteRT-compatible runtime and benchmarked on the roadside edge board.
          </p>
          <div className="mt-4 grid gap-x-6 sm:grid-cols-2">
            {METRICS.map((m) => (
              <KeyVal key={m.k} k={m.k} v={m.v} />
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Active Demo">
            <div className="flex items-center justify-between">
              <span className="label-xs text-[9px]">Ready to simulate</span>
              <Tag label={scenario.level} />
            </div>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium">
              <span className="text-lg">{scenario.emoji}</span> {scenario.name}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Run a controlled event to verify local inference and direction-aware warning propagation.
            </p>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 font-mono text-[11px] tracking-widest text-primary-foreground transition-colors hover:bg-primary/90">
              <Play className="size-3.5" /> RUN OFFLINE SCENARIO
            </button>
          </Panel>

          <Panel title="Dataset & Validation Profile">
            <ul className="space-y-2">
              {PROFILE.map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
