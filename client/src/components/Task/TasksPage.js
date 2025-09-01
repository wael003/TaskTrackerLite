import { connect } from "react-redux"
import { getTask, updateTask } from "../../redux/modules/task"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate, useLocation } from "react-router-dom";
import { dateFormater } from "../../utils";


const TasksPage = ({ getTask, updateTask, task: { tasks, assignees, loading } }) => {
    const [filters, setFilters] = useState({
        priority: "",
        status: "",
        assignee: "",
        search: "",
        due_date: ""
    });

    const [confirmStatusMap, setConfirmStatusMap] = useState({});
    const [nextStatusMap, setNextStatusMap] = useState({});

    const navigate = useNavigate();
    const location = useLocation();

    const [sortedAndFilteredTasks, setSortedAndFilteredTasks] = useState([]);

    useEffect(() => {
        getTask();
    }, [getTask]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setFilters({
            status: params.get("status") || "",
            assignee: params.get("assignee") || "",
            search: params.get("search") || "",
        });
        if (!params.get("status") && !params.get("assignee") && !params.get("search")) {
            navigate(`/tasks`);
        }
    }, [location.search, navigate]);

    useEffect(() => {
        if (tasks) {
            let tasksToDisplay = [...tasks];

            // // Apply all filters first
            // if (filters.status) {
            //     tasksToDisplay = tasksToDisplay.filter(task => task.status === filters.status);
            // }

            // if (filters.assignee) {
            //     tasksToDisplay = tasksToDisplay.filter(task => task.assignee_id === filters.assignee);
            // }

            // if (filters.search) {
            //     tasksToDisplay = tasksToDisplay.filter(task =>
            //         task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            //         task.description.toLowerCase().includes(filters.search.toLowerCase())
            //     );
            // }
            if (filters.due_date) {
                const selectedDate = new Date(filters.due_date);
                tasksToDisplay = tasksToDisplay.filter(task => new Date(task.due_date) <= selectedDate);
            }

            // Apply sorting after filtering
            if (filters.priority) {
                const priorityOrder = { high: 1, med: 2, low: 3 };
                tasksToDisplay.sort((a, b) => {
                    const priorityA = priorityOrder[a.priority.toLowerCase()] || 4;
                    const priorityB = priorityOrder[b.priority.toLowerCase()] || 4;
                    return filters.priority === "asc" ? priorityA - priorityB : priorityB - priorityA;
                });
            }

            setSortedAndFilteredTasks(tasksToDisplay);
        }
    }, [tasks, filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    function onClick(e) {
        e.preventDefault();
        const queryParams = new URLSearchParams();

        if (filters.status) queryParams.set("status", filters.status);
        if (filters.assignee) queryParams.set("assignee", filters.assignee);
        if (filters.search) queryParams.set("search", filters.search);
        getTask({
            status: filters.status,
            assignee_id: filters.assignee,
            q: filters.search,
            priority: filters.priority
        });
        navigate(`?${queryParams.toString()}`);
    }

    const statusOrder = ["todo", "doing", "done"];

    function changeStatus(task) {
        const currentIndex = statusOrder.indexOf(task.status);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
        setNextStatusMap(prev => ({
            ...prev,
            [task._id]: nextStatus
        }));
        setConfirmStatusMap(prev => ({
            ...prev,
            [task._id]: true
        }));

    }

    if (loading) {
        return <p>Loading tasks...</p>;
    }

    return (
    <div>
        <div className="row filter-controls">
            <div className="column">
                <div className="row">
                    <div className="column sort-container">
                        <label htmlFor="priority-sort">Sort by Priority:</label>
                        <select
                            id="priority-sort"
                            className="sort-dropdown"
                            name="priority"
                            value={filters.priority}
                            onChange={handleFilterChange}
                        >
                            <option value="">None</option>
                            <option value="asc">High → Low</option>
                            <option value="desc">Low → High</option>
                        </select>
                    </div>
                    <div className="column sort-container">
                        <label htmlFor="priority-sort">Sort by Date:</label>
                        <input
                            type="date"
                            name="due_date"
                            value={filters.due_date}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="column sort-container">
                        <label htmlFor="status-filter">Filter by Status:</label>
                        <select id="status-filter" className="sort-dropdown" name="status" value={filters.status} onChange={handleFilterChange}>
                            <option value="">All</option>
                            <option value="todo">To Do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <div className="column sort-container">
                        <label htmlFor="assignee-filter">Filter by Assignee:</label>
                        <select
                            id="assignee-filter"
                            className="sort-dropdown"
                            name="assignee"
                            value={filters.assignee}
                            onChange={handleFilterChange}
                        >
                            <option value="">All</option>
                            {assignees && assignees.map(user => (
                                <option key={user._id} value={user._id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="column sort-container" style={{ marginLeft: 50, marginTop: -10 }}>
                        <label htmlFor="search">Search:</label>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            className="search-input"
                            placeholder="Search by title or description"
                            value={filters.search}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="column">
                        <button type="button" onClick={onClick} className="btn btn-light btn-search display-block" style={{marginTop:15}}>Search</button>
                    </div>
                    <div className="column">
                        <Link to={'/create-task'} className="btn btn-primary display-block" style={{ marginLeft: 20 }} >Create Task</Link>
                    </div>
                    <div>
                        <Link to={'/time-entry'} className="btn btn-dark" style={{ marginLeft: 20 }} state={{ tasks: tasks }}>Begain Time</Link>
                    </div>
                </div>
            </div>
        </div>
               <table className="task-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Assignee</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {sortedAndFilteredTasks.map(task => (
                    <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>
                            <button
                                className="btn btn-status btn-status2"
                                onClick={() => changeStatus(task)}
                            >
                                {confirmStatusMap[task._id] ? nextStatusMap[task._id] : task.status}
                            </button>
                        </td>
                        <td>{task.assignee_id.name}</td>
                        <td>{task.priority}</td>
                        <td>{dateFormater(task.due_date)}</td>
                        <td>
                            <button
                                type="button"
                                
                                className={`btn btn-confirm ${confirmStatusMap[task._id] ? '' : 'display-none'}`}
                                onClick={() => {
                                    updateTask(task._id, { status: nextStatusMap[task._id] });
                                    setConfirmStatusMap(prev => ({ ...prev, [task._id]: false }));
                                    setNextStatusMap(prev => ({ ...prev, [task._id]: undefined }));
                                }}
                            >
                                Confirm
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};



const mapStateToProps = (state) => ({
    task: state.task
});

export default connect(mapStateToProps, { getTask, updateTask })(TasksPage);