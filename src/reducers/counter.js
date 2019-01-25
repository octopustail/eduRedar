import {combineReducers} from 'redux'
import {reducer as asyncInfo} from './getAsyncData'
/*action*/


export const INCREMENT = "counter/INCREMENT";
export const DECREMENT = "counter/DECREMENT";
export const RESET = "counter/RESET";

export function increment() {
    return { type: INCREMENT }
}

export function decrement() {
    return { type: DECREMENT }
}

export function reset() {
    return { type: RESET }
}



/*
* 初始化state
 */

const initState = {
    count: 0
};
/*
* reducer
 */
export function reducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            };
        case DECREMENT:
            return {
                count: state.count - 1
            };
        case RESET:
            return { count: 0 };
        default:
            return state
    }
}

export default combineReducers({
    reducer,
    asyncInfo:asyncInfo

})