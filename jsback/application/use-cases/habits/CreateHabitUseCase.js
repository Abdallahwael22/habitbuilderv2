class CreateHabitUseCase {
    constructor(habitRepository) {
        this.habitRepository = habitRepository;
    }

    async execute(habitData) {
        // Dummy implementation for now
        return this.habitRepository.create(habitData);
    }
}

module.exports = CreateHabitUseCase; 