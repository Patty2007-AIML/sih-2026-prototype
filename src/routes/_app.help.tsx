import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Panel, KeyVal } from "@/components/wg/ui";
import { FAQS } from "@/lib/wildguard-data";

export const Route = createFileRoute("/_app/help")({
  head: () => ({
    meta: [
      { title: "Help — WildGuard" },
      { name: "description", content: "Operator guidance on alert propagation, offline safety loop and node spacing." },
      { property: "og:title", content: "Help — WildGuard" },
      { property: "og:description", content: "FAQs and support contacts for corridor safety officers." },
    ],
  }),
  component: Help,
});

function Help() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
      <Panel title="Frequently Asked Questions" bodyClass="p-0">
        <ul>
          {FAQS.map((f, i) => (
            <li key={f.q} className="border-b border-border/50 last:border-0">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm">{f.q}</span>
                <ChevronDown
                  className={`size-4 shrink-0 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && <p className="px-5 pb-4 text-xs leading-relaxed text-muted-foreground">{f.a}</p>}
            </li>
          ))}
        </ul>
      </Panel>

      <div className="space-y-4">
        <Panel title="System">
          <KeyVal k="Dashboard build" v="v1.4.0" />
          <KeyVal k="Model build" v="wildguard-v3.2" />
          <KeyVal k="Mode" v="Offline-first" tone="ok" />
          <KeyVal k="Corridor" v="NH-44 pilot" />
        </Panel>
        <Panel title="Support">
          <KeyVal k="Control room" v="24 × 7" tone="ok" />
          <KeyVal k="Field team" v="06:00 – 20:00" />
          <KeyVal k="Escalation" v="Forest DFO" />
        </Panel>
      </div>
    </div>
  );
}
