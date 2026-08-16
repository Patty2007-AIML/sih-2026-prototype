import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { Panel, Stat, Tag } from "@/components/wg/ui";
import { REPORTS } from "@/lib/wildguard-data";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({
    meta: [
      { title: "Reports — WildGuard" },
      { name: "description", content: "Generated corridor safety, species movement and node availability reports." },
      { property: "og:title", content: "Reports — WildGuard" },
      { property: "og:description", content: "Download PDF and CSV evidence packs for the monitored corridor." },
    ],
  }),
  component: Reports,
});

function Reports() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Reports Available" value="05" hint="PDF and CSV exports" />
        <Stat label="Ready" value="01" hint="Generated 1 day ago" tone="info" />
        <Stat label="Archived" value="04" hint="Older than 48 hours" />
        <Stat label="Next Auto-Run" value="Mon 06:00" hint="Weekly summary" tone="warning" />
      </div>

      <Panel
        title="Government Report Center"
        action={
          <button className="rounded-md bg-primary px-3 py-1.5 font-mono text-[10px] tracking-widest text-primary-foreground transition-colors hover:bg-primary/90">
            GENERATE REPORT
          </button>
        }
        bodyClass="p-0"
      >
        <ul>
          {REPORTS.map((r) => (
            <li
              key={r.name}
              className="flex flex-wrap items-center gap-4 border-b border-border/50 px-5 py-4 last:border-0"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
                <FileText className="size-4" />
              </span>
              <div className="min-w-40 flex-1">
                <p className="text-sm">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.meta}</p>
              </div>
              <Tag label={r.status} />
              <button className="flex items-center gap-1.5 rounded border border-border px-3 py-1 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                <Download className="size-3" /> EXPORT
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
