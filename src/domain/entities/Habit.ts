export interface Habit {
    habit_id: string;
    habit_name: string;
    person_user_name: string;
    habit_description: string;
    habit_days_count: number;
    habit_status: boolean;
}

export class HabitEntity implements Habit {
    constructor(
        public habit_id: string,
        public habit_name: string,
        public person_user_name: string,
        public habit_description: string,
        public habit_days_count: number,
        public habit_status: boolean = false
    ) {}

    static fromJSON(json: any): HabitEntity {
        return new HabitEntity(
            json.habit_id,
            json.habit_name,
            json.person_user_name,
            json.habit_description,
            json.habit_days_count,
            json.habit_status
        );
    }
} 