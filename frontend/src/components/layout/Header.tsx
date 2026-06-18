import { useStats } from "../../hooks/useStats";

export function Header() {
  const { data: stats } = useStats();

  return (
    <header className="flex items-center justify-between px-6 h-14 border-b border-[#E5E7EB] bg-white shrink-0 z-20">
      <div className="flex items-center gap-4">
        <span
          className="text-[17px] tracking-tight select-none"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          <span style={{ color: "#111827" }}>Intern</span>
          <span style={{ color: "#1D5BDA" }}>IQ</span>
        </span>
        <span
          className="hidden sm:block text-xs font-medium"
          style={{ color: "#9CA3AF" }}
        >
          AI-powered internship search
        </span>
      </div>

      {stats && (
        <div className="flex items-center gap-5">
          <span className="text-xs" style={{ color: "#9CA3AF", fontFamily: "var(--font-mono)" }}>
            <span style={{ color: "#1D5BDA", fontWeight: 600 }}>{stats.total.toLocaleString()}</span> listings
          </span>
          <div className="hidden sm:flex items-center gap-4">
            {Object.entries(stats.by_source).map(([source, count]) => (
              <span key={source} className="text-[11px]" style={{ color: "#9CA3AF", fontFamily: "var(--font-mono)" }}>
                {source === "pittcsc" ? "PittCSC" : "Ouckah"}: {count}
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
