import { toast } from 'react-toastify';
import { api } from '../../utils';

const CREATE_TASK = 'task/CREATE_TASK';
const UPDATE_TASK = 'task/UPDATE_TASK';
const GET_TASK = 'task/GET_TASK';
const TASK_ERROR = 'task/TASK_ERROR';

export const createTask = (formData) => async (dispatch) => {
    try {
        const res = await api.post('/tasks', formData);

        dispatch({
            type: CREATE_TASK,
            payload: res.data
        })
        toast.success('The Task Successfully Created')
    } catch (err) {
        dispatch({
            type: TASK_ERROR,
            payload: {
                msg: err.response?.statusText || err.message,
                status: err.response?.status || 500
            }
        })
        toast.success('The Task Did not Create!')

    }
}
export const updateTask = (task_id, formData) => async (dispatch) => {
    try {
        const res = await api.patch(`/tasks/${task_id}`, formData);

        dispatch({
            type: UPDATE_TASK,
            payload: res.data
        })
        toast.success('The status was successfully updated')
    } catch (err) {
        dispatch({
            type: TASK_ERROR,
            payload: {
                msg: err.response?.statusText || err.message,
                status: err.response?.status || 500
            }
        })
        toast.error('Error happend')
    }
}

export const getTask = ({ status, assignee_id, q, page, page_size } = {}) => async (dispatch) => {
    try {
        const params = new URLSearchParams();

        if (status) params.append("status", status);
        if (assignee_id) params.append("assignee_id", assignee_id);
        if (q) params.append("q", q);
        if (page) params.append("page", page);
        if (page_size) params.append("page_size", page_size);
        console.log(params)
        const res = await api.get(`/tasks?${params.toString()}`);

        dispatch({
            type: GET_TASK,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: TASK_ERROR,
            payload: {
                msg: err.response?.statusText || err.message,
                status: err.response?.status || 500
            }
        })
    }
}

const initialState = {
    tasks: [],
    assignees: [],
    loading: true,
}

export default function reducer(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case CREATE_TASK:
            return {
                ...state,
                tasks: [...state.tasks, payload.data],
                assignees: [...new Map(
                    payload.data.map(task => [task.assignee_id._id, task.assignee_id])
                ).values()],
                loading: false,
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === payload.updatedTask._id ? payload.updatedTask : task
                ),
                loading: false
            };
        case GET_TASK:
            return {
                ...state,
                tasks: payload.data,
                assignees: [...new Map(
                    payload.data.map(task => [task.assignee_id._id, task.assignee_id])
                ).values()],
                loading: false
            }
        case TASK_ERROR:
            return {
                ...state,
                tasks: [],
                assignees: [],
                loading: false
            }
        default: return state
    }
}


