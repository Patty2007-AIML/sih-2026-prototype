import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, Tag, KeyVal } from "@/components/wg/ui";
import { ALERT_QUEUE } from "@/lib/wildguard-data";

export const Route = createFileRoute("/_app/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — WildGuard Command Center" },
      { name: "description", content: "Active alert queue with confidence, corridor, latency and acknowledgement state." },
      { property: "og:title", content: "Alerts — WildGuard Command Center" },
      { property: "og:description", content: "Critical-first wildlife alert queue for corridor officers." },
    ],
  }),
  component: Alerts,
});

function Alerts() {
  const [selected, setSelected] = useState(0);
  const [acked, setAcked] = useState(false);
  const alert = ALERT_QUEUE[selected]!;

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
      <Panel
        title="Active Alert Queue"
        action={<span className="font-mono text-[10px] tracking-widest text-primary">CRITICAL FIRST</span>}
        bodyClass="p-3"
      >
        <ul className="space-y-2">
          {ALERT_QUEUE.map((a, i) => (
            <li key={a.id}>
              <button
                onClick={() => {
                  setSelected(i);
                  setAcked(false);
                }}
                className={`flex w-full items-center gap-4 rounded-md border px-3 py-3 text-left transition-colors ${
                  i === selected ? "border-primary/50 bg-primary/5" : "border-border bg-panel/50 hover:border-border"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{a.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {a.id} • {a.corridor}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs">{a.time}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{a.confidence} confidence</p>
                </div>
                <Tag label={a.level} />
              </button>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Selected Alert">
        <Tag label={alert.level} />
        <h3 className="mt-3 text-lg font-semibold">{alert.name} Conflict Risk</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Confirmed multi-frame track inside the carriageway ROI. An eastbound vehicle is approaching the same conflict
          point.
        </p>
        <div className="mt-4">
          <KeyVal k="Upstream warning" v="N03, N02 • ACK" tone="ok" />
          <KeyVal k="Alert latency" v="82 ms" />
          <KeyVal k="Time to conflict" v="6.8 s" tone="CRITICAL" />
          <KeyVal k="Evidence" v="Metadata + 12 s clip" />
        </div>
        <button
          onClick={() => setAcked(true)}
          className="mt-5 w-full rounded-md bg-primary px-4 py-2.5 font-mono text-[11px] tracking-widest text-primary-foreground uppercase transition-opacity hover:opacity-90"
        >
          {acked ? "Alert acknowledged ✓" : "Acknowledge alert"}
        </button>
      </Panel>
    </div>
  );
}
