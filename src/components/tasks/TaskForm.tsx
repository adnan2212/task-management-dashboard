"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTaskSchema, type TaskFormValues } from "@/schemas/taskSchema";
import { STATUS_LABELS, STATUS_OPTIONS } from "@/constants/status";
import { todayISO } from "@/utils/helper";
import type { Task } from "@/types/index";

const inputClass =
  "mt-1 w-full rounded-lg border border-gray-300  px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

interface Props {
  task: Task | null;
  employees: string[];
  stores: string[];
  onSubmit: (values: TaskFormValues) => Promise<void>;
  onCancel: () => void;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

export default function TaskForm({ task, employees, stores, onSubmit, onCancel }: Props) {
  const mode = task ? "edit" : "create";
  const schema = useMemo(() => getTaskSchema(mode), [mode]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(schema),
    defaultValues: task
      ? {
          title: task.title,
          employee: task.employee,
          store: task.store,
          dueDate: task.dueDate,
          status: task.status,
        }
      : { title: "", employee: "", store: "", dueDate: "", status: "pending" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 px-2">
      <Field label="Title" error={errors.title?.message}>
        <input type="text" autoFocus {...register("title")} className={inputClass} />
      </Field>

      <Field label="Employee" error={errors.employee?.message}>
        <input type="text" list="employee-options" {...register("employee")} className={inputClass} />
        <datalist id="employee-options">
          {employees.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </Field>

      <Field label="Store" error={errors.store?.message}>
        <input type="text" list="store-options" {...register("store")} className={inputClass} />
        <datalist id="store-options">
          {stores.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </Field>

      <Field label="Due date" error={errors.dueDate?.message}>
        <input
          type="date"
          min={mode === "create" ? todayISO() : undefined}
          {...register("dueDate")}
          className={inputClass}
        />
      </Field>

      {/* New tasks always start as "pending", so only show status when editing. */}
      {mode === "edit" && (
        <Field label="Status" error={errors.status?.message}>
          <select {...register("status")} className={inputClass}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </Field>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : mode === "edit" ? "Save changes" : "Create task"}
        </button>
      </div>
    </form>
  );
}