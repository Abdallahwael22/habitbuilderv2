import { IHabitRepository } from '../../../domain/repositories/IHabitRepository';
import { Habit } from '../../../domain/entities/Habit';

export class CreateHabitUseCase {
    constructor(private habitRepository: IHabitRepository) {}

    async execute(habit: Omit<Habit, 'habit_id'>): Promise<Habit> {
        if (!habit.habit_name || !habit.person_user_name) {
            throw new Error('Habit name and person username are required');
        }

        return await this.habitRepository.createHabit(habit);
    }
} 