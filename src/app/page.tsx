import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Header from './../components/layout/Header';
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
  return (
    <ProtectedRoute>
      <Header />
      <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <Dashboard />
      </main>
    </ProtectedRoute>
  );
}
