import { Link, useLocation } from "react-router-dom"
import { getUser } from "../../redux/modules/users"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { addTimeEntry, getTimeEntry } from "../../redux/modules/timeEntry"
import TimeItem from "./TimeItem"


const TimeEntry = ({ getUser, addTimeEntry, users , getTimeEntry ,timesEntry:{timesEntry , loading}}) => {
    const location = useLocation()
    const { tasks } = location.state || {};

    const [formData, setFormData] = useState({
        task_id: "",
        user_id: "",

    })


    const { task_id, user_id } = formData;

    useEffect(() => {
        getUser()
    }, [getUser])

    function onChange(e) {
        return setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    function onSubmit(e) {
        e.preventDefault();
        addTimeEntry(formData);
        setFormData({
            task_id: "",
            user_id: "",
        })

    }
    

    return (
        <div className="main" style={{ textAlign: "center", width: 700, padding: 20 }}>
            <p className="form-title">Time Entry </p>

            <form className="form1" onSubmit={onSubmit}>
                <div style={{ width: 495, marginLeft: 60 }}>

                    <select
                        id="assignee-filter"
                        className="sort-dropdown"
                        placeholder='the Task'
                        name="task_id"
                        value={task_id}
                        onChange={onChange}
                    >
                        <option>select Task to Begain</option>
                        {tasks?.map(task => (
                            <option key={task._id} value={task._id}>
                                {task.title}
                            </option>
                        ))}
                    </select>


                </div>

                <div style={{ width: 495, marginLeft: 60 }}>
                    <select
                        id="assignee-filter"
                        className="sort-dropdown"
                        placeholder='User to Begain'
                        name="user_id"
                        value={user_id}
                        onChange={onChange}
                    >
                        <option>select user to Begain</option>
                        {users && users.map(user => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" />
                <Link className="btn btn-light" to='/tasks'>Go Back</Link>
            </form>


            <div>
                <ShowTimes getTimeEntry={getTimeEntry} timesEntry={timesEntry}/>
            </div>

        </div>

    )
}

function ShowTimes({getTimeEntry,timesEntry}) {

    useEffect(()=>{
        getTimeEntry()
    },[getTimeEntry])



    return(
         <div className="home">
                    <div>
                        <div>
                            {timesEntry?.map(time => (
                                <TimeItem key={time._id} time={time} />
                            ))}
                        </div>
                    </div>
        
                </div>
    )

}

const mapStateToProps = (state) => ({
    users: state.users.users,
    timesEntry : state.timeEntry
})

export default connect(mapStateToProps, { getUser, addTimeEntry ,getTimeEntry})(TimeEntry)