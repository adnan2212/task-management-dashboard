import type { Task } from "@/types/index";
import { toISODate } from "@/utils/helper";

export const MOCK_TOKEN = "mock-token-123";

const daysFromNow = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISODate(d);
};

function seed(): Task[] {
  return [
    { id: "1", title: "Restock shelves", employee: "Priya Nair", store: "Thane", dueDate: daysFromNow(-5), status: "pending" },
    { id: "2", title: "Audit cold storage logs", employee: "Rahul Verma", store: "Dadar", dueDate: daysFromNow(2), status: "in_progress" },
    { id: "3", title: "Update promo signage", employee: "Sana Khan", store: "Vashi", dueDate: daysFromNow(-2), status: "pending" },
    { id: "4", title: "Cycle count electronics", employee: "Amit Joshi", store: "Thane", dueDate: daysFromNow(4), status: "pending" },
    { id: "5", title: "Close out weekly report", employee: "Priya Nair", store: "Dadar", dueDate: daysFromNow(-3), status: "completed" },
    { id: "6", title: "Clean checkout counters", employee: "Sana Khan", store: "Vashi", dueDate: daysFromNow(0), status: "in_progress" },
    { id: "7", title: "Check expiry on dairy", employee: "Rahul Verma", store: "Thane", dueDate: daysFromNow(-1), status: "in_progress" },
    { id: "8", title: "Label new arrivals", employee: "Amit Joshi", store: "Dadar", dueDate: daysFromNow(7), status: "pending" },
    { id: "9", title: "Train new cashier", employee: "Priya Nair", store: "Vashi", dueDate: daysFromNow(-8), status: "completed" },
    { id: "10", title: "Inspect fire extinguishers", employee: "Rahul Verma", store: "Vashi", dueDate: daysFromNow(10), status: "pending" },
  ];
}

// Kept on globalThis so data survives Next.js hot reloads in dev.
const g = globalThis as unknown as { __tasks?: Task[]; __nextId?: number };
export const tasks: Task[] = g.__tasks ?? (g.__tasks = seed());

export function nextId(): string {
  g.__nextId = (g.__nextId ?? 100) + 1;
  return String(g.__nextId);
}
