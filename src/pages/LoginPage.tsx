
import { Navigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { Flame } from "lucide-react";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
      <div className="w-full max-w-md mb-6 text-center">
        <div className="flex justify-center mb-2">
          <Flame className="h-10 w-10 text-habit-blue" />
        </div>
        <h1 className="text-3xl font-bold">HabitTracker</h1>
        <p className="text-gray-500 mt-2">
          Build better habits and track your progress.
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
