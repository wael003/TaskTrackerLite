import { api } from '../../utils';

const GET_REPORT = 'user/GET_REPORT';
const GET_REPORT_ERROR = 'user/GET_REPORT_ERROR';


export const getReport = ({ date } = {}) => async (dispatch) => {
    const params = new URLSearchParams();

    if (date) {
        const isoDate = new Date(date).toISOString(); // ensures proper date format
        params.append('date', isoDate);
    }

    try {
        const res = await api.get(`/reports/daily?${params.toString()}`);
        console.log(res.data)
        dispatch({
            type: GET_REPORT,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_REPORT_ERROR,
            payload: {
                msg: err.response?.statusText || err.message,
                status: err.response?.status || 500
            }
        })
    }
}



const initialState = {
    totals_by_user: [],
    overdue_tasks: [],
    loading: true,
}

export default function reducer(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_REPORT:
            console.log(payload)
            return {
                ...state,
                totals_by_user: payload.totals_by_user,
                overdue_tasks: payload.overdue_tasks,
                loading: false,
            }
        case GET_REPORT_ERROR:
            return {
                ...state,
                totals_by_user: [],
                overdue_tasks: [],
                loading: false
            }
        default: return state
    }
}


