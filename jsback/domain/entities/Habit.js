class Habit {
    constructor(habit_id, habit_name, person_user_name, habit_description, habit_days_count) {
        this.habit_id = habit_id;
        this.habit_name = habit_name;
        this.person_user_name = person_user_name;
        this.habit_description = habit_description;
        this.habit_days_count = habit_days_count;
        this.habit_status = false;
    }

    validate() {
        if (!this.habit_name || !this.person_user_name) {
            throw new Error('Missing required fields');
        }
        return true;
    }

    complete() {
        this.habit_status = true;
    }
}

export default Habit; 