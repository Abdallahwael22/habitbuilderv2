const express = require('express');
const router = express.Router();
const habitController = require('../../interfaces/controllers/HabitController.js');

router.post('/', habitController.createHabit.bind(habitController));
router.get('/', habitController.getHabits.bind(habitController));
router.delete('/:id', habitController.deleteHabit.bind(habitController));
router.put('/:id', habitController.updateHabitStatus.bind(habitController));

module.exports = router; 