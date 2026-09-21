"use client";

import { useCallback, useEffect, useState } from "react";
import { createTask, getTasks, updateTask, updateTaskStatus } from "@/app/api/tasks";
import type { Status, Task, TaskInput, ApiError } from "@/types/index";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingIds, setPendingIds] = useState<string[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setTasks(await getTasks());
    } catch (err) {
      setError((err as ApiError).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addTask = useCallback(async (input: TaskInput) => {
    const created = await createTask(input);
    setTasks((prev) => [created, ...prev]);
  }, []);

  const editTask = useCallback(async (id: string, input: TaskInput) => {
    const updated = await updateTask(id, input);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }, []);

  const changeStatus = useCallback(async (task: Task, status: Status) => {
    const previous = task.status;
    if (previous === status) return;

    setPendingIds((ids) => [...ids, task.id]);
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status } : t)));

    try {
      await updateTaskStatus(task.id, status);
    } catch (err) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: previous } : t)));
      throw err;
    } finally {
      setPendingIds((ids) => ids.filter((id) => id !== task.id));
    }
  }, []);

  return { tasks, loading, error, reload: load, addTask, editTask, changeStatus, pendingIds };
}