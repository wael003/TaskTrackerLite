const Task = require('../models/Tasks');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json({ msg: "New Task Created!", newTask })
    } catch (err) {
        res.status(500).json({ msg:  err.message });
    }


}

exports.getTask = async (req, res) => {
    try {
        let { status, assignee_id, q, page = 1, page_size = 10 } = req.query;

        if (!status && !assignee_id && !q) {
            const tasks = await Task.find()
                .populate('assignee_id', 'name')
                .skip((page - 1) * page_size)
                .limit(page_size)
                .sort({ created_at: -1 })

            const total = await Task.countDocuments();

            res.json({
                page,
                page_size,
                total,
                total_pages: Math.ceil(total / page_size),
                data: tasks
            });

        }

        page = parseInt(page);
        page_size = parseInt(page_size);

        const filter = {};

        if (status) filter.status = status;
        if (assignee_id) filter.assignee_id = assignee_id;
        if (q) {
            filter.$or = [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        }

        const tasks = await Task.find(filter)
            .populate('assignee_id', 'name')
            .skip((page - 1) * page_size)
            .limit(page_size)
            .sort({ created_at: -1 })

        const total = await Task.countDocuments(filter);

        res.json({
            page,
            page_size,
            total,
            total_pages: Math.ceil(total / page_size),
            data: tasks
        });

    } catch (err) {
        res.status(500).json({ msg: "Server error", Error:  err.message });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ msg: "At least one field is required!" });
        }
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true })
            .populate('assignee_id', 'name');

        if (!updatedTask) {
            return res.status(404).json({ msg: "Task Not Found!" });
        }

        res.status(200).json({ msg: 'task updated successfully!', updatedTask });
    } catch (err) {
        res.status(500).json({ msg: "server Error", Error:  err.message });

    }
}