interface PayRangeSliderProps {
  minPay: number | null;
  maxPay: number | null;
  onMinChange: (val: number | null) => void;
  onMaxChange: (val: number | null) => void;
}

const inputStyle: React.CSSProperties = {
  background: "#FFFFFF",
  color: "#111827",
  border: "1px solid #E5E7EB",
  borderRadius: "4px",
  padding: "5px 8px",
  fontSize: "12px",
  fontFamily: "var(--font-mono)",
  outline: "none",
  width: "68px",
};

export function PayRangeSlider({ minPay, maxPay, onMinChange, onMaxChange }: PayRangeSliderProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-[10px] font-semibold uppercase tracking-widest"
        style={{ color: "#9CA3AF", letterSpacing: "0.1em" }}
      >
        Pay ($/hr)
      </label>
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          placeholder="Min"
          style={inputStyle}
          value={minPay ?? ""}
          min={0}
          onChange={(e) => onMinChange(e.target.value ? parseInt(e.target.value) : null)}
        />
        <span className="text-xs" style={{ color: "#D1D5DB" }}>–</span>
        <input
          type="number"
          placeholder="Max"
          style={inputStyle}
          value={maxPay ?? ""}
          min={0}
          onChange={(e) => onMaxChange(e.target.value ? parseInt(e.target.value) : null)}
        />
      </div>
    </div>
  );
}
