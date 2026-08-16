export type Risk = "CRITICAL" | "WARNING" | "INFO" | "RESOLVED";

export const OFFICERS = [
  { id: "WGO-1001", password: "Ranger@2026", name: "Arjun Mehta", role: "Administrator" },
  { id: "WGO-1002", password: "Forest@2026", name: "Priya Nair", role: "Wildlife Officer" },
  { id: "WGO-1003", password: "Patrol@2026", name: "Ravi Kumar", role: "Maintenance Engineer" },
];

export const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: "grid" },
  { to: "/live-camera", label: "Live AI Camera", icon: "camera" },
  { to: "/risk-intelligence", label: "Risk Intelligence", icon: "activity" },
  { to: "/driver-warning", label: "Driver Warning", icon: "signal" },
  { to: "/alerts", label: "Alerts", icon: "bell", badge: 2 },
  { to: "/corridor-map", label: "Corridor Map", icon: "map" },
  { to: "/hotspots", label: "Hotspots", icon: "flame" },
  { to: "/analytics", label: "Analytics", icon: "chart" },
  { to: "/cameras", label: "Cameras", icon: "camera" },
  { to: "/nodes", label: "Nodes", icon: "cpu" },
  { to: "/incidents", label: "Incidents", icon: "file" },
  { to: "/maintenance", label: "Maintenance", icon: "wrench" },
  { to: "/ai-model", label: "AI Model", icon: "cpu" },
  { to: "/reports", label: "Reports", icon: "file" },
  { to: "/pilot-plan", label: "Pilot Plan", icon: "check" },
  { to: "/settings", label: "Settings", icon: "settings" },
  { to: "/help", label: "Help", icon: "help" },
] as const;

export const CORRIDOR_NODES = [
  { id: "N01", x: 6, y: 74, state: "healthy" },
  { id: "N02", x: 21, y: 62, state: "healthy" },
  { id: "N03", x: 38, y: 46, state: "caution" },
  { id: "N04", x: 50, y: 44, state: "critical" },
  { id: "N07", x: 63, y: 28, state: "healthy" },
  { id: "N08", x: 73, y: 34, state: "healthy" },
  { id: "N10", x: 85, y: 40, state: "healthy" },
  { id: "N12", x: 95, y: 26, state: "healthy" },
] as const;

export const RECENT_ALERTS = [
  { emoji: "🐘", name: "Elephant", node: "N04", time: "14:37:42", level: "CRITICAL" as Risk },
  { emoji: "🦌", name: "Deer", node: "N03", time: "14:28:11", level: "WARNING" as Risk },
  { emoji: "🐗", name: "Wild Boar", node: "N07", time: "14:10:05", level: "WARNING" as Risk },
  { emoji: "⚠", name: "Animal on Shoulder", node: "N09", time: "13:58:33", level: "INFO" as Risk },
];

export const ALERT_QUEUE = [
  { id: "#WG-2048", name: "Elephant", corridor: "NH-44 / C3", time: "14:37:42", confidence: "94.7%", level: "CRITICAL" as Risk },
  { id: "#WG-2047", name: "Deer", corridor: "NH-44 / C2", time: "14:28:11", confidence: "91.2%", level: "WARNING" as Risk },
  { id: "#WG-2046", name: "Wild Boar", corridor: "SH-12 / C1", time: "14:10:05", confidence: "87.0%", level: "WARNING" as Risk },
  { id: "#WG-2045", name: "Animal on Shoulder", corridor: "NH-44 / C4", time: "13:58:33", confidence: "82.4%", level: "INFO" as Risk },
  { id: "#WG-2044", name: "Deer", corridor: "NH-44 / C3", time: "12:42:09", confidence: "89.8%", level: "RESOLVED" as Risk },
];

export const INCIDENTS = [
  { time: "14:37:42", animal: "Elephant", node: "N04", corridor: "NH-44 / C3", level: "CRITICAL" as Risk, confidence: "94.7%" },
  { time: "14:28:11", animal: "Deer", node: "N03", corridor: "NH-44 / C2", level: "WARNING" as Risk, confidence: "91.2%" },
  { time: "14:10:05", animal: "Wild Boar", node: "N07", corridor: "SH-12 / C1", level: "WARNING" as Risk, confidence: "87.0%" },
  { time: "13:58:33", animal: "Animal on Shoulder", node: "N09", corridor: "NH-44 / C4", level: "INFO" as Risk, confidence: "82.4%" },
  { time: "12:42:09", animal: "Deer", node: "N05", corridor: "NH-44 / C3", level: "RESOLVED" as Risk, confidence: "89.8%" },
];

export const CAMERAS = [
  { node: "N01", cam: "Cam-01", status: "Healthy", lens: "Clear", storage: "64%", fps: 25 },
  { node: "N02", cam: "Cam-02", status: "Healthy", lens: "Clear", storage: "61%", fps: 24 },
  { node: "N03", cam: "Cam-03", status: "Degraded", lens: "Obstructed", storage: "55%", fps: 18 },
  { node: "N04", cam: "Cam-04", status: "Critical", lens: "Clear", storage: "72%", fps: 12 },
  { node: "N05", cam: "Cam-05", status: "Healthy", lens: "Clear", storage: "60%", fps: 25 },
  { node: "N06", cam: "Cam-06", status: "Healthy", lens: "Clear", storage: "58%", fps: 24 },
  { node: "N07", cam: "Cam-07", status: "Healthy", lens: "Clear", storage: "80%", fps: 25 },
  { node: "N08", cam: "Cam-08", status: "Degraded", lens: "Glare", storage: "66%", fps: 20 },
];

