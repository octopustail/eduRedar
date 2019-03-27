export const actionType = {
    // GET_GENERAL_GPA: 'GET_GENERAL_GPA',
    // GET_GPA_FLOW: 'GET_GPA_FLOW',
    // GET_GENERAL_RECORD: 'GET_GENERAL_RECORD',
    GET_GENERAL_GPA_FLOW_RECORD: 'GET_GENERAL_GPA_FLOW_RECORD',
    RESPONSE_GENERAL_GPA_FLOW_RECORD: 'RESPONSE_GENERAL_GPA_FLOW_RECORD',
    GET_STUDENT_GROUP:'GET_STUDENT_GROUP',
    RESPONSE_STUDENT_GROUP:'RESPONSE_STUDENT_GROUP'

}

const initialState = {
    general_gpa: [],
    general_flow: [],
    general_records: {},
    student_group:[],
    student_type:'',
}

export const actions = {
    //根据请求的学生的类别去请求学生数据
    get_general_gpa_flow_record: function (stype,list) {
        return {
            type: actionType.GET_GENERAL_GPA_FLOW_RECORD,
            stype,
            list,
        }

    },
    get_student_group:function(stype,list){
        return{
            type:actionType.GET_STUDENT_GROUP,
            stype,
            list
        }
    }
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.RESPONSE_GENERAL_GPA_FLOW_RECORD:
            return {
                ...state,
                general_gpa: action.data.gpa,
                gpa_flow: action.data.flow,
                general_records: action.data.records
            }
        case actionType.RESPONSE_STUDENT_GROUP:
            return{
                ...state,
                student_group:action.data[0].list,
                student_type:action.data[0].stype,
            }
        default:
            return state
    }
}