export type Status = "pending" | "in_progress" | "completed";

export interface Task {
  id: string;
  title: string;
  employee: string;
  store: string;
  dueDate: string; // "YYYY-MM-DD"
  status: Status;
}

export type TaskInput = Omit<Task, "id">;

export interface ApiError {
  message: string;
  status?: number;
}

export interface LoginResponse {
  token: string;
  user: { name: string; email: string };
}