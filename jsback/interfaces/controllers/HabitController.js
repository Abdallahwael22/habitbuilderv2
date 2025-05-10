const CreateHabitUseCase = require('../../application/use-cases/habits/CreateHabitUseCase.js');
const SequelizeHabitRepository = require('../../infrastructure/repositories/SequelizeHabitRepository.js');

class HabitController {
    constructor() {
        const habitRepository = new SequelizeHabitRepository();
        this.createHabitUseCase = new CreateHabitUseCase(habitRepository);
        this.habitRepository = habitRepository;
    }

    async createHabit(req, res) {
        try {
            const { habit_name, person_user_name, habit_description, habit_days_count } = req.body;
            const habit = await this.createHabitUseCase.execute({
                habit_name,
                person_user_name,
                habit_description,
                habit_days_count,
                habit_status: false
            });
            res.status(201).json({ message: 'Habit created successfully', habit });
        } catch (error) {
            res.status(500).json({ message: 'Error creating habit', error: error.message });
        }
    }

    async getHabits(req, res) {
        try {
            const { person_user_name } = req.query;
            const habits = await this.habitRepository.findAll(person_user_name);
            res.status(200).json(habits);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching habits', error: error.message });
        }
    }

    async deleteHabit(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.habitRepository.delete(id);
            
            if (!deleted) {
                return res.status(404).json({ message: 'Habit not found' });
            }

            res.status(200).json({ message: 'Habit deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting habit', error: error.message });
        }
    }

    async updateHabitStatus(req, res) {
        try {
            const { id } = req.params;
            const { habit_status } = req.body;
            const updated = await this.habitRepository.updateStatus(id, habit_status);
            
            if (!updated) {
                return res.status(404).json({ message: 'Habit not found or no changes' });
            }

            res.status(200).json({ message: 'Habit updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating habit', error: error.message });
        }
    }
}

module.exports = new HabitController(); 