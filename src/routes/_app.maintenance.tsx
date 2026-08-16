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

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
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
                    {isDone ? "REOPEN" : "ASSIGN"}
                  </button>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel title="Fail-Safe Health">
          <div className="flex flex-col items-center">
            <div
              className="flex size-32 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(var(--color-primary) 0% 92%, var(--color-muted) 92% 100%)",
              }}
            >
              <div className="flex size-24 flex-col items-center justify-center rounded-full bg-card">
                <span className="font-mono text-xl font-semibold">92%</span>
                <span className="label-xs text-[9px]">Healthy</span>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <KeyVal k="Healthy" v="21" tone="ok" />
            <KeyVal k="Degraded" v="2" tone="WARNING" />
            <KeyVal k="Offline" v="1" tone="CRITICAL" />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Missing data is never interpreted as “road clear”.
          </p>
        </Panel>
      </div>
    </div>
  );
}

