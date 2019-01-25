
/* actionType */
export const GET_ASYNC_REQUEST = 'GET_ASYNC_REQUEST'
export const GET_ASYNC_SUCCESS = 'GET_ASYNC_SUCCESS'
export const GET_ASYNC_FAIL = 'GET_ASYNC_FAIL'
/*  initialState */
const initialState = {
    isLoading: false,
    async_info: {},
    error_msg: ''
}
/* actionCreator */

export function get_async_request() {
    return {
        type: GET_ASYNC_REQUEST,
        
    }
}

export function get_async_success(async_info) {
    return {
        type: GET_ASYNC_SUCCESS,
        async_info: async_info
    }
}

export function get_async_fail() {
    return {
        type: GET_ASYNC_FAIL,

    }
}

export function getUserInfo() {
    return function (dispatch) {
        dispatch(get_async_request())

        return fetch('http://localhost:8080/api.json')
            .then((response) => (
                response.json()
            ))
            .then((json) => {
                dispatch(get_async_success(json))
            })
            .catch(
                (e) => {
                    console.log(e)
                    dispatch(get_async_fail())
                }
            )
    }
}

/* reducer */
export function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ASYNC_REQUEST: {
            return {
                ...state,
                isLoading: true,
                async_info: {},
                error_msg: 'request error'
            }
        }
        case GET_ASYNC_SUCCESS: {
            console.log('action.async_info',action.async_info)
            return {
                ...state,
                isLoading: false,
                async_info: action.async_info,
                error_msg: ''
            }
        }
        case GET_ASYNC_FAIL: {
            return {
                ...state,
                isLoading: false,
                async_info: {},
                error_msg: ''
            }
        }
        default:
            return state
    }
}
