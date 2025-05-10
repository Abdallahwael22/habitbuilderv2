const { DataTypes } = require('sequelize');
const sequelize = require('../../../database.js');
const Person = require('./Person.js');

const Habit = sequelize.define('Habit', {
    habit_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    habit_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    person_user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Person,
            key: 'username'
        }
    },
    habit_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    habit_days_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    habit_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: true
});

// Define associations
Habit.belongsTo(Person, { foreignKey: 'person_user_name' });
Person.hasMany(Habit, { foreignKey: 'person_user_name' });

module.exports = Habit; 