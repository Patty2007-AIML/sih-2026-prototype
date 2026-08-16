import { createFileRoute } from "@tanstack/react-router";
import { Panel, Stat } from "@/components/wg/ui";
import { CorridorMap as Map } from "@/components/wg/corridor-map";

export const Route = createFileRoute("/_app/corridor-map")({
  head: () => ({
    meta: [
      { title: "Corridor Map — WildGuard" },
      { name: "description", content: "NH-44 corridor monitoring map with node spacing, overlap watch and link health." },
      { property: "og:title", content: "Corridor Map — WildGuard" },
      { property: "og:description", content: "Live corridor node states across the monitored wildlife crossing stretch." },
    ],
  }),
  component: CorridorMapPage,
});

function CorridorMapPage() {
  return (
    <div className="space-y-4">
      <Panel
        title="NH-44 — Corridor Monitoring"
        action={<span className="font-mono text-[10px] tracking-widest text-muted-foreground">ALL NODES</span>}
        bodyClass="p-4"
      >
        <Map height={460} />
      </Panel>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Node Spacing" value="150-200 m" hint="Site-survey baseline" />
        <Stat label="Overlap Watch" value="02" hint="Curve and median zones" tone="warning" />
        <Stat label="Critical" value="01" hint="Node N04" tone="destructive" />
        <Stat label="Local Link" value="98%" hint="ACK success" tone="info" />
      </div>
    </div>
  );
}
