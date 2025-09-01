import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getReport } from "../redux/modules/report";
import { useNavigate } from "react-router-dom";

const Reports = ({ getReport, report: { totals_by_user, overdue_tasks, loading } }) => {

    const [filter, setFilter] = useState({
        due_date: ""
    });
const navigate = useNavigate();
    useEffect(() => {
        getReport(); // fetch report data when component mounts
    }, [getReport]);

    if (loading) return <p>Loading...</p>;
    

    const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilter(prevFilters => ({
        ...prevFilters,
        [name]: value
    }));

    const queryParams = new URLSearchParams();
    if (value) { 
        queryParams.set("due_date", value);
        getReport({ date: value });
    } 

    navigate(`?${queryParams.toString()}`);
};

    return (
        <div style={{ padding: "20px" }}>

            <div className="column sort-container">
                <label htmlFor="priority-sort">Choose OverDue Date:</label>
                <input
                    type="date"
                    name="due_date"
                    value={filter.due_date}
                    onChange={handleFilterChange}
                />
            </div>

            <h2>Totals by User</h2>
            <table border="1" cellPadding="8" style={{ marginBottom: "30px", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {totals_by_user?.length > 0 ? (
                        totals_by_user.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.user}</td>
                                <td>{Math.floor(item.minutes)} Min</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h2>Overdue Tasks</h2>
            <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {overdue_tasks?.length > 0 ? (
                        overdue_tasks.map((task, idx) => (
                            <tr key={idx}>
                                <td>{task.title}</td>
                                <td>{new Date(task.due_date).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No overdue tasks</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = (state) => ({
    report: state.report,
});

export default connect(mapStateToProps, { getReport })(Reports);
