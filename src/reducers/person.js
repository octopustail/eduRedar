export const actionType = {
    GET_PERSONAL_RECORDS: 'GET_PERSONAL_RECORDS',
    GET_BOOK_BORROW: 'GET_BOOK_BORROW',
    GET_ACTUAL_ENTROPY: 'GET_ACTUAL_ENTROPY',
    GET_GPA: 'GET_GPA',
    GET_MATH: 'GET_MATH',
    GET_PERSONAL_INF0: 'GET_PERSONAL_INF0',
    RESPONSE_PERSONAL_RECORDS: 'RESPONSE_PERSONAL_RECORDS',
    RESPONSE_BOOK_BORROW: 'RESPONSE_BOOK_BORROW',
    RESPONSE_ACTUAL_ENTROPY: 'RESPONSE_ACTUAL_ENTROPY',
    RESPONSE_GPA: 'RESPONSE_GPA',
    RESPONSE_MATH: 'RESPONSE_MATH',
    RESPONSE_PERSONAL_INF0: 'RESPONSE_PERSONAL_INF0'
}

const initialState = {
    personal_records: {"sid":"2030403"},
    borrowed_books: {},
    gpa: {},
    math: {},
    actual_entropy: {},
    info: {}
}

export const actions = {
    get_personal_records: function (id) {
        return {
            type: actionType.GET_PERSONAL_RECORDS,
            id
            // records
        }
    },
    get_book_borrowed: function (id, sem) {
        return {
            type: actionType.GET_BOOK_BORROW,
            id,
            sem
        }
    },
    get_actual_entropy: function (id, sem) {
        return {
            type: actionType.GET_ACTUAL_ENTROPY,
            id,
            sem
        }
    },
    get_actual_entropy: function (id, sem) {
        return {
            type: actionType.GET_ACTUAL_ENTROPY,
            id,
            sem
        }
    },
    get_actual_entropy: function (id, sem) {
        return {
            type: actionType.GET_ACTUAL_ENTROPY,
            id,
            sem
        }
    },
    get_personal_info: function (id) {
        return {
            type: actionType.GET_PERSONAL_INF0,
            id
        }
    }
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.RESPONSE_PERSONAL_RECORDS:
            return {
                ...state,
                personal_records: action.data.stuRecord
            }
        case actionType.RESPONSE_BOOK_BORROW: {
            return {
                ...state,
                borrowed_books: [...action.data.borrowed_books]
            }
        }
        case actionType.RESPONSE_ACTUAL_ENTROPY: {
            return {
                ...state,
                actual_entropy: [...action.data.actual_entropy]
            }
        }
        case actionType.RESPONSE_GPA: {
            return {
                ...state,
                gpa: [...state.data.gpa]

            }
        }
        case actionType.RESPONSE_MATH: {
            return {
                ...state,
                math: [...state.data.math]

            }
        }
        case actionType.RESPONSE_PERSONAL_INF0: {
            return {
                ...state,
                get_personal_info: action.data.personalInfo

            }
        }
        default:
            return state;
    }
}