const IHabitRepository = require('../../domain/repositories/IHabitRepository');
const Habit = require('../../domain/entities/Habit');
const HabitModel = require('../database/models/Habit.js');

class SequelizeHabitRepository extends IHabitRepository {
    async create(habit) {
        const habitModel = await HabitModel.create({
            habit_id: habit.habit_id,
            habit_name: habit.habit_name,
            person_user_name: habit.person_user_name,
            habit_description: habit.habit_description,
            habit_days_count: habit.habit_days_count,
            habit_status: habit.habit_status
        });
        
        return new Habit(
            habitModel.habit_id,
            habitModel.habit_name,
            habitModel.person_user_name,
            habitModel.habit_description,
            habitModel.habit_days_count
        );
    }

    async findAll(person_user_name) {
        const where = person_user_name ? { person_user_name } : {};
        const habits = await HabitModel.findAll({ where });
        
        return habits.map(habit => new Habit(
            habit.habit_id,
            habit.habit_name,
            habit.person_user_name,
            habit.habit_description,
            habit.habit_days_count
        ));
    }

    async findById(id) {
        const habit = await HabitModel.findByPk(id);
        if (!habit) return null;
        
        return new Habit(
            habit.habit_id,
            habit.habit_name,
            habit.person_user_name,
            habit.habit_description,
            habit.habit_days_count
        );
    }

    async delete(id) {
        const deleted = await HabitModel.destroy({
            where: { habit_id: id }
        });
        return deleted > 0;
    }

    async updateStatus(id, status) {
        const [updated] = await HabitModel.update(
            { habit_status: status },
            { where: { habit_id: id } }
        );
        return updated > 0;
    }
}

module.exports = SequelizeHabitRepository; 