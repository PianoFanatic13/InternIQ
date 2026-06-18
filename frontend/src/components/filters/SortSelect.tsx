import type { SortOption } from "../../types/api";

interface SortSelectProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "date_desc", label: "Newest first" },
  { value: "pay_desc", label: "Highest pay" },
  { value: "company", label: "Company A–Z" },
];

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

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-[10px] font-semibold uppercase tracking-widest"
        style={{ color: "#9CA3AF", letterSpacing: "0.1em" }}
      >
        Sort
      </label>
      <select
        style={selectStyle}
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
