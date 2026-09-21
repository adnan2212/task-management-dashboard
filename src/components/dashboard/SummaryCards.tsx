import type { Summary } from "@/utils/summary";
import SummaryCard from "./SummaryCard";

export default function SummaryCards({ summary, loading }: { summary: Summary; loading: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <SummaryCard label="Total" value={summary.total} />
      <SummaryCard label="Pending" value={summary.pending} valueClassName="text-amber-700" />
      <SummaryCard label="Completed" value={summary.completed} valueClassName="text-green-700" />
      <SummaryCard label="Overdue" value={summary.overdue} valueClassName="text-red-700" />
    </div>
  );
}