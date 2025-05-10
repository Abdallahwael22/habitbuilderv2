
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <Navbar />}
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© 2025 HabitTracker - Track your habits and build a better you</p>
      </footer>
    </div>
  );
};

export default Layout;
