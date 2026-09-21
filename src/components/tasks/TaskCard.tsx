import type { Status, Task } from "@/types/index";
import { formatDate, isOverdue } from "@/utils/helper";
import StatusSelect from "./StatusSelect";

interface Props {
  task: Task;
  today: string;
  pending: boolean;
  onStatusChange: (task: Task, status: Status) => void;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, today, pending, onStatusChange, onEdit }: Props) {
  const overdue = isOverdue(task, today);

  return (
    <div className="rounded-xl border border-gray-200  p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium">{task.title}</p>
        {overdue && (
          <span className="shrink-0 rounded-lg bg-red-100 px-1.5 py-0.5 text-[11px] font-medium text-red-800">
            Overdue
          </span>
        )}
      </div>
      <p className="mb-3 mt-1 text-xs text-gray-500">
        {task.employee} · {task.store} · Due {formatDate(task.dueDate)}
      </p>
      <div className="flex items-center justify-between">
        <StatusSelect
          value={task.status}
          disabled={pending}
          onChange={(s) => onStatusChange(task, s)}
          label={`Status for ${task.title}`}
        />
        <button
          type="button"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
          className="rounded-lg px-2 py-1 text-xs text-blue-700 hover:bg-blue-50"
        >
          Edit
        </button>
      </div>
    </div>
  );
}