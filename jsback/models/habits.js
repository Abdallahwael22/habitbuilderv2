import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Habit = sequelize.define('Habit', {
    habit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Only habit_id as the primary key
        autoIncrement: true, // Auto-increment for habit_id
        allowNull: false,
    },
    habit_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    person_user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    habit_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    habit_days_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    habit_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Default value for habit status
    },
});

export default Habit;