export const NODES = [
  { node: "N01", runtime: "LiteRT INT8", health: "Healthy", battery: "92%", heartbeat: "3 s ago", temp: "44°C", link: "Good" },
  { node: "N02", runtime: "LiteRT INT8", health: "Healthy", battery: "89%", heartbeat: "4 s ago", temp: "45°C", link: "Good" },
  { node: "N03", runtime: "LiteRT INT8", health: "Degraded", battery: "67%", heartbeat: "11 s ago", temp: "52°C", link: "Fair" },
  { node: "N04", runtime: "LiteRT INT8", health: "Critical", battery: "34%", heartbeat: "4 s ago", temp: "54°C", link: "Good" },
  { node: "N05", runtime: "LiteRT INT8", health: "Healthy", battery: "90%", heartbeat: "5 s ago", temp: "46°C", link: "Good" },
  { node: "N06", runtime: "LiteRT INT8", health: "Healthy", battery: "86%", heartbeat: "6 s ago", temp: "47°C", link: "Good" },
  { node: "N07", runtime: "LiteRT INT8", health: "Healthy", battery: "81%", heartbeat: "5 s ago", temp: "48°C", link: "Good" },
  { node: "N08", runtime: "LiteRT INT8", health: "Degraded", battery: "29%", heartbeat: "9 s ago", temp: "51°C", link: "Fair" },
  { node: "N11", runtime: "LiteRT INT8", health: "Offline", battery: "—", heartbeat: "38 s ago", temp: "—", link: "Lost" },
];

export const MAINTENANCE = [
  { node: "N03", title: "Camera Lens Obstructed", detail: "Road ROI visibility reduced • clean lens", level: "WARNING" as Risk },
  { node: "N07", title: "Storage Low", detail: "Event-clip storage below 20%", level: "WARNING" as Risk },
  { node: "N11", title: "Heartbeat Missed", detail: "No heartbeat for 38 seconds", level: "CRITICAL" as Risk },
  { node: "N08", title: "Battery Low", detail: "Solar reserve below 30%", level: "CRITICAL" as Risk },
];

export const SCENARIOS = [
  { emoji: "🐘", name: "Elephant Crossing", level: "CRITICAL" as Risk },
  { emoji: "🦌", name: "Deer Crossing", level: "WARNING" as Risk },
  { emoji: "🐗", name: "Wild Boar", level: "WARNING" as Risk },
  { emoji: "⚠", name: "Animal on Shoulder", level: "INFO" as Risk },
  { emoji: "🌙", name: "Night Detection", level: "WARNING" as Risk },
  { emoji: "🌧", name: "Rain Detection", level: "WARNING" as Risk },
  { emoji: "📡", name: "Internet Disconnected", level: "INFO" as Risk },
  { emoji: "🚨", name: "Critical Alert", level: "CRITICAL" as Risk },
];

export const REPORTS = [
  { name: "Weekly Corridor Safety Summary", meta: "Generated 1 day ago • PDF / CSV", status: "READY" },
  { name: "Species, Time & Movement Analysis", meta: "Generated 2 days ago • PDF / CSV", status: "ARCHIVED" },
  { name: "Node Heartbeat and Availability", meta: "Generated 3 days ago • PDF / CSV", status: "ARCHIVED" },
  { name: "Critical Incident & Warning ACK Log", meta: "Generated 4 days ago • PDF / CSV", status: "ARCHIVED" },
  { name: "Hotspot Mitigation Evidence Pack", meta: "Generated 5 days ago • PDF / CSV", status: "ARCHIVED" },
];

export const ROADMAP = [
  { n: "01", title: "Corridor definition", detail: "Pilot stretch, hazard species, crossing points and camera FOV", when: "WEEKS 1-2" },
  { n: "02", title: "Dataset + baseline", detail: "Location-separated videos and YOLO-nano baseline", when: "WEEKS 2-5" },
  { n: "03", title: "Edge optimization", detail: "LiteRT export, INT8 benchmark, heat and power tests", when: "WEEKS 5-7" },
  { n: "04", title: "Risk + warnings", detail: "Tracking, road ROI, beacons and inter-node ACK packets", when: "WEEKS 6-8" },
  { n: "05", title: "Government dashboard", detail: "Map, event evidence, health and hotspot analytics", when: "WEEKS 7-9" },
  { n: "06", title: "Controlled pilot", detail: "3-5 nodes, controlled hazards and threshold tuning", when: "WEEKS 9-12" },
  { n: "07", title: "Field pilot", detail: "Seasonal monitoring and formal safety evaluation", when: "3-6 MONTHS" },
];

export const FAQS = [
  {
    q: "How are critical alerts propagated?",
    a: "The hazard node activates locally and sends a small direction-aware packet to one or two upstream nodes. Each warning node acknowledges receipt and retries if needed.",
  },
  {
    q: "What happens when internet is disconnected?",
    a: "The safety loop is fully local. Detection, risk scoring and driver warnings continue on the edge board, while events are queued in store-and-forward until central sync returns.",
  },
  {
    q: "Why is detection different from collision risk?",
    a: "A detection only says an animal is visible. Collision risk combines road ROI occupancy, trajectory, persistence across frames and approaching vehicle speed before a critical warning is raised.",
  },
  {
    q: "How is node spacing decided?",
    a: "A site survey sets baseline spacing of 150-200 m, tightened around curves, medians and known crossing points so upstream warning distance stays above the stopping sight distance.",
  },
];
