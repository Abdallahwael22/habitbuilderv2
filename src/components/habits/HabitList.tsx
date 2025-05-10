
import { useHabits } from "@/context/HabitContext";
import HabitCard from "./HabitCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

interface HabitListProps {
  onAddHabit: () => void;
}

const HabitList = ({ onAddHabit }: HabitListProps) => {
  const { habits, loading } = useHabits();

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Loading your habits...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Habits</h2>
        <Button onClick={onAddHabit} className="bg-habit-blue hover:bg-habit-lightBlue">
          <Plus className="mr-2 h-4 w-4" /> Add Habit
        </Button>
      </div>

      {habits.length === 0 ? (
        <Card className="p-8 text-center">
          <h3 className="text-xl font-medium mb-2">No habits yet</h3>
          <p className="text-gray-500 mb-4">
            Start building better habits by adding your first habit.
          </p>
          <Button onClick={onAddHabit} className="bg-habit-blue hover:bg-habit-lightBlue">
            <Plus className="mr-2 h-4 w-4" /> Add Your First Habit
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitList;
