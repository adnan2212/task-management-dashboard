import { client } from "./client";
import type { Task, TaskInput, Status } from "@/types/index";

export async function getTasks(): Promise<Task[]> {
  const { data } = await client.get<Task[]>("/tasks");
  return data;
}

export async function createTask(input: TaskInput): Promise<Task> {
  const { data } = await client.post<Task>("/tasks", input);
  return data;
}

export async function updateTask(id: string, input: TaskInput): Promise<Task> {
  const { data } = await client.put<Task>(`/tasks/${id}`, input);
  return data;
}

export async function updateTaskStatus(id: string, status: Status): Promise<Task> {
  const { data } = await client.patch<Task>(`/tasks/${id}`, { status });
  return data;
}