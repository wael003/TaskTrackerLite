const express = require('express');
const route = express.Router();
const reportController = require('../controllers/reportController');


route.get('/reports/daily', reportController.getReport)



module.exports = route;