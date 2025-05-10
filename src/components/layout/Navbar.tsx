
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Flame, User, List } from "lucide-react";

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Flame className="h-6 w-6 text-habit-blue" />
            <span className="font-bold text-xl">HabitTracker</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-habit-blue flex items-center space-x-1">
              <List className="h-5 w-5" />
              <span>Habits</span>
            </Link>
            
            <Link to="/profile" className="text-gray-700 hover:text-habit-blue flex items-center space-x-1">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
