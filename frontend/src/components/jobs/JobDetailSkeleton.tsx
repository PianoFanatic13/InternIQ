export function JobDetailSkeleton() {
  return (
    <div className="h-full overflow-y-auto bg-white animate-pulse">
      <div className="border-b border-[#E5E7EB] px-6 py-5">
        <div className="h-3 w-24 rounded bg-[#F3F4F6] mb-2" />
        <div className="h-6 w-72 rounded bg-[#F3F4F6] mb-4" />
        <div className="h-9 w-36 rounded bg-[#F3F4F6]" />
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="h-2 w-16 rounded bg-[#F3F4F6] mb-2" />
              <div className="h-4 w-24 rounded bg-[#F9FAFB]" />
            </div>
          ))}
        </div>

        <div className="h-2 w-20 rounded bg-[#F3F4F6] mb-3" />
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-5 w-16 rounded bg-[#F3F4F6]" />
          ))}
        </div>
      </div>
    </div>
  );
}
