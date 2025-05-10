
export interface Habit {
  id: string;
  name: string;
  description?: string;
  goalDuration: number; // in days
  currentStreak: number;
  longestStreak: number;
  completed: boolean;
  createdAt: Date;
  userId: string;
}

export interface DailyCompletion {
  id: string;
  habitId: string;
  date: Date;
  completed: boolean;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: number; // in days
  habits: string[]; // Array of habit IDs associated with this challenge
}

export interface UserChallenge {
  userId: string;
  challengeId: string;
  startDate: Date;
  completed: boolean;
}
