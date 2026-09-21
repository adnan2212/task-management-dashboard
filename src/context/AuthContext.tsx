"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { login as loginRequest } from "@/app/api/auth";
import { clearAuth, getStoredUser, getToken, saveAuth } from "@/utils/storage";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  ready: boolean; // false until we've checked localStorage
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  // Restore session on first load (localStorage only exists in the browser).
  useEffect(() => {
    if (getToken()) setUser(getStoredUser());
    setReady(true);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginRequest(email, password);
    saveAuth(res.token, res.user);
    setUser(res.user);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}