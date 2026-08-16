import { createFileRoute, Link } from "@tanstack/react-router";
import { Radio, Siren, Activity, Gauge, Cpu, Camera, Database, Wifi } from "lucide-react";
import { Panel, Stat, Tag } from "@/components/wg/ui";
import { CorridorMap } from "@/components/wg/corridor-map";
import { RECENT_ALERTS } from "@/lib/wildguard-data";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — WildGuard Command Center" },
      { name: "description", content: "Offline-first corridor safety overview, node health and live wildlife activity." },
      { property: "og:title", content: "Dashboard — WildGuard Command Center" },
      { property: "og:description", content: "Corridor overview, alerts and edge system status." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <Panel title="Corridor Overview — NH-44" bodyClass="p-4">
          <CorridorMap height={310} />
        </Panel>
        <Panel
          title="Recent Alerts"
          action={
            <Link to="/alerts" className="text-[11px] text-primary hover:underline">
              View All
            </Link>
          }
          bodyClass="p-3"
        >
          <ul className="space-y-2">
            {RECENT_ALERTS.map((a) => (
              <li key={a.name + a.time} className="flex items-center gap-3 rounded-md bg-panel/60 px-3 py-2.5">
                <span className="text-lg">{a.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{a.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    Node {a.node} • {a.time}
                  </p>
                </div>
                <Tag label={a.level} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Stat label="Active Nodes" value="12" hint="All systems operational" icon={<Radio className="size-5" />} />
        <Stat label="Active Alerts" value="02" hint="Critical events" tone="destructive" icon={<Siren className="size-5" />} />
        <Stat label="Animals Detected" value="17" hint="Today" tone="info" icon={<Activity className="size-5" />} />
        <Stat label="Alert Latency" value="82 ms" hint="Camera to beacon" tone="warning" icon={<Gauge className="size-5" />} />
        <Stat label="Warning Lead" value="7.8 s" hint="Before conflict point" tone="info" icon={<Cpu className="size-5" />} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
        <Panel title="System Status">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: Camera, name: "Cameras", value: "12/12 Online", tone: "text-primary" },
              { icon: Cpu, name: "YOLO + LiteRT", value: "INT8 Running", tone: "text-primary" },
              { icon: Database, name: "Store & Forward", value: "3 Events Queued", tone: "text-warning" },
              { icon: Radio, name: "Warning System", value: "Local Path Active", tone: "text-primary" },
              { icon: Wifi, name: "Corridor Link", value: "Mesh Healthy", tone: "text-primary" },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <s.icon className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium">{s.name}</p>
                  <p className={`font-mono text-[10px] ${s.tone}`}>{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Today's Summary">
          <div className="grid grid-cols-4 text-center">
            {[
              ["42", "Total Events", ""],
              ["7", "Critical Events", "text-destructive"],
              ["3", "False Alerts", ""],
              ["28", "Warnings Sent", ""],
            ].map(([v, l, c]) => (
              <div key={l}>
                <p className={`font-mono text-2xl font-semibold ${c}`}>{v}</p>
                <p className="label-xs text-[9px]">{l}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
