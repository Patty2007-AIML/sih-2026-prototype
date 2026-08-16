import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertTriangle, Siren, Gauge, Radio, Wifi, Eye, CheckCircle2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { Panel, Stat } from "@/components/wg/ui";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — WildGuard" },
      { name: "description", content: "Detection trends, incident history and corridor hazard class distribution." },
      { property: "og:title", content: "Analytics — WildGuard" },
      { property: "og:description", content: "Corridor analytics for wildlife crossings and warning performance." },
    ],
  }),
  component: Analytics,
});

const DETECTIONS = [
  { d: "F", v: 62 },
  { d: "S", v: 84 },
  { d: "S", v: 71 },
  { d: "M", v: 96 },
  { d: "T", v: 88 },
  { d: "W", v: 108 },
  { d: "T", v: 99 },
];

const OVER_TIME = [
  { day: "09 May", detections: 42, warnings: 22, critical: 9 },
  { day: "10 May", detections: 58, warnings: 30, critical: 13 },
  { day: "11 May", detections: 61, warnings: 32, critical: 14 },
  { day: "12 May", detections: 86, warnings: 48, critical: 21 },
  { day: "13 May", detections: 63, warnings: 34, critical: 15 },
  { day: "14 May", detections: 74, warnings: 41, critical: 18 },
  { day: "15 May", detections: 68, warnings: 39, critical: 17 },
];

const CLASSES = [
  { name: "Deer / Nilgai", value: 45, color: "oklch(0.74 0.19 145)" },
  { name: "Elephant", value: 20, color: "oklch(0.68 0.11 235)" },
  { name: "Wild Boar", value: 15, color: "oklch(0.72 0.17 55)" },
  { name: "Cattle / Dog", value: 20, color: "oklch(0.85 0.16 92)" },
];

function Analytics() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Hazard Recall" value="92.1%" hint="By corridor test split" icon={<Activity className="size-5" />} />
        <Stat
          label="False Critical Rate"
          value="0.14/h"
          hint="Per camera-hour"
          tone="destructive"
          icon={<Siren className="size-5" />}
        />
        <Stat
          label="Night / Rain Recall"
          value="88.6%"
          hint="Reported separately"
          tone="warning"
          icon={<AlertTriangle className="size-5" />}
        />
        <Stat
          label="End-to-End Latency"
          value="87 ms"
          hint="Visible hazard to beacon"
          tone="info"
          icon={<Gauge className="size-5" />}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[340px_1fr_360px]">
        <Panel title="Detections — Last 7 Days" bodyClass="p-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DETECTIONS} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
                <XAxis
                  dataKey="d"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <Bar dataKey="v" radius={[3, 3, 0, 0]} fill="oklch(0.76 0.13 175)" barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Incidents Over Time" bodyClass="p-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={OVER_TIME} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                />
                <Line type="monotone" dataKey="detections" stroke="oklch(0.68 0.11 235)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="warnings" stroke="oklch(0.63 0.2 25)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="critical" stroke="oklch(0.85 0.16 92)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Corridor Hazard Classes" bodyClass="p-4">
          <div className="flex items-center gap-4">
            <div className="relative h-52 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CLASSES}
                    dataKey="value"
                    innerRadius="66%"
                    outerRadius="92%"
                    paddingAngle={1}
                    stroke="none"
                  >
                    {CLASSES.map((c) => (
                      <Cell key={c.name} fill={c.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-mono text-2xl font-semibold">103</p>
                <p className="label-xs text-[9px]">Verified</p>
              </div>
            </div>
            <ul className="space-y-2">
              {CLASSES.map((c) => (
                <li key={c.name} className="flex items-center gap-2 text-[11px]">
                  <span className="size-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
                  <span className="flex-1 text-muted-foreground">{c.name}</span>
                  <span className="font-mono">{c.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Median Warning Lead" value="7.4 s" hint="Calibrated conflict point" icon={<Radio className="size-5" />} />
        <Stat
          label="Connectivity Resilience"
          value="100%"
          hint="Offline safety tests passed"
          tone="info"
          icon={<Wifi className="size-5" />}
        />
        <Stat label="Verified Events" value="1,106" hint="Officer-reviewed" icon={<Eye className="size-5" />} />
        <Stat
          label="Node Availability"
          value="98.7%"
          hint="Degraded shown explicitly"
          icon={<CheckCircle2 className="size-5" />}
        />
      </div>
    </div>
  );
}
