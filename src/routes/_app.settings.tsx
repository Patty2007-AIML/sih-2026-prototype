import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, KeyVal } from "@/components/wg/ui";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — WildGuard" },
      { name: "description", content: "Detection thresholds, warning behaviour, sync policy and officer preferences." },
      { property: "og:title", content: "Settings — WildGuard" },
      { property: "og:description", content: "Tune the corridor safety loop and dashboard preferences." },
    ],
  }),
  component: SettingsPage,
});

function Toggle({ label, hint, initial = true }: { label: string; hint: string; initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-3 last:border-0">
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <button
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn((v) => !v)}
        className={`h-5 w-10 shrink-0 rounded-full border transition-colors ${
          on ? "border-primary/50 bg-primary/70" : "border-border bg-muted"
        }`}
      >
        <span
          className={`block size-4 rounded-full bg-background transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}

function Slider({ label, value, unit }: { label: string; value: number; unit: string }) {
  const [v, setV] = useState(value);
  return (
    <div className="border-b border-border/60 py-3 last:border-0">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono text-xs text-primary">
          {v}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={v}
        aria-label={label}
        onChange={(e) => setV(Number(e.target.value))}
        className="mt-2 w-full accent-[oklch(0.74_0.19_145)]"
      />
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Panel title="Detection & Risk">
        <Slider label="Confidence threshold" value={55} unit="%" />
        <Slider label="Road ROI sensitivity" value={72} unit="%" />
        <Slider label="Frames to confirm track" value={6} unit=" f" />
        <Toggle label="Night mode boost" hint="Raise gain and lower threshold after sunset" />
        <Toggle label="Rain / glare compensation" hint="Suppress reflective false positives" />
      </Panel>

      <Panel title="Warning Behaviour">
        <Toggle label="Roadside beacon activation" hint="Flash upstream beacons on critical risk" />
        <Toggle label="Upstream node relay" hint="Send direction-aware packets to 2 nodes" />
        <Toggle label="Audible siren on critical" hint="Only for carriageway occupancy" initial={false} />
        <Slider label="Warning hold duration" value={30} unit=" s" />
      </Panel>

      <Panel title="Sync & Storage">
        <Toggle label="Store-and-forward queue" hint="Buffer events while offline" />
        <Toggle label="Upload event clips" hint="10-second clips when link returns" />
        <KeyVal k="Local retention" v="14 days" />
        <KeyVal k="Queued events" v="128" tone="WARNING" />
        <KeyVal k="Last central sync" v="2 h 14 m ago" />
      </Panel>

      <Panel title="Officer Preferences">
        <Toggle label="Critical alert sound" hint="Play tone in dashboard" />
        <Toggle label="Desktop notifications" hint="Alerts outside the browser tab" initial={false} />
        <Toggle label="Auto-acknowledge resolved" hint="Clear alerts after animal exits ROI" />
        <KeyVal k="Timezone" v="Asia/Kolkata" />
        <KeyVal k="Units" v="Metric" />
      </Panel>
    </div>
  );
}
