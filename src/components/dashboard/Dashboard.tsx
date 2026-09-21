"use client";

import { useCallback, useMemo, useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useDebounce } from "@/hooks/useDebounce";
import { computeSummary } from "@/utils/summary";
import { applyFilters, EMPTY_FILTERS, uniqueSorted, type Filters } from "@/utils/filters";
import type { Status, Task, ApiError } from "@/types/index";
import type { TaskFormValues } from "@/schemas/taskSchema";
import SummaryCards from "./SummaryCards";
import FilterBar from "@/components/filters/FilterBar";
import TaskList from "@/components/tasks/TaskList";
import TaskFormModal from "@/components/tasks/TaskFormModal";
import Skeleton from "@/components/ui/Skeleton";
import ErrorBanner from "@/components/ui/ErrorBanner";
import EmptyState from "@/components/ui/EmptyState";
import Toast, { type ToastState } from "@/components/ui/Toast";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const { tasks, loading, error, reload, addTask, editTask, changeStatus, pendingIds } =
    useTasks();

  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null); // null = creating
  const [toast, setToast] = useState<ToastState | null>(null);

  const debouncedSearch = useDebounce(filters.search, 300);

  const employees = useMemo(() => uniqueSorted(tasks.map((t) => t.employee)), [tasks]);
  const stores = useMemo(() => uniqueSorted(tasks.map((t) => t.store)), [tasks]);

  const filtered = useMemo(
    () => applyFilters(tasks, { ...filters, search: debouncedSearch }),
    [tasks, filters, debouncedSearch]
  );
  const summary = useMemo(() => computeSummary(filtered), [filtered]);

  const updateFilters = (patch: Partial<Filters>) =>
    setFilters((prev) => ({ ...prev, ...patch }));
  const clearFilters = () => setFilters(EMPTY_FILTERS);

  const dismissToast = useCallback(() => setToast(null), []);
  const closeForm = useCallback(() => setFormOpen(false), []);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(task: Task) {
    setEditing(task);
    setFormOpen(true);
  }

  async function handleSave(values: TaskFormValues) {
    if (editing) {
      await editTask(editing.id, values);
      setToast({ type: "success", message: "Task updated" });
    } else {
      await addTask(values);
      clearFilters();
      setToast({ type: "success", message: "Task created" });
    }
  }

  async function handleStatusChange(task: Task, status: Status) {
    try {
      await changeStatus(task, status);
    } catch (err) {
      setToast({
        type: "error",
        message: `Couldn't update status. ${(err as ApiError).message}`,
      });
    }
  }

  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} loading={loading} />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium">Tasks</h2>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            New task
          </button>
        </div>

        {error ? (
          <ErrorBanner message={error} onRetry={reload} />
        ) : loading ? (
          <Skeleton />
        ) : tasks.length === 0 ? (
          <EmptyState
            title="No tasks yet"
            description="Create your first task to get started."
            actionLabel="New task"
            onAction={openCreate}
          />
        ) : (
          <>
            <FilterBar
              filters={filters}
              onChange={updateFilters}
              onClear={clearFilters}
              employees={employees}
              stores={stores}
            />

            {filtered.length === 0 ? (
              <EmptyState
                title="No tasks match your filters"
                description="Try changing or clearing the filters."
                actionLabel="Clear filters"
                onAction={clearFilters}
              />
            ) : (
              <>
                <p className="text-xs text-gray-500">
                  Showing {filtered.length} of {tasks.length} tasks
                </p>
                <TaskList
                  tasks={filtered}
                  pendingIds={pendingIds}
                  onStatusChange={handleStatusChange}
                  onEdit={openEdit}
                />
              </>
            )}
          </>
        )}
      </section>

      {formOpen && (
        <TaskFormModal
          key={editing?.id ?? "new"}
          task={editing}
          employees={employees}
          stores={stores}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}