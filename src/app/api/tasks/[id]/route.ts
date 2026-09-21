import { NextResponse } from "next/server";
import { tasks } from "@/lib/mockDb";
import { requireAuth } from "@/lib/mockAuth";

type Ctx = { params: Promise<{ id: string }> }; // params is a Promise in Next 15+

export async function PUT(req: Request, { params }: Ctx) {
  const denied = requireAuth(req);
  if (denied) return denied;

  const { id } = await params;
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return NextResponse.json({ message: "Task not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body?.title || !body?.employee || !body?.store || !body?.dueDate) {
    return NextResponse.json({ message: "All fields are required." }, { status: 422 });
  }

  tasks[idx] = { ...tasks[idx], ...body, id };
  return NextResponse.json(tasks[idx]);
}

export async function PATCH(req: Request, { params }: Ctx) {
  const denied = requireAuth(req);
  if (denied) return denied;

  const { id } = await params;
  const task = tasks.find((t) => t.id === id);
  if (!task) return NextResponse.json({ message: "Task not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!["pending", "in_progress", "completed"].includes(body?.status)) {
    return NextResponse.json({ message: "Invalid status." }, { status: 422 });
  }

  task.status = body.status;
  return NextResponse.json(task);
}