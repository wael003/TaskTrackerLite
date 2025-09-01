const mongoose = require('mongoose');

const TimeEntries = new mongoose.Schema({
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    start_ts: {
        type: Date,
        default: () => new Date()
       
    },
    end_ts: {
        type: Date,
        
    },

})

// TimeEntries.pre('save', function (next) {
//     if (this.start_ts > this.end_ts) {
//         return next(new Error('The start time must be before end time'));
//     }
//     next();
// });

module.exports = mongoose.model('TimeEntries', TimeEntries)