import type { Status, Task } from "@/types/index";
import { formatDate, todayISO, isOverdue } from "@/utils/helper";
import StatusSelect from "./StatusSelect";
import OverdueBadge from "./OverdueBadge";
import { SquarePen } from "lucide-react";

interface Props {
  tasks: Task[];
  pendingIds: string[];
  onStatusChange: (task: Task, status: Status) => void;
  onEdit: (task: Task) => void;
}

export default function TaskTable({ tasks, pendingIds, onStatusChange, onEdit }: Props) {
  const today = todayISO();

  return (
    <div className="hidden overflow-hidden rounded-xl border border-gray-200  md:block">
      <table className="w-full table-fixed text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
            <th className="w-[28%] px-4 py-3 font-medium">Task</th>
            <th className="w-[15%] px-4 py-3 font-medium">Employee</th>
            <th className="w-[15%] px-4 py-3 font-medium">Store</th>
            <th className="w-[18%] px-4 py-3 font-medium">Due</th>
            <th className="w-[16%] px-4 py-3 font-medium">Status</th>
            <th className="w-[8%] px-4 py-3 font-medium">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b border-gray-100 last:border-b-0">
              <td className="truncate px-4 py-3">{task.title}</td>
              <td className="truncate px-4 py-3">{task.employee}</td>
              <td className="truncate px-4 py-3">{task.store}</td>
              <td className="whitespace-nowrap px-4 py-3">
                {formatDate(task.dueDate)}
                {isOverdue(task, today) && <OverdueBadge />}
              </td>
              <td className="px-4 py-3">
                <StatusSelect
                  value={task.status}
                  disabled={pendingIds.includes(task.id)}
                  onChange={(s) => onStatusChange(task, s)}
                  label={`Status for ${task.title}`}
                />
              </td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  aria-label={`Edit ${task.title}`}
                  className="rounded-lg px-2 py-1 text-xs text-blue-700 hover:bg-blue-50"
                >
                 <SquarePen />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}