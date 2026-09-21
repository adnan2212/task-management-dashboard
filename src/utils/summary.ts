import type { Task } from "@/types/index";
import { isOverdue, todayISO } from "./helper";

export interface Summary {
  total: number;
  pending: number;
  completed: number;
  overdue: number;
}

export function computeSummary(tasks: Task[], today: string = todayISO()): Summary {
  return {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    overdue: tasks.filter((t) => isOverdue(t, today)).length,
  };
}