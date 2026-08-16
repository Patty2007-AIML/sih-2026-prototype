import { createFileRoute } from "@tanstack/react-router";
import { Panel, Stat, Tag } from "@/components/wg/ui";
import { CAMERAS } from "@/lib/wildguard-data";

export const Route = createFileRoute("/_app/cameras")({
  head: () => ({
    meta: [
      { title: "Cameras — WildGuard" },
      { name: "description", content: "Edge camera fleet health: lens state, storage, frame rate and node mapping." },
      { property: "og:title", content: "Cameras — WildGuard" },
      { property: "og:description", content: "Monitor every corridor camera and its inference performance." },
    ],
  }),
  component: Cameras,
});

function Cameras() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Cameras Online" value="08" hint="Of 08 deployed" />
        <Stat label="Degraded" value="02" hint="Lens obstruction / glare" tone="warning" />
        <Stat label="Critical" value="01" hint="Cam-04 low FPS" tone="destructive" />
        <Stat label="Avg AI FPS" value="21.6" hint="INT8 runtime" tone="info" />
      </div>

      <Panel title="Camera Fleet" bodyClass="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                {["Node", "Camera", "Status", "Lens", "Storage", "AI FPS"].map((h) => (
                  <th key={h} className="label-xs px-5 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CAMERAS.map((c) => (
                <tr key={c.cam} className="border-b border-border/50 last:border-0 hover:bg-accent/40">
                  <td className="px-5 py-3 font-mono text-xs">{c.node}</td>
                  <td className="px-5 py-3">{c.cam}</td>
                  <td className="px-5 py-3"><Tag label={c.status} /></td>
                  <td className="px-5 py-3 text-muted-foreground">{c.lens}</td>
                  <td className="px-5 py-3 font-mono text-xs">{c.storage}</td>
                  <td className="px-5 py-3 font-mono text-xs">{c.fps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
