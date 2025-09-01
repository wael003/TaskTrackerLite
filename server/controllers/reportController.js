const TimeEntries = require('../models/TimeEntries');
const Task = require('../models/Tasks');


exports.getReport = async (req, res) => {
    try {
        const { date } = req.query;
        const reportDate = new Date(date);
        const start_ts = new Date(reportDate);
        start_ts.setHours(0, 0, 0, 0);

        const end_ts = new Date(reportDate);
        end_ts.setHours(23, 59, 59, 999);

        const totalsByUser = await TimeEntries.aggregate([
            {
                $match: {
                    start_ts: { $gte: start_ts, $lt: end_ts }
                }
            },
            {
                $group: {
                    _id: "$user_id",
                    minutes: { $sum: { $divide: [{ $subtract: ["$end_ts", "$start_ts"] }, 60000] } }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            { $project: { user: "$user.name", minutes: 1 } }
        ])

        const overdueTasks = await Task.find({ due_date: { $lt: start_ts  }, status: { $ne: "done" } })
            .populate("assignee_id", "name")
            .select("title assignee_id due_date");

        res.json({
            totals_by_user: totalsByUser,
            overdue_tasks: overdueTasks.map(t => ({
                id: t._id,
                title: t.title,
                assignee: t.assignee_id.name,
                due_date: t.due_date
            }))
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error", error: err.message });
    }

}