import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const HabitUser = sequelize.define('HabitUser', {
    person_user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    habit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default HabitUser;
