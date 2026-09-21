"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import ErrorBanner from "@/components/ui/ErrorBanner";
import TaskForm from "./TaskForm";
import type { TaskFormValues } from "@/schemas/taskSchema";
import type { Task, ApiError } from "@/types/index";

interface Props {
  task: Task | null;
  employees: string[];
  stores: string[];
  onSave: (values: TaskFormValues) => Promise<void>;
  onClose: () => void;
}

export default function TaskFormModal({ task, employees, stores, onSave, onClose }: Props) {
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(values: TaskFormValues) {
    setServerError(null);
    try {
      await onSave(values);
      onClose();
    } catch (err) {
      // Keep the modal open so the user's input isn't lost.
      setServerError((err as ApiError).message);
    }
  }

  return (
    <Modal title={task ? "Edit task" : "New task"} onClose={onClose}>
      {serverError && (
        <div className="mb-4">
          <ErrorBanner message={serverError} />
        </div>
      )}
      <TaskForm
        task={task}
        employees={employees}
        stores={stores}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}