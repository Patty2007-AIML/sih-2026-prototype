import { createFileRoute } from "@tanstack/react-router";
import { Panel, KeyVal, Tag } from "@/components/wg/ui";
import feedImage from "@/assets/animal-detection.png.asset.json";

export const Route = createFileRoute("/_app/live-camera")({
  head: () => ({
    meta: [
      { title: "Live AI Camera — WildGuard" },
      { name: "description", content: "Live edge camera feed with YOLO detections, road ROI and conflict-zone overlays." },
      { property: "og:title", content: "Live AI Camera — WildGuard" },
      { property: "og:description", content: "Node-level live inference view with risk intelligence and node telemetry." },
    ],
  }),
  component: LiveCamera,
});

function LiveCamera() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
      <Panel
        title="Live AI Camera — Node-04"
        action={
          <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-destructive">
            <span className="size-2 animate-pulse rounded-full bg-destructive" /> LIVE
          </span>
        }
        bodyClass="p-4"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
          <img
            src={feedImage.url}
            alt="Edge camera frame with two animals detected crossing the highway carriageway"
            className="absolute inset-0 size-full object-cover"
          />

          <div className="absolute top-3 left-4 rounded bg-background/60 px-2 py-1 font-mono text-[11px] text-foreground/90">
            <p>14:37:42</p>
            <p className="text-muted-foreground">25-05-2026</p>
          </div>

          <div className="absolute right-4 bottom-3 rounded bg-background/60 px-2 py-1 font-mono text-[10px] tracking-widest text-primary">
            ROAD ROI ACTIVE • 2 TRACKS
          </div>
        </div>
      </Panel>

      <div className="space-y-4">
        <Panel title="Risk Intelligence">
          <KeyVal k="Species" v="Elephant" />
          <KeyVal k="Confidence" v="94.7%" tone="ok" />
          <KeyVal k="Trajectory" v="← Across lane" />
          <KeyVal k="Road occupancy" v="Carriageway" tone="CRITICAL" />
          <KeyVal k="Vehicle approach" v="Eastbound • 86 km/h" />
          <div className="flex items-center justify-between border-b border-border/60 py-2">
            <span className="text-xs text-muted-foreground">Risk state</span>
            <Tag label="CRITICAL" />
          </div>
          <KeyVal k="Time to conflict" v="6.8 s" tone="CRITICAL" />
          <KeyVal k="Multi-frame track" v="18 frames" />
        </Panel>

        <Panel title="Node & Alert Path">
          <KeyVal k="Node ID" v="N04" />
          <KeyVal k="Heartbeat" v="4 s ago" tone="ok" />
          <KeyVal k="Battery" v="34%" tone="WARNING" />
          <KeyVal k="Temperature" v="54°C" tone="WARNING" />
          <KeyVal k="Storage" v="72%" />
          <KeyVal k="AI FPS" v="24.6" />
          <KeyVal k="Beacon latency" v="82 ms" tone="ok" />
          <KeyVal k="Upstream ACK" v="N03, N02" tone="ok" />
        </Panel>
      </div>
    </div>
  );
}
