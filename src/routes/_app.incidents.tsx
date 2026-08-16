import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, Stat, Tag } from "@/components/wg/ui";
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
    </div>
  );
}
