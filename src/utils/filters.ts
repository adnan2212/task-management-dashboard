import type { Status, Task } from "@/types/index";

export interface Filters {
  search: string;
  employee: string;
  store: string; 
  status: Status | "";
  dateFrom: string;
  dateTo: string;
}

export const EMPTY_FILTERS: Filters = {
  search: "",
  employee: "",
  store: "",
  status: "",
  dateFrom: "",
  dateTo: "",
};

export function applyFilters(tasks: Task[], filters: Filters): Task[] {
  const q = filters.search.trim().toLowerCase();

  return tasks.filter((t) => {
    if (q && ![t.title, t.employee, t.store].some((v) => v.toLowerCase().includes(q))) return false;
    if (filters.employee && t.employee !== filters.employee) return false;
    if (filters.store && t.store !== filters.store) return false;
    if (filters.status && t.status !== filters.status) return false;
    if (filters.dateFrom && t.dueDate < filters.dateFrom) return false;
    if (filters.dateTo && t.dueDate > filters.dateTo) return false;
    return true;
  });
}

export function countActiveFilters(f: Filters): number {
  return [f.employee, f.store, f.status, f.dateFrom, f.dateTo].filter(Boolean).length;
}

export function hasActiveFilters(f: Filters): boolean {
  return f.search.trim() !== "" || countActiveFilters(f) > 0;
}

export function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}