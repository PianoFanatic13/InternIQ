const YEARS = [2025, 2026, 2027, 2028, 2029, 2030];

interface GradYearSelectProps {
  value: number | null;
  onChange: (year: number | null) => void;
}

const selectStyle: React.CSSProperties = {
  background: "#FFFFFF",
  color: "#111827",
  border: "1px solid #E5E7EB",
  borderRadius: "4px",
  padding: "5px 8px",
  fontSize: "12px",
  fontFamily: "var(--font-sans)",
  outline: "none",
  cursor: "pointer",
};

export function GradYearSelect({ value, onChange }: GradYearSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-[10px] font-semibold uppercase tracking-widest"
        style={{ color: "#9CA3AF", letterSpacing: "0.1em" }}
      >
        Grad Year
      </label>
      <select
        data-testid="grad-year-select"
        style={selectStyle}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : null)}
      >
        <option value="">Any</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}
