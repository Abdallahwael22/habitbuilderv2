import { IHabitRepository } from '../../domain/repositories/IHabitRepository';
import { Habit, HabitEntity } from '../../domain/entities/Habit';

export class HabitRepository implements IHabitRepository {
    private readonly API_URL = 'http://localhost:3000';

    async createHabit(habit: Omit<Habit, 'habit_id'>): Promise<Habit> {
        const response = await fetch(`${this.API_URL}/habits`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(habit),
        });

        if (!response.ok) {
            throw new Error('Failed to create habit');
        }

        const data = await response.json();
        return HabitEntity.fromJSON(data.habit);
    }

    async getHabits(person_user_name?: string): Promise<Habit[]> {
        const url = person_user_name 
            ? `${this.API_URL}/habits?person_user_name=${person_user_name}`
            : `${this.API_URL}/habits`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch habits');
        }

        const data = await response.json();
        return data.map((habit: any) => HabitEntity.fromJSON(habit));
    }

    async getHabitById(id: string): Promise<Habit | null> {
        const response = await fetch(`${this.API_URL}/habits/${id}`);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error('Failed to fetch habit');
        }

        const data = await response.json();
        return HabitEntity.fromJSON(data);
    }

    async deleteHabit(id: string): Promise<boolean> {
        const response = await fetch(`${this.API_URL}/habits/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete habit');
        }

        return true;
    }

    async updateHabitStatus(id: string, status: boolean): Promise<boolean> {
        const response = await fetch(`${this.API_URL}/habits/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ habit_status: status }),
        });

        if (!response.ok) {
            throw new Error('Failed to update habit status');
        }

        return true;
    }
} 