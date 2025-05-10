import sequelize from './database.js';
import Person from './models/person.js';
import Habit from './models/habits.js';
import HabitUser from './models/habit_user.js';
import Challenge from './models/challenge.js';
import ChallengeUser from './models/challenge_user.js';

async function syncDatabase() {
    try {
        // Sync the database without force: true to avoid dropping tables every time
        await sequelize.sync({ force: false });
        console.log('✅ Database has been synchronized successfully!');
    } catch (error) {
        console.error('❌ Error while syncing database:', error);
    }
}

// Call the function to sync the database only if necessary


import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
// Register endpoint
app.post('/register', async (req, res) => {
    const { username, name, email, password } = req.body;

    // Basic validation
    if (!username || !name || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }
    console.log('yayayyayayay');
    try {
        // Create new person
        const newUser = await Person.create({ username, name, email, password });
        res.status(201).json({ message: 'User registered successfully.', user: newUser });
    } catch (error) {
        console.error('❌ Error registering user:', error);
        res.status(500).json({ message: 'Error registering user.', error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Person.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }


        res.json({
            user: {
                username: user.username,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.post('/habits', async (req, res) => {
    try {
        const { habit_id, habit_name, person_user_name, habit_description, habit_days_count } = req.body;

        const habit = await Habit.create({
            habit_id,
            habit_name,
            person_user_name,
            habit_description,
            habit_days_count,
            habit_status: false,
        });

        res.status(201).json({ message: 'Habit created successfully', habit });
    } catch (error) {
        res.status(500).json({ message: 'Error creating habit', error: error.message });
    }
});

app.get('/habits', async (req, res) => {
    try {
        const { person_user_name } = req.query;

        const where = person_user_name ? { person_user_name } : {};
        const habits = await Habit.findAll({ where });

        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching habits', error: error.message });
    }
});
app.delete('/habits/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Habit.destroy({
            where: {
                habit_id: id,
            },
        });

        if (deleted === 0) return res.status(404).json({ message: 'Habit not found' });

        res.status(200).json({ message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting habit', error: error.message });
    }
});


app.put('/habits/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [updated] = await Habit.update({ habit_status: true }, {
            where: {
                habit_id: id,
            },
        });

        if (updated === 0) return res.status(404).json({ message: 'Habit not found or no changes' });

        res.status(200).json({ message: 'Habit updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating habit', error: error.message });
    }
});





// Add these routes to your existing Express app

// Create a new challenge
app.post('/challenges', async (req, res) => {
    try {
        const { challenge_name, challenge_description, challenge_days_count, person_user_name } = req.body;

        // Validation
        if (!challenge_name || !challenge_days_count || !person_user_name) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        // Create the challenge
        const newChallenge = await Challenge.create({
            challenge_name,
            challenge_description,
            challenge_days_count,
            person_user_name
        });

        res.status(201).json({
            message: 'Challenge created successfully',
            challenge: newChallenge
        });
    } catch (error) {
        console.error('❌ Error creating challenge:', error);
        res.status(500).json({ message: 'Error creating challenge', error: error.message });
    }
});

// Get challenge by ID
app.get('/challenges/:id', async (req, res) => {
    try {
        const challenge = await Challenge.findByPk(req.params.id);

        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        res.json(challenge);
    } catch (error) {
        console.error('❌ Error fetching challenge:', error);
        res.status(500).json({ message: 'Error fetching challenge', error: error.message });
    }
});



// Change password endpoint
app.post('/change-password', async (req, res) => {
    const { username, currentPassword, newPassword } = req.body;

    // Basic validation
    if (!username || !currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        // Find the user
        const user = await Person.findByPk(username);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Verify current password
        if (user.password !== currentPassword) {
            return res.status(401).json({ message: 'Current password is incorrect.' });
        }

        // Update password
        await user.update({ password: newPassword });

        res.json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('❌ Error changing password:', error);
        res.status(500).json({ message: 'Error changing password.', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    syncDatabase();
}

)
