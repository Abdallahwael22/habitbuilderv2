
import { Habit } from "@/domain/models/habit";
import { useHabits } from "@/context/HabitContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Trash, Check, Target } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface HabitCardProps {
  habit: Habit;
}

const HabitCard = ({ habit }: HabitCardProps) => {
  const { markCompleted, removeHabit } = useHabits();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleComplete = async () => {
    if (habit.completed) return;
    
    setIsAnimating(true);
    await markCompleted(habit.id);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleDelete = async () => {
    await removeHabit(habit.id);
  };

  const calculateProgress = () => {
    if (habit.goalDuration === 0) return 0;
    return (habit.currentStreak / habit.goalDuration) * 100;
  };

  return (
    <Card className={cn(
      "habit-card overflow-hidden",
      isAnimating && "animate-pulse-success",
      habit.completed && "border-habit-green"
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>{habit.name}</span>
          <div className="streak-badge bg-habit-blue">
            <Flame className="h-3 w-3 mr-1" />
            <span>{habit.currentStreak} day{habit.currentStreak !== 1 ? 's' : ''}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        {habit.description && (
          <p className="text-sm text-gray-500 mb-2">{habit.description}</p>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Progress towards goal:</span>
            <span className="font-medium">{Math.round(calculateProgress())}%</span>
          </div>
          
          <Progress value={calculateProgress()} className="h-2" />
          
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Current</span>
            <div className="flex items-center">
              <Target className="h-3 w-3 mr-1 text-habit-blue" />
              <span>Goal: {habit.goalDuration} days</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
          className="text-gray-500 hover:text-red-500 hover:border-red-200"
        >
          <Trash className="h-4 w-4 mr-1" /> Remove
        </Button>
        <Button
          onClick={handleComplete}
          disabled={habit.completed}
          size="sm"
          className={cn(
            "transition-colors",
            habit.completed 
              ? "bg-habit-green hover:bg-habit-green" 
              : "bg-habit-blue hover:bg-habit-lightBlue"
          )}
        >
          {habit.completed ? (
            <>
              <Check className="h-4 w-4 mr-1" /> Completed
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-1" /> Complete
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HabitCard;
