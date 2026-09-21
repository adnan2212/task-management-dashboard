"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, LogOut } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const initials = (user?.name ?? "?")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-6">
      <div className="flex gap-2">
        <LayoutDashboard size={21}/>
        <h1 className="text-base font-medium">Task dashboard</h1>
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <span className="hidden sm:inline">{user?.name || "Adnan Shaikh"}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-800">
          {initials || "AS"}
        </div>
        <button onClick={handleLogout} className="rounded-lg px-2 py-1 hover:bg-gray-100">
          <LogOut />
        </button>
      </div>
    </header>
  );
}