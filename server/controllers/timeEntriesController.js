const TimeEntries = require('../models/TimeEntries');
const Task = require('../models/Tasks');


exports.addTimeEntries = async (req, res) => {
    try {
        const { task_id, user_id, start_ts, end_ts } = req.body;

        const currentDate = new Date();

        const existingTime = await TimeEntries.findOne({ task_id, user_id });
        if (existingTime && currentDate < existingTime.end_ts) {
            return res.status(403).json({ msg: 'You cannot enter two time entries for the same user and task in the same time' });
        }

        if (!task_id || !user_id) return res.status(400).json({ msg: "task_id and user_id are required" });

        const task = await Task.findById(task_id);

        if (!task) return res.status(404).json({ msg: "Task not found" });

        if (start_ts > end_ts) {
            return res.status(403).json({ msg: "The start time must be before end time" })
        }

        let newTime = await TimeEntries.create(req.body);
        newTime = await newTime.populate('task_id', 'title description status assignee_id');
        newTime = await newTime.populate('user_id', 'name');


        res.status(201).json({ msg: "Time is added", newTime })
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error", error: err.message });
    }

}
exports.getTimeEntries = async (req, res) => {
    try {
        const times = await TimeEntries.find()
            .populate('task_id', 'title description status assignee_id')
            .populate('user_id', 'name')

        res.status(200).json({ times });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error", error: err.message });
    }

}
exports.updateTimeEntries = async (req, res) => {
    try {
        const { id } = req.params;

        const currentTime = await TimeEntries.findById(id);
        if (currentTime.end_ts) {
            return res.status(403).json({ msg: "this Time wa Stoped !" });
        }

        const updatedTime = await TimeEntries.findByIdAndUpdate(id, { end_ts: new Date() }, { new: true })
            .populate('task_id', 'title description status assignee_id')
            .populate('user_id', 'name')


        if (!updatedTime) {
            return res.status(404).json({ msg: "Task Not Found!" });
        }

        res.status(200).json({ msg: 'time updated successfully!', updatedTime });
    } catch (err) {
        res.status(500).json({ msg: "server Error", Error: err.message });

    }

}