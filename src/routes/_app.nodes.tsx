import { createFileRoute } from "@tanstack/react-router";
import { Panel, Stat, Tag } from "@/components/wg/ui";
import { NODES } from "@/lib/wildguard-data";

export const Route = createFileRoute("/_app/nodes")({
  head: () => ({
    meta: [
      { title: "Nodes — WildGuard" },
      { name: "description", content: "Edge node fleet health: runtime, battery, heartbeat, temperature and link state." },
      { property: "og:title", content: "Nodes — WildGuard" },
      { property: "og:description", content: "Track every edge inference node deployed along the corridor." },
    ],
  }),
  component: Nodes,
});

function Nodes() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Nodes Healthy" value="06" hint="Of 09 reporting" />
        <Stat label="Degraded" value="02" hint="N03 • N08" tone="warning" />
        <Stat label="Offline" value="01" hint="N11 heartbeat lost" tone="destructive" />
        <Stat label="Mesh ACK" value="98%" hint="Inter-node delivery" tone="info" />
      </div>

      <Panel title="Edge Node Fleet" bodyClass="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                {["Node", "Runtime", "Health", "Battery", "Heartbeat", "Temp", "Link"].map((h) => (
                  <th key={h} className="label-xs px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NODES.map((n) => (
                <tr key={n.node} className="border-b border-border/50 last:border-0 hover:bg-accent/40">
                  <td className="px-5 py-3 font-mono text-xs">{n.node}</td>
                  <td className="px-5 py-3 text-muted-foreground">{n.runtime}</td>
                  <td className="px-5 py-3"><Tag label={n.health} /></td>
                  <td className="px-5 py-3 font-mono text-xs">{n.battery}</td>
                  <td className="px-5 py-3 font-mono text-xs">{n.heartbeat}</td>
                  <td className="px-5 py-3 font-mono text-xs">{n.temp}</td>
                  <td className="px-5 py-3"><Tag label={n.link} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
