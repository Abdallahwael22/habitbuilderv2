import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const ChallengeUser = sequelize.define('ChallengeUser', {
    person_user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    challenge_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default ChallengeUser;
