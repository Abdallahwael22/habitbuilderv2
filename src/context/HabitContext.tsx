
import React, { createContext, useContext, useState, useEffect } from "react";
import { Habit } from "@/domain/models/habit";
import { 
  getUserHabits, 
  createHabit, 
  deleteHabit, 
  completeHabit 
} from "@/application/services/habitService";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface HabitContextType {
  habits: Habit[];
  loading: boolean;
  addHabit: (habit: Omit<Habit, "id" | "createdAt" | "currentStreak" | "longestStreak" | "completed" | "userId">) => Promise<void>;
  removeHabit: (habitId: string) => Promise<void>;
  markCompleted: (habitId: string) => Promise<void>;
  refreshHabits: () => Promise<void>;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchHabits = async () => {
    if (!user) {
      setHabits([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userHabits = await getUserHabits(user.id);
      setHabits(userHabits);
    } catch (error) {
      toast({
        title: "Could not load habits",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [user]);

  const addHabit = async (habitData: Omit<Habit, "id" | "createdAt" | "currentStreak" | "longestStreak" | "completed" | "userId">) => {
    if (!user) return;

    try {
      setLoading(true);
      const newHabit = await createHabit({
        ...habitData,
        userId: user.id,
      });
      
      setHabits((prev) => [...prev, newHabit]);
      toast({
        title: "Habit created",
        description: `"${newHabit.name}" has been added to your habits.`,
      });
    } catch (error) {
      toast({
        title: "Could not create habit",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeHabit = async (habitId: string) => {
    try {
      setLoading(true);
      await deleteHabit(habitId);
      setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
      toast({
        title: "Habit removed",
        description: "The habit has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Could not remove habit",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (habitId: string) => {
    try {
      await completeHabit(habitId);
      
      // Update the local state
      setHabits((prev) =>
        prev.map((habit) => {
          if (habit.id === habitId) {
            return {
              ...habit,
              currentStreak: habit.currentStreak + 1,
              longestStreak: Math.max(habit.currentStreak + 1, habit.longestStreak),
              completed: true,
            };
          }
          return habit;
        })
      );
      
      toast({
        title: "Habit completed",
        description: "Great job! Keep up the good work!",
      });
    } catch (error) {
      toast({
        title: "Could not mark habit as completed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const refreshHabits = async () => {
    await fetchHabits();
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        loading,
        addHabit,
        removeHabit,
        markCompleted,
        refreshHabits,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};
