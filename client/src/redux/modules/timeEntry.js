import { toast } from 'react-toastify';
import { api } from '../../utils';

const ADD_TIME_ENTRY = 'time/ADD_TIME_ENTRY ';
const GET_TIME_ENTRY = 'time/GET_TIME_ENTRY ';
const UPDATE_TIME_ENTRY = 'time/UPDATE_TIME_ENTRY ';
const TIME_ENTRY_ERROR = 'time/TIME_ENTRY_ERROR';


export const addTimeEntry = (formData) => async (dispatch) => {
    try {
        const res = await api.post('/time-entries', formData);
        console.log("data sent" + res.data)
        dispatch(getTimeEntry());

        toast.success('Time was successfully added! ')
    } catch (err) {
        dispatch({
            type: TIME_ENTRY_ERROR,
            payload: {
                msg: err.response?.statusText || err.message,
                status: err.response?.status || 500
            }
        })
        toast.error(err.message)
    }
}
export const getTimeEntry = () => async (dispatch) => {
    try {
        const res = await api.get('/get-time-entries');
        console.log("data sent" + res.data)
        dispatch({
            type: GET_TIME_ENTRY,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: TIME_ENTRY_ERROR,
            payload: {
                msg: err.response?.statusText || err.message,
                status: err.response?.status || 500
            }
        })
    }
}

export const updateTimeEntry = (time_id) => async (dispatch) => {
    try {
        const res = await api.patch(`/update-time-entries/${time_id}`);
        console.log("data sent" + res.data)
        dispatch(getTimeEntry());

        toast.success('tha time for the task you selected was successfully end')
    } catch (err) {
        dispatch({
            type: TIME_ENTRY_ERROR,
            payload: {
                msg: err.response?.statusText || err.message,
                status: err.response?.status || 500
            }
        })
        toast.error('there is an error occured'+ err.message)

    }
}


const initialState = {
    times: [],
    timesEntry: [],
    loading: true,
}

export default function reducer(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case ADD_TIME_ENTRY:
            return {
                ...state,
                timesEntry: [...state.timesEntry, payload],
                loading: false,
            }
        case GET_TIME_ENTRY:
            return {
                ...state,
                timesEntry: payload.times,
                loading: false,
            }
        case TIME_ENTRY_ERROR:
            return {
                ...state,
                times: [],
                loading: false
            }
        default: return state
    }
}


