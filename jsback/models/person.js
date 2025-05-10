import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Person = sequelize.define('Person', {
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Ensures the email is valid
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Person;
