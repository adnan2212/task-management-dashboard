import { STATUS_LABELS, STATUS_STYLES } from "@/constants/status";
import type { Status } from "@/types/index";

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-block rounded-lg px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}