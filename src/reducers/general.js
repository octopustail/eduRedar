export const actionType = {
    // GET_GENERAL_GPA: 'GET_GENERAL_GPA',
    // GET_GPA_FLOW: 'GET_GPA_FLOW',
    // GET_GENERAL_RECORD: 'GET_GENERAL_RECORD',
    GET_GENERAL_GPA_FLOW_RECORD: 'GET_GENERAL_GPA_FLOW_RECORD',
    RESPONSE_GENERAL_GPA_FLOW_RECORD: 'RESPONSE_GENERAL_GPA_FLOW_RECORD'

}

const initialState = {
    general_gpa: [],
    general_flow: [],
    general_records: {}
}

export const actions = {
    //根据请求的学生的类别去请求学生数据
    get_general_gpa_flow_record: function (stype) {
        return {
            type: actionType.GET_GENERAL_GPA_FLOW_RECORD,
            stype
        }

    },
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.RESPONSE_GENERAL_GPA_FLOW_RECORD:
            return {
                ...state,
                general_gpa: action.data.generalGpa,
                gpa_flow: action.data.gpa_flow,
                general_records: action.data.general_records
            }
        default:
            return state
    }
}