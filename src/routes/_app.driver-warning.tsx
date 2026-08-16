import { createFileRoute } from "@tanstack/react-router";
import { Panel } from "@/components/wg/ui";

export const Route = createFileRoute("/_app/driver-warning")({
  head: () => ({
    meta: [
      { title: "Driver Warning — WildGuard" },
      { name: "description", content: "Direction-aware driver warning propagation across upstream roadside nodes." },
      { property: "og:title", content: "Driver Warning — WildGuard" },
      { property: "og:description", content: "Roadside display states, ACK latency and local safety loop status." },
    ],
  }),
  component: DriverWarning,
});

const BOARDS = [
  { title: "ROAD CLEAR", sub: "DRIVE SAFELY", cls: "border-primary/50 bg-primary/10 text-primary" },
  { title: "WILDLIFE NEAR ROAD", sub: "SLOW DOWN", cls: "border-warning/50 bg-warning/10 text-warning" },
  { title: "ANIMAL AHEAD", sub: "SLOW DOWN • 450 m", cls: "border-destructive/50 bg-destructive/10 text-destructive" },
];

const CHAIN = ["N04 • HAZARD", "N03 • RED WARNING", "N02 • RED WARNING", "N01 • AMBER PREP"];

const DISPLAYS = [
  ["N01 • AMBER PREP", "Ready state • 42 ms", "text-warning"],
  ["N02 • ANIMAL AHEAD", "Delivered and acknowledged • 51 ms", "text-destructive"],
  ["N03 • ANIMAL AHEAD", "Delivered and acknowledged • 60 ms", "text-destructive"],
  ["N04 • HAZARD ZONE", "Delivered and acknowledged • 69 ms", "text-destructive"],
] as const;

function DriverWarning() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {BOARDS.map((b) => (
          <div key={b.title} className={`rounded-lg border p-8 text-center ${b.cls}`}>
            <p className="font-mono text-lg tracking-widest">{b.title}</p>
            <p className="mt-2 font-mono text-xs tracking-widest opacity-80">{b.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
        <Panel title="Direction-Aware Alert Propagation">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4">
              <p className="font-mono text-[11px] tracking-widest text-destructive uppercase">Critical Alert</p>
              <dl className="mt-3 space-y-2 text-xs">
                {[
                  ["Detected at", "NODE-04"],
                  ["Animal", "Elephant"],
                  ["Affected traffic", "Eastbound"],
                  ["Baseline spacing", "150-200 m"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-mono">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <ol className="space-y-2">
              {CHAIN.map((c, i) => (
                <li key={c}>
                  <div className="rounded-md border border-border bg-panel/60 px-3 py-2 font-mono text-xs">{c}</div>
                  {i < CHAIN.length - 1 && <p className="py-0.5 text-center text-muted-foreground">↓</p>}
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            N04 plus 2 upstream nodes activated • Approx. 450 m advance warning • All ACK received
          </p>
        </Panel>

        <Panel title="Driver Display Network">
          <ul className="space-y-3">
            {DISPLAYS.map(([t, s, c]) => (
              <li key={t} className="rounded-md bg-panel/60 px-3 py-2.5">
                <p className={`font-mono text-xs ${c}`}>{t}</p>
                <p className="text-[11px] text-muted-foreground">{s}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] text-muted-foreground">
            Safety loop remains local even when the government dashboard is offline.
          </p>
        </Panel>
      </div>
    </div>
  );
}
