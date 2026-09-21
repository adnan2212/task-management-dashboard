import { NextResponse } from "next/server";
import { tasks, nextId } from "@/lib/mockDb";
import { requireAuth } from "@/lib/mockAuth";
import type { Task } from "@/types/index";

export async function GET(req: Request) {
  const denied = requireAuth(req);
  if (denied) return denied;
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const denied = requireAuth(req);
  if (denied) return denied;

  const body = await req.json().catch(() => null);
  if (!body?.title || !body?.employee || !body?.store || !body?.dueDate) {
    return NextResponse.json({ message: "All fields are required." }, { status: 422 });
  }

  const task: Task = {
    id: nextId(),
    title: body.title,
    employee: body.employee,
    store: body.store,
    dueDate: body.dueDate,
    status: body.status ?? "pending",
  };
  tasks.unshift(task);
  return NextResponse.json(task, { status: 201 });
}