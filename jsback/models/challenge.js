import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Challenge = sequelize.define('Challenge', {
    challenge_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-increment for challenge_id
        allowNull: false,
    },
    challenge_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    challenge_description: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field
    },
    challenge_days_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    person_user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Challenge;
