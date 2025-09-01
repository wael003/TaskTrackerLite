const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

route.post('/add',
    check('name', 'name is required!').notEmpty()
    , userController.Register)
route.get('/' , userController.getUser)



module.exports = route;