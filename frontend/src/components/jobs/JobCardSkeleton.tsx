export function JobCardSkeleton() {
  return (
    <div className="px-5 py-4 border-b border-[#F3F4F6] bg-white animate-pulse">
      <div className="flex items-center justify-between mb-1">
        <div className="h-3.5 w-28 rounded bg-[#F3F4F6]" />
        <div className="h-3 w-12 rounded bg-[#F9FAFB]" />
      </div>
      <div className="h-3 w-48 rounded bg-[#F9FAFB] mb-3" />
      <div className="flex gap-2 mb-2">
        <div className="h-3 w-14 rounded bg-[#F3F4F6]" />
        <div className="h-3 w-10 rounded bg-[#F3F4F6]" />
      </div>
      <div className="flex gap-1">
        <div className="h-4 w-12 rounded bg-[#F3F4F6]" />
        <div className="h-4 w-14 rounded bg-[#F3F4F6]" />
        <div className="h-4 w-10 rounded bg-[#F3F4F6]" />
      </div>
    </div>
  );
}
