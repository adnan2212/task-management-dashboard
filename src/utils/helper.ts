import type { Task } from "@/types/index";

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

// Overdue = not completed AND due date is before today.
// ISO date strings compare correctly as plain strings.
export function isOverdue(task: Task, today: string = todayISO()): boolean {
  return task.status !== "completed" && task.dueDate < today;
}