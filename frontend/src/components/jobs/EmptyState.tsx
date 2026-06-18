interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 px-6 text-center">
      <span
        className="text-5xl font-bold leading-none select-none"
        style={{ fontFamily: "var(--font-sans)", color: "#E5E7EB" }}
      >
        0
      </span>
      <p className="text-sm" style={{ color: "#9CA3AF" }}>
        No internships match your filters.
      </p>
      <button
        onClick={onReset}
        className="px-3 py-1.5 rounded text-xs font-medium text-[#1D5BDA] border border-[#BFDBFE] hover:bg-[#EFF6FF] transition-colors duration-150"
      >
        Clear filters
      </button>
    </div>
  );
}
