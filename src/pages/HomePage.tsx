
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HabitList from "@/components/habits/HabitList";
import AddHabitForm from "@/components/habits/AddHabitForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHabits } from "@/context/HabitContext";
import { Trophy, Flame, Flag } from "lucide-react";

const HomePage = () => {
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const { habits } = useHabits();
  
  // Calculate total streaks
  const totalStreaks = habits.reduce((sum, habit) => sum + habit.currentStreak, 0);
  
  // Calculate completion percentage
  const completedToday = habits.filter(habit => habit.completed).length;
  const completionPercentage = habits.length > 0 
    ? Math.round((completedToday / habits.length) * 100) 
    : 0;
  
  // Motivational messages
  const motivationalMessages = [
    "Progress is progress, no matter how small.",
    "Consistency is the key to success.",
    "Small habits lead to big changes.",
    "Every day is a new opportunity to be better.",
    "You're building a better you, one habit at a time.",
  ];
  
  // Randomly select a motivational message
  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  return (
    <Layout>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Habit Dashboard</h1>
        
        {habits.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center space-x-4">
                <Flame className="h-8 w-8 text-habit-blue" />
                <div>
                  <p className="text-sm text-gray-500">Total Streaks</p>
                  <p className="text-2xl font-bold">{totalStreaks} days</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center space-x-4">
                <Trophy className="h-8 w-8 text-habit-green" />
                <div>
                  <p className="text-sm text-gray-500">Today's Progress</p>
                  <p className="text-2xl font-bold">{completionPercentage}%</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Motivation</p>
                <p className="text-base italic">"{randomMessage}"</p>
              </CardContent>
            </Card>
          </div>
        )}
        
        <HabitList onAddHabit={() => setIsAddHabitOpen(true)} />
        
        <div className="mt-8 p-6 bg-habit-blue/10 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold flex items-center">
                <Flag className="mr-2 h-5 w-5 text-habit-blue" />
                Challenges
              </h2>
              <p className="text-sm text-gray-600">Join challenges to build consistent habits with others</p>
            </div>
            <Link to="/challenges">
              <Button className="bg-habit-green hover:bg-habit-lightGreen">
                View Challenges
              </Button>
            </Link>
          </div>
        </div>
        
        <AddHabitForm 
          isOpen={isAddHabitOpen}
          onClose={() => setIsAddHabitOpen(false)}
        />
      </section>
    </Layout>
  );
};

export default HomePage;
