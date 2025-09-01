const express = require('express');
const route = express.Router();
const timeEntriesController = require('../controllers/timeEntriesController');
const { check } = require('express-validator');

route.post('/time-entries', timeEntriesController.addTimeEntries)
route.get('/get-time-entries', timeEntriesController.getTimeEntries)
route.patch('/update-time-entries/:id', timeEntriesController.updateTimeEntries)



module.exports = route;