import { z } from "zod";
import { todayISO } from "@/utils/helper";

// "2026-02-31" matches the regex but isn't a real date, so check it properly.
function isRealDate(s: string): boolean {
  const [y, m, d] = s.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

const taskBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be 100 characters or fewer"),
  employee: z.string().trim().min(1, "Enter an employee").max(60, "Keep it under 60 characters"),
  store: z.string().trim().min(1, "Enter a store").max(60, "Keep it under 60 characters"),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a due date")
    .refine(isRealDate, "Enter a valid date"),
  status: z.enum(["pending", "in_progress", "completed"]),
});

export type TaskFormValues = z.infer<typeof taskBaseSchema>;

// Rule: a NEW task can't be due in the past. Editing an old task is allowed.
export function getTaskSchema(mode: "create" | "edit") {
  return taskBaseSchema.refine((v) => mode === "edit" || v.dueDate >= todayISO(), {
    path: ["dueDate"],
    message: "Due date can't be in the past",
  });
}