"use client";

import { useEffect } from "react";

export interface ToastState {
  message: string;
  type: "success" | "error";
}

interface Props {
  toast: ToastState | null;
  onDismiss: () => void;
}

export default function Toast({ toast, onDismiss }: Props) {
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(onDismiss, 4000);
    return () => clearTimeout(id);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const styles =
    toast.type === "error" ? "bg-red-600 text-white" : "bg-gray-900 text-white";

  return (
    <div
      role={toast.type === "error" ? "alert" : "status"}
      className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-2 text-sm shadow-lg ${styles}`}
    >
      {toast.message}
    </div>
  );
}