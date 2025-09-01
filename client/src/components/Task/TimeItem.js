import { connect } from "react-redux";
import { dateFormater } from "../../utils";
import { updateTimeEntry } from "../../redux/modules/timeEntry";



const TimeItem = ({ time , updateTimeEntry}) => {
    const task = time.task_id || {};
    const user = time.user_id || {};


    return (
        <div className="time-card" >
            <div className="time-card-content">
                <div className="post-column task">
                    <p>{time.task_id.title}</p>
                </div>
                <div className="post-column user">
                    <p>{time.user_id.name}</p>
                </div>
                <div className="post-column description">
                    <p>{time.task_id.description}</p>
                    <small style={{ color: 'gray' }}>Began at {dateFormater(time.start_ts)}</small>
                    {time.end_ts && (
                        <small style={{ color: 'gray' , display : 'block' }}>End at {dateFormater(time.end_ts)}</small>
                    )}
                </div>
                {!time.end_ts && (
                    <button type="button" className="btn btn-danger" onClick={() => updateTimeEntry(time._id)}>Stop</button>
                )}
            </div>
        </div>
    );
};



export default connect(null,{updateTimeEntry})(TimeItem);