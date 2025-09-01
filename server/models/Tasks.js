const mongoose = require('mongoose');

const Tasks = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    assignee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'med', 'high'],
        required: true,
        default: 'low'
    },
    status: {
        type: String,
        enum: ['todo', 'doing', 'done'],
        required: true,
        default: 'todo'
    },
    due_date: {
        type: Date,

    },
    created_at: {
        type: Date,
        default: () => new Date()
    }


})

module.exports = mongoose.model('Task', Tasks)