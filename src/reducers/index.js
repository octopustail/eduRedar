import { combineReducers } from 'redux'
import { reducer as person } from './person'
import {reducer as general} from './general'
import {reducer as group} from './group'
//设置全局使用的异步请求action
export const actionType = {
    FETCH_START: 'FETCH_START',
    FETCH_END: 'FETCH_END',
    SET_MESSAGE: 'SET_MESSAGE'
}

const initialState = {
    isFetching: true,
    msg: {
        type: 1, //0失败，1成功
        content: ''
    }
}

export const actions = {
    clear_msg: function () {
        return {
            type: actionType.SET_MESSAGE,
            msgType: 1,
            msgContent: '',
        }
    }
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.FETCH_START:
            return {
                ...state,
                isFetching: true
            }
        case actionType.FETCH_END:
            return {
                ...state,
                isFetching: false
            }
        case actionType.SET_MESSAGE:
            return {
                ...state,
                isFetching: false,
                msg: {
                    type: actionType.msgType,
                    content: actionType.msgContent
                }
            }
        default:
        return state;
    }
}

export default combineReducers({ 
    person, 
    // general,
    group, 
    index:reducer 
})