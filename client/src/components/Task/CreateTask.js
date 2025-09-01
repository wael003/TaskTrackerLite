import { connect } from "react-redux"
import { createTask } from "../../redux/modules/task"
import { getUser } from "../../redux/modules/users";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const CreateTask = ({ createTask, getUser, users }) => {

    const [formData, setFormData] = useState({
        title: "",
        discrption: "",
        assignee_id: "",
        priority: "low",
        status: "todo",
        due_date: "",
    })
    const { title, discrption, assignee_id, priority, status, due_date } = formData;

    const navigate = useNavigate();

    useEffect(() => {
        getUser()
    }, [getUser])

    function onChange(e) {
        return setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    function onSubmit(e) {
        e.preventDefault();
        createTask(formData);
        navigate('/tasks')
    }


    return (
        <div className="main" style={{ textAlign: "center", width: 700, padding: 20 }}>
            <p className="form-title">Create Task </p>

            <form className="form1" onSubmit={onSubmit}>
                <div>
                    <input type="text" placeholder="* Title" name="title" value={title} onChange={onChange} />
                </div>
                <div>
                    <input type="text" placeholder="Discrption" name="discrption" value={discrption} onChange={onChange} />
                </div>
                <div style={{ width: 495, marginLeft: 60 }}>

                    <select
                        id="assignee-filter"
                        className="sort-dropdown"
                        placeholder='assignee to'
                        name="assignee_id"
                        value={assignee_id}
                        onChange={onChange}
                    >
                        <option>select user to assignee</option>
                        {users && users.map(user => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))}
                    </select>


                </div>
                <div style={{ width: 495, marginLeft: 60 }}>

                    <select
                        id="status-filter"
                        className="sort-dropdown"
                        name="priority"
                        placeholder='Priority'
                        value={priority}
                        onChange={onChange}
                    >
                        <option value="low" >low</option>
                        <option value="med">med</option>
                        <option value="high">high</option>
                    </select>
                </div>
                <div style={{ width: 495, marginLeft: 60 }} >

                    <select
                        id="status-filter"
                        className="sort-dropdown"
                        name="status"
                        placeholder='Status'
                        value={status}
                        onChange={onChange}>
                        <option value="todo" >todo</option>
                        <option value="doing">doing</option>
                        <option value="done">done</option>
                    </select>
                </div>
                <div>
                    <h3 style={{ marginLeft: 110, textAlign: 'left', marginBottom: 20 }}>Due Date</h3>
                    <input
                        type="date"
                        name="due_date"
                        value={due_date}
                        onChange={onChange}
                        min={new Date().toISOString().split("T")[0]} // today
                    />
                </div>

                <input type="submit" className="btn btn-primary" />
                <Link className="btn btn-light" to='/tasks'>Go Back</Link>
            </form>

        </div>

    )
}

const mapStateToProps = (state) => ({
    users: state.users.users
})

export default connect(mapStateToProps, { createTask, getUser })(CreateTask)