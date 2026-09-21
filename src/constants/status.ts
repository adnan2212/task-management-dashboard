import type { Status } from "@/types/index";

export const STATUS_LABELS: Record<Status, string> = {
  pending: "Pending",
  in_progress: "In progress",
  completed: "Completed",
};

export const STATUS_OPTIONS = Object.keys(STATUS_LABELS) as Status[];

export const STATUS_STYLES: Record<Status, string> = {
  pending: "bg-amber-100 text-amber-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};