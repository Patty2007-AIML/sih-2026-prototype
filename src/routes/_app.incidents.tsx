import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, Stat, Tag, KeyVal } from "@/components/wg/ui";
import { INCIDENTS, type Risk } from "@/lib/wildguard-data";

export const Route = createFileRoute("/_app/incidents")({
  head: () => ({
    meta: [
      { title: "Incidents — WildGuard" },
      { name: "description", content: "Time-stamped incident log with species, node, corridor and confidence evidence." },
      { property: "og:title", content: "Incidents — WildGuard" },
      { property: "og:description", content: "Searchable evidence log of every corridor detection event." },
    ],
  }),
  component: Incidents,
});

const FILTERS = ["ALL", "CRITICAL", "WARNING", "INFO", "RESOLVED"] as const;

function Incidents() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");
  const rows = INCIDENTS.filter((i) => filter === "ALL" || i.level === (filter as Risk));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Incidents Today" value="05" hint="Across 4 nodes" />
        <Stat label="Critical" value="01" hint="Elephant • N04" tone="destructive" />
        <Stat label="Warnings" value="02" hint="Deer • Wild Boar" tone="warning" />
        <Stat label="Resolved" value="01" hint="Cleared by officer" tone="info" />
      </div>

      <Panel
        title="Incident Log"
        action={
          <div className="flex gap-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded border px-2 py-0.5 font-mono text-[10px] tracking-widest transition-colors ${
                  filter === f
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        }
        bodyClass="p-0"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                {["Time", "Animal", "Node", "Corridor", "Risk", "Confidence"].map((h) => (
                  <th key={h} className="label-xs px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((i) => (
                <tr key={i.time} className="border-b border-border/50 last:border-0 hover:bg-accent/40">
                  <td className="px-5 py-3 font-mono text-xs">{i.time}</td>
                  <td className="px-5 py-3">{i.animal}</td>
                  <td className="px-5 py-3 font-mono text-xs">{i.node}</td>
                  <td className="px-5 py-3 text-muted-foreground">{i.corridor}</td>
                  <td className="px-5 py-3"><Tag label={i.level} /></td>
                  <td className="px-5 py-3 font-mono text-xs">{i.confidence}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-muted-foreground">
                    No incidents match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Incident Details — #WG-2048">
        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
          <div>
            <div className="flex aspect-video items-center justify-center rounded-lg border border-border bg-muted/40 text-5xl">
              🐘
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Event-triggered evidence clip • 12 seconds • stored locally
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <Tag label="CRITICAL" />
              <p className="text-sm font-medium">Elephant Detected</p>
            </div>
            <div className="mt-3 grid gap-x-8 sm:grid-cols-2">
              <KeyVal k="Event time" v="14:37:42" />
              <KeyVal k="Node / heartbeat" v="N04 • 4 s ago" />
              <KeyVal k="Road occupancy" v="Carriageway ROI" tone="CRITICAL" />
              <KeyVal k="Confidence" v="94.7%" tone="ok" />
              <KeyVal k="Trajectory" v="Eastbound conflict" />
              <KeyVal k="Time to conflict" v="6.8 seconds" tone="CRITICAL" />
              <KeyVal k="Alert propagation" v="N03, N02 acknowledged" tone="ok" />
              <KeyVal k="Privacy mode" v="Event clip only" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-md bg-primary px-3 py-1.5 font-mono text-[10px] tracking-widest text-primary-foreground transition-colors hover:bg-primary/90">
                MARK VERIFIED
              </button>
              <button className="rounded-md border border-border px-3 py-1.5 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive">
                FALSE ALERT
              </button>
              <button className="rounded-md border border-border px-3 py-1.5 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                EXPORT RECORD
              </button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

