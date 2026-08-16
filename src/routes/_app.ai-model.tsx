import { createFileRoute } from "@tanstack/react-router";
import { Panel, Stat, KeyVal, Tag } from "@/components/wg/ui";

export const Route = createFileRoute("/_app/ai-model")({
  head: () => ({
    meta: [
      { title: "AI Model — WildGuard" },
      { name: "description", content: "Edge detection model card: YOLO-nano INT8 runtime, accuracy metrics and class support." },
      { property: "og:title", content: "AI Model — WildGuard" },
      { property: "og:description", content: "Model version, benchmarks and per-class detection performance." },
    ],
  }),
  component: AIModel,
});

const CLASSES = [
  { name: "Elephant", ap: 94, imgs: "12,480" },
  { name: "Deer", ap: 91, imgs: "18,220" },
  { name: "Wild Boar", ap: 88, imgs: "9,640" },
  { name: "Nilgai", ap: 85, imgs: "6,110" },
  { name: "Cattle", ap: 90, imgs: "14,050" },
  { name: "Person", ap: 92, imgs: "21,300" },
];

function AIModel() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Model" value="YOLO-n" hint="wildguard-v3.2 • INT8" />
        <Stat label="mAP@0.5" value="90.1%" hint="Location-separated test set" tone="info" />
        <Stat label="Latency" value="38 ms" hint="Per frame on edge board" />
        <Stat label="Power Draw" value="4.6 W" hint="Sustained inference" tone="warning" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <Panel title="Per-Class Performance" bodyClass="p-5">
          <div className="space-y-4">
            {CLASSES.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-xs">
                  <span>{c.name}</span>
                  <span className="font-mono text-muted-foreground">
                    AP {c.ap}% • {c.imgs} frames
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${c.ap}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Runtime">
            <KeyVal k="Framework" v="LiteRT" />
            <KeyVal k="Quantization" v="INT8 post-training" />
            <KeyVal k="Input size" v="640 × 640" />
            <KeyVal k="Tracker" v="ByteTrack-lite" />
            <KeyVal k="Confidence gate" v="0.55" />
            <KeyVal k="Frames to confirm" v="6" />
            <KeyVal k="Board temp" v="52°C" tone="WARNING" />
          </Panel>
          <Panel title="Deployment">
            <div className="flex items-center justify-between border-b border-border/60 py-2">
              <span className="text-xs text-muted-foreground">Rollout state</span>
              <Tag label="ACTIVE" />
            </div>
            <KeyVal k="Nodes updated" v="9 / 9" tone="ok" />
            <KeyVal k="Last OTA sync" v="3 days ago" />
            <KeyVal k="Rollback build" v="v3.1" />
          </Panel>
        </div>
      </div>
    </div>
  );
}
