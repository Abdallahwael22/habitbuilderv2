import { Habit } from '../entities/Habit';

export interface IHabitRepository {
    createHabit(habit: Omit<Habit, 'habit_id'>): Promise<Habit>;
    getHabits(person_user_name?: string): Promise<Habit[]>;
    getHabitById(id: string): Promise<Habit | null>;
    deleteHabit(id: string): Promise<boolean>;
    updateHabitStatus(id: string, status: boolean): Promise<boolean>;
} 