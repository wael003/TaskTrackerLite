import { api } from '../../utils';

const GET_USER = 'user/GET_USER';
const GET_USER_ERROR = 'user/GET_USER_ERROR';


export const getUser = () => async (dispatch) => {
    try {
        const res = await api.get('/user');
        console.log(res.data)
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_USER_ERROR,
            payload: {
                msg: err.response?.statusText || err.message,
                status: err.response?.status || 500
            }
        })
    }
}



const initialState = {
    users: [],
    loading: true,
}

export default function reducer(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_USER:
            console.log(payload)
            return {
                ...state,
                users: payload.user,
                loading: false,
            }
        case GET_USER_ERROR:
            return {
                ...state,
                users: [],
                loading: false
            }
        default: return state
    }
}


