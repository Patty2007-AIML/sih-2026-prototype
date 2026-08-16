import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, Stat, Tag } from "@/components/wg/ui";
import { MAINTENANCE } from "@/lib/wildguard-data";

export const Route = createFileRoute("/_app/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance — WildGuard" },
      { name: "description", content: "Field maintenance queue for lens cleaning, storage, battery and heartbeat faults." },
      { property: "og:title", content: "Maintenance — WildGuard" },
      { property: "og:description", content: "Dispatch and track corridor hardware maintenance tasks." },
    ],
  }),
  component: Maintenance,
});

function Maintenance() {
  const [done, setDone] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Open Tasks" value={String(MAINTENANCE.length - done.length).padStart(2, "0")} hint="Field action required" tone="warning" />
        <Stat label="Critical" value="02" hint="N11 • N08" tone="destructive" />
        <Stat label="Scheduled Visits" value="01" hint="Patrol team • tomorrow" tone="info" />
        <Stat label="Mean Repair Time" value="6.2 h" hint="Last 30 days" />
      </div>

      <Panel title="Maintenance Queue" bodyClass="p-0">
        <ul>
          {MAINTENANCE.map((m) => {
            const isDone = done.includes(m.node + m.title);
            return (
              <li
                key={m.node + m.title}
                className="flex flex-wrap items-center gap-3 border-b border-border/50 px-5 py-4 last:border-0"
              >
                <span className="rounded bg-muted px-2 py-1 font-mono text-[11px]">{m.node}</span>
                <div className="min-w-40 flex-1">
                  <p className={`text-sm ${isDone ? "text-muted-foreground line-through" : ""}`}>{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.detail}</p>
                </div>
                <Tag label={isDone ? "RESOLVED" : m.level} />
                <button
                  onClick={() =>
                    setDone((d) =>
                      isDone ? d.filter((x) => x !== m.node + m.title) : [...d, m.node + m.title],
                    )
                  }
                  className="rounded border border-border px-3 py-1 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {isDone ? "REOPEN" : "MARK DONE"}
                </button>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}
