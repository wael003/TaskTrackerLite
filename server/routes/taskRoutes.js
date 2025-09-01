const express = require('express');
const route = express.Router();
const taskController = require('../controllers/taskController');
const { check } = require('express-validator');

route.post('/tasks',
    check('title', 'title is required!').notEmpty(),
    check('assignee_id', 'assignee_id is required!').notEmpty(),
    check('priority', 'priority is required').notEmpty(),
    check('status', 'status is required').notEmpty()
    , taskController.createTask)

route.get('/tasks', taskController.getTask);
route.patch('/tasks/:id', taskController.updateTask);



module.exports = route;