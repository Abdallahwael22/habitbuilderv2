import { Habit, DailyCompletion } from "@/domain/models/habit";

// Backend endpoints integration
const API_BASE = "http://localhost:3000"; // Change this to your actual backend base URL

export const getUserHabits = async (userId: string): Promise<Habit[]> => {
  const response = await fetch(`${API_BASE}/habits?person_user_name=${userId}`);
  if (!response.ok) throw new Error("Failed to fetch habits");
  const data = await response.json();
  return data.map((item: any) => ({
    id: item.habit_id.toString(),
    name: item.habit_name,
    description: item.habit_description,
    goalDuration: item.habit_days_count,
    currentStreak: 0, // Optional, you may update this logic later
    longestStreak: 0,
    completed: item.habit_status || false,
    createdAt: new Date(),
    userId: item.person_user_name,
  }));
};

export const createHabit = async (
  habit: Omit<Habit, "id" | "createdAt" | "currentStreak" | "longestStreak" | "completed">
): Promise<Habit> => {
  const body = {
    habit_id: Math.floor(Math.random() * 1000000),
    habit_name: habit.name,
    person_user_name: habit.userId,
    habit_description: habit.description,
    habit_days_count: habit.goalDuration,
  };
  const response = await fetch(`${API_BASE}/habits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("Failed to create habit");
  const data = await response.json();
  return {
    id: data.habit.habit_id.toString(),
    name: data.habit.habit_name,
    description: data.habit.habit_description,
    goalDuration: data.habit.habit_days_count,
    currentStreak: 0,
    longestStreak: 0,
    completed: data.habit.habit_status,
    createdAt: new Date(),
    userId: data.habit.person_user_name,
  };
};

export const deleteHabit = async (habitId: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/habits/${habitId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete habit");
};

export const completeHabit = async (habitId: string): Promise<DailyCompletion> => {
  const response = await fetch(`${API_BASE}/habits/${habitId}`, {
    method: "PUT",
  });
  if (!response.ok) throw new Error("Failed to complete habit");
  return {
    id: Math.random().toString(36).substr(2, 9),
    habitId,
    date: new Date(),
    completed: true,
  };
};

export const getSuggestedHabits = (): Omit<Habit, "id" | "createdAt" | "userId" | "currentStreak" | "longestStreak" | "completed">[] => {
  return [
    {
      name: "Drink 2L of water",
      description: "Stay hydrated throughout the day",
      goalDuration: 30,
    },
    {
      name: "Walk 30 minutes",
      description: "Get some fresh air and exercise",
      goalDuration: 30,
    },
    {
      name: "Read for 20 minutes",
      description: "Expand your knowledge daily",
      goalDuration: 60,
    },
    {
      name: "Meditate for 10 minutes",
      description: "Practice mindfulness and reduce stress",
      goalDuration: 30,
    },
    {
      name: "Write in a journal",
      description: "Reflect on your day and thoughts",
      goalDuration: 30,
    },
  ];
};