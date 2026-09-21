import type { Status, Task } from "@/types/index";
import { todayISO } from "@/utils/helper";
import TaskTable from "./TaskTable";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
  pendingIds: string[];
  onStatusChange: (task: Task, status: Status) => void;
  onEdit: (task: Task) => void;
}

export default function TaskList({ tasks, pendingIds, onStatusChange, onEdit }: Props) {
  const today = todayISO();

  return (
    <>
      <TaskTable
        tasks={tasks}
        pendingIds={pendingIds}
        onStatusChange={onStatusChange}
        onEdit={onEdit}
      />
      <div className="space-y-2 md:hidden">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            today={today}
            pending={pendingIds.includes(task.id)}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
          />
        ))}
      </div>
    </>
  );
}