import { cn } from "../../utils/cn";
import { formatPay, formatSource } from "../../utils/formatting";
import type { JobSummary } from "../../types/api";

interface JobCardProps {
  job: JobSummary;
  isSelected: boolean;
  onClick: (id: string) => void;
}

export function JobCard({ job, isSelected, onClick }: JobCardProps) {
  const visibleTech = job.tech_stack.slice(0, 4);
  const overflowCount = job.tech_stack.length - 4;

  return (
    <button
      data-testid="job-card"
      onClick={() => onClick(job.id)}
      className={cn(
        "w-full text-left px-5 py-4 border-b border-[#F3F4F6] transition-colors duration-100 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-[#1D5BDA]",
        isSelected
          ? "bg-[#EFF6FF] border-l-2 border-l-[#1D5BDA]"
          : "bg-white hover:bg-[#F9FAFB] border-l-2 border-l-transparent"
      )}
    >
      {/* Row 1: company + source */}
      <div className="flex items-center justify-between gap-2 mb-0.5">
        <span
          className="text-[13px] font-semibold truncate"
          style={{ color: "#111827", fontFamily: "var(--font-sans)" }}
        >
          {job.company_name}
        </span>
        {job.source && (
          <span
            className="text-[10px] shrink-0"
            style={{ color: "#9CA3AF", fontFamily: "var(--font-mono)" }}
          >
            {formatSource(job.source)}
          </span>
        )}
      </div>

      {/* Row 2: title */}
      <p
        className="text-[12px] truncate mb-2.5"
        style={{ color: "#6B7280", fontFamily: "var(--font-sans)" }}
      >
        {job.title}
      </p>

      {/* Row 3: metadata pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {job.estimated_pay_hourly !== null && (
          <span
            className="text-[11px] font-medium"
            style={{ color: "#1D5BDA", fontFamily: "var(--font-mono)" }}
          >
            {formatPay(job.estimated_pay_hourly)}
          </span>
        )}
        {job.estimated_pay_hourly !== null && (job.is_remote || job.required_grad_year || job.sponsors_visa) && (
          <span style={{ color: "#D1D5DB" }}>·</span>
        )}
        {job.is_remote && (
          <span className="text-[11px] text-[#0891B2]">Remote</span>
        )}
        {job.is_remote && (job.required_grad_year || job.sponsors_visa) && (
          <span style={{ color: "#D1D5DB" }}>·</span>
        )}
        {job.required_grad_year && (
          <span className="text-[11px] text-[#6B7280]">{job.required_grad_year}</span>
        )}
        {job.required_grad_year && job.sponsors_visa && (
          <span style={{ color: "#D1D5DB" }}>·</span>
        )}
        {job.sponsors_visa && (
          <span className="text-[11px] text-[#7C3AED]">Visa</span>
        )}
      </div>

      {/* Row 4: tech stack */}
      {job.tech_stack.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 mt-2">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-1.5 py-0.5 text-[10px] rounded bg-[#F3F4F6] text-[#6B7280]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {tech}
            </span>
          ))}
          {overflowCount > 0 && (
            <span
              className="text-[10px]"
              style={{ color: "#9CA3AF", fontFamily: "var(--font-mono)" }}
            >
              +{overflowCount}
            </span>
          )}
        </div>
      )}
    </button>
  );
}
