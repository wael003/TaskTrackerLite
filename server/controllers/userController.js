const User = require('../models/Users');
const { validationResult } = require('express-validator');

exports.Register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ msg: "user registerd", newUser })
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}
exports.getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({user })
    } catch (err) {
        res.status(500).json({ msg: err });
    }
}