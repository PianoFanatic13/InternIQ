import type { Source } from "../../types/api";

interface SourceSelectProps {
  value: Source | null;
  onChange: (source: Source | null) => void;
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

export function SourceSelect({ value, onChange }: SourceSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-[10px] font-semibold uppercase tracking-widest"
        style={{ color: "#9CA3AF", letterSpacing: "0.1em" }}
      >
        Source
      </label>
      <select
        style={selectStyle}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value ? (e.target.value as Source) : null)}
      >
        <option value="">Both</option>
        <option value="pittcsc">PittCSC</option>
        <option value="ouckah">Ouckah</option>
      </select>
    </div>
  );
}
