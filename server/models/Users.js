const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    name: {
        type: String,
        unique : true,
        required : true
    }
})

module.exports = mongoose.model('User' , Users)