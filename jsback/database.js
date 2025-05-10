import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // You can change this to MySQL/PostgreSQL if needed
    logging: false, // Set true if you want to see raw SQL logs
});

// Test the DB connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
})();

export default sequelize;
