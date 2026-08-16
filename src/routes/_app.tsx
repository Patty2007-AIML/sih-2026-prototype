import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Activity,
  Bell,
  BarChart3,
  Camera,
  CheckCircle2,
  Cpu,
  FileText,
  Flame,
  HelpCircle,
  LayoutGrid,
  LogOut,
  Map,
  Radio,
  Settings,
  Wifi,
  WifiOff,
  Wrench,
  Leaf,
} from "lucide-react";
import { NAV } from "@/lib/wildguard-data";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

const ICONS: Record<string, typeof Activity> = {
  grid: LayoutGrid,
  camera: Camera,
  activity: Activity,
  signal: Radio,
  bell: Bell,
  map: Map,
  flame: Flame,
  chart: BarChart3,
  cpu: Cpu,
  file: FileText,
  wrench: Wrench,
  check: CheckCircle2,
  settings: Settings,
  help: HelpCircle,
};

type Officer = { id: string; name: string; role: string };

function AppLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [officer, setOfficer] = useState<Officer | null>(null);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem("wg-officer") : null;
    if (!raw) {
      navigate({ to: "/" });
      return;
    }
    setOfficer(JSON.parse(raw) as Officer);
  }, [navigate]);

  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const current = NAV.find((n) => n.to === pathname);
  const initials = officer?.name.split(" ").map((p) => p[0]).join("") ?? "--";

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-card/60 lg:flex">
        <div className="flex items-center gap-3 px-5 py-5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Leaf className="size-5" />
          </span>
          <div>
            <p className="text-sm font-bold tracking-[0.18em]">WILDGUARD</p>
            <p className="label-xs text-[9px]">Edge • Wildlife Crossing</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {NAV.map((item) => {
            const Icon = ICONS[item.icon] ?? Activity;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                <span className="flex-1">{item.label}</span>
                {"badge" in item && item.badge ? (
                  <span className="rounded-full bg-destructive px-1.5 font-mono text-[10px] text-destructive-foreground">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 border-t border-border px-4 py-4">
          <span className="flex size-9 items-center justify-center rounded-full bg-muted font-mono text-xs">
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm">{officer?.name ?? "—"}</p>
            <p className="label-xs text-[9px] text-primary">{officer?.role ?? ""}</p>
          </div>
          <button
            aria-label="Sign out"
            onClick={() => {
              window.localStorage.removeItem("wg-officer");
              navigate({ to: "/" });
            }}
            className="text-muted-foreground transition-colors hover:text-destructive"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center gap-4 border-b border-border px-6 py-4">
          <div className="min-w-40 flex-1">
            <h1 className="text-2xl font-semibold tracking-tight">{current?.label ?? "Dashboard"}</h1>
            <p className="text-xs text-muted-foreground">
              {pathname === "/dashboard"
                ? "Offline-first corridor safety and wildlife activity"
                : "WildGuard edge monitoring and response system"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusChip icon={<Leaf className="size-3.5 text-primary" />} label="LOCAL MODE" value="Safety Loop Active" tone="text-primary" />
            <StatusChip icon={<WifiOff className="size-3.5 text-destructive" />} label="INTERNET" value="Disconnected" tone="text-destructive" />
            <StatusChip icon={<Cpu className="size-3.5 text-primary" />} label="EDGE AI" value="YOLO INT8 Running" tone="text-primary" />
            <StatusChip icon={<Wifi className="size-3.5 text-warning" />} label="NODES" value="11 Healthy • 1 Degraded" tone="text-warning" />
            <div className="px-2 text-right">
              <p className="font-mono text-lg tracking-widest">{clock}</p>
              <p className="label-xs text-[9px]">11 Aug 2026</p>
            </div>
            <Link to="/alerts" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="size-5" />
              <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-destructive font-mono text-[9px] text-destructive-foreground">
                2
              </span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function StatusChip({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="hidden items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 xl:flex">
      {icon}
      <div>
        <p className="label-xs text-[9px]">{label}</p>
        <p className={`font-mono text-[10px] ${tone}`}>{value}</p>
      </div>
    </div>
  );
}
