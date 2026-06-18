import { useState } from "react";
import { useJobDetail } from "../../hooks/useJobDetail";
import { JobDetailSkeleton } from "./JobDetailSkeleton";
import { NullValue } from "../ui/NullValue";
import { formatPay, formatDate, formatSource, formatConfidence } from "../../utils/formatting";

interface JobDetailPanelProps {
  jobId: string | null;
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt
        className="text-[10px] font-semibold uppercase tracking-widest mb-1"
        style={{ color: "#9CA3AF", letterSpacing: "0.1em" }}
      >
        {label}
      </dt>
      <dd className="text-sm" style={{ color: "#111827" }}>{children}</dd>
    </div>
  );
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-[#F3F4F6] pt-4">
      <button
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest hover:text-[#111827] transition-colors duration-150 mb-3 w-full text-left"
        style={{ color: "#9CA3AF", letterSpacing: "0.1em" }}
        onClick={() => setOpen((o) => !o)}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}>
          {open ? "▾" : "▸"}
        </span>
        {title}
      </button>
      {open && children}
    </div>
  );
}

function LocationBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-[#F3F4F6] text-[#6B7280]"
    >
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    success: "bg-emerald-50 text-emerald-700",
    partial: "bg-amber-50 text-amber-600",
    failed: "bg-red-50 text-red-600",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${styles[status] ?? "bg-[#F3F4F6] text-[#6B7280]"}`}>
      {status}
    </span>
  );
}

function VisaBadge({ sponsors }: { sponsors: boolean | null }) {
  if (sponsors === true) {
    return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-violet-50 text-violet-700">Yes</span>;
  }
  if (sponsors === false) {
    return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-[#F3F4F6] text-[#6B7280]">No</span>;
  }
  return <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-[#F3F4F6] text-[#9CA3AF]">Unknown</span>;
}

export function JobDetailPanel({ jobId }: JobDetailPanelProps) {
  const { data: job, isLoading } = useJobDetail(jobId);

  if (!jobId) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8 bg-white">
        <span
          className="text-4xl select-none"
          style={{ color: "#E5E7EB", fontFamily: "var(--font-sans)" }}
        >
          ←
        </span>
        <p className="text-sm" style={{ color: "#D1D5DB" }}>
          Select a listing to view details
        </p>
      </div>
    );
  }

  if (isLoading) return <JobDetailSkeleton />;

  if (!job) {
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <p className="text-sm" style={{ color: "#9CA3AF" }}>Failed to load job details.</p>
      </div>
    );
  }

  return (
    <div data-testid="job-detail-panel" className="h-full overflow-y-auto bg-white">
      {/* Sticky header */}
      <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-5 z-10">
        <p
          className="text-[11px] font-semibold mb-1.5 uppercase tracking-widest"
          style={{ color: "#1D5BDA", letterSpacing: "0.1em" }}
        >
          {job.company_name}
        </p>
        <h1
          className="text-[22px] font-bold leading-snug mb-4"
          style={{ color: "#111827", fontFamily: "var(--font-sans)", letterSpacing: "-0.02em" }}
        >
          {job.title}
        </h1>
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="view-posting-link"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-sm font-semibold bg-[#1D5BDA] text-white hover:bg-[#1448BE] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D5BDA] focus-visible:ring-offset-2"
        >
          View Posting
          <span className="text-[10px] opacity-70">↗</span>
        </a>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Metadata grid */}
        <dl className="grid grid-cols-2 gap-x-8 gap-y-5">
          <MetaRow label="Pay">
            {job.estimated_pay_hourly !== null ? (
              <span style={{ fontFamily: "var(--font-mono)", color: "#1D5BDA", fontWeight: 500 }}>
                {formatPay(job.estimated_pay_hourly)}
              </span>
            ) : <NullValue />}
          </MetaRow>

          <MetaRow label="Grad Year">
            {job.required_grad_year !== null ? (
              <span>
                {job.required_grad_year}
                {job.grad_year_flexible && (
                  <span className="ml-1.5 text-xs" style={{ color: "#9CA3AF" }}>flexible</span>
                )}
              </span>
            ) : <NullValue />}
          </MetaRow>

          <MetaRow label="Location">
            {job.location.length > 0 ? (
              <div className="flex flex-wrap gap-1 mt-0.5">
                {job.is_remote && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-cyan-50 text-cyan-700">
                    Remote
                  </span>
                )}
                {job.location
                  .filter((l) => l.toLowerCase() !== "remote")
                  .map((l) => <LocationBadge key={l} label={l} />)}
              </div>
            ) : <NullValue />}
          </MetaRow>

          <MetaRow label="Visa Sponsorship">
            <VisaBadge sponsors={job.sponsors_visa} />
          </MetaRow>

          <MetaRow label="Source">
            <span
              className="text-sm"
              style={{ color: "#6B7280", fontFamily: "var(--font-mono)" }}
            >
              {formatSource(job.source)}
            </span>
          </MetaRow>

          <MetaRow label="Posted">
            {job.date_posted ? (
              <span>{formatDate(job.date_posted)}</span>
            ) : (
              <span className="text-xs" style={{ color: "#9CA3AF" }}>
                Ingested {formatDate(job.date_ingested)}
              </span>
            )}
          </MetaRow>
        </dl>

        {/* Tech stack */}
        {job.tech_stack.length > 0 && (
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#9CA3AF", letterSpacing: "0.1em" }}
            >
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {job.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-[#F3F4F6] text-[#374151]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* AI metadata */}
        <CollapsibleSection title="AI Extraction">
          <div className="flex flex-wrap gap-3 text-xs" style={{ color: "#6B7280" }}>
            <span className="flex items-center gap-1.5">
              Status: <StatusBadge status={job.ai_extraction_status} />
            </span>
            {job.ai_confidence_score !== null && (
              <span>
                Confidence:{" "}
                <span style={{ fontFamily: "var(--font-mono)", color: "#1D5BDA" }}>
                  {formatConfidence(job.ai_confidence_score)}
                </span>
              </span>
            )}
            {job.date_processed && (
              <span>
                Processed:{" "}
                <span style={{ fontFamily: "var(--font-mono)" }}>{formatDate(job.date_processed)}</span>
              </span>
            )}
          </div>
        </CollapsibleSection>

        {/* Raw description */}
        {job.raw_description && (
          <CollapsibleSection title="Raw Description">
            <pre
              className="text-[11px] whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto rounded p-3 border border-[#E5E7EB]"
              style={{ fontFamily: "var(--font-mono)", color: "#6B7280", background: "#F9FAFB" }}
            >
              {job.raw_description}
            </pre>
          </CollapsibleSection>
        )}
      </div>
    </div>
  );
}
