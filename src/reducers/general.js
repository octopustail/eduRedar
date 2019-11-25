/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-19 19:52:25
 * @LastEditTime: 2019-11-19 16:14:21
 * @LastEditors: Please set LastEditors
 */
export const actionType = {
    // GET_GENERAL_GPA: 'GET_GENERAL_GPA',
    // GET_GPA_FLOW: 'GET_GPA_FLOW',
    // GET_GENERAL_RECORD: 'GET_GENERAL_RECORD',
    GET_GENERAL_GPA_FLOW_RECORD: 'GET_GENERAL_GPA_FLOW_RECORD',
    RESPONSE_GENERAL_GPA_FLOW_RECORD: 'RESPONSE_GENERAL_GPA_FLOW_RECORD',
    GET_STUDENT_GROUP: 'GET_STUDENT_GROUP',
    RESPONSE_STUDENT_GROUP: 'RESPONSE_STUDENT_GROUP',
    GET_STUDENT_LIST: 'GET_STUDENT_LIST',
    RESPONSE_STUDENT_LIST: 'RESPONSE_STUDENT_LIST',


    GET_STUDENT_RECORD_ANALYZE: 'GET_STUDENT_RECORD_ANALYZE',
    RESPONSE_STUDENT_RECORD_ANALYZE: 'RESPONSE_STUDENT_RECORD_ANALYZE',
    GET_STUDENT_MATH: 'GET_STUDENT_MATH',
    RESPONSE_STUDENT_MATH: 'RESPONSE_STUDENT_MATH',
    GET_STUDENT_WEEK_RECORD: 'GET_STUDENT_WEEK_RECORD',
    RESPONSE_STUDENT_WEEK_RECORD: 'RESPONSE_STUDENT_WEEK_RECORD',
    GET_STUDENT_GPA: 'GET_STUDENT_GPA',
    RESPONSE_STUDENT_GPA: 'RESPONSE_STUDENT_GPA',
    GET_GENERAL_AE: 'GET_GENERAL_AE',
    RESPONSE_GENERAL_AE: 'RESPONSE_GENERAL_AE',
}

const initialState = {
    general_gpa: [],
    general_records: {},
    student_group: [],
    //现在是按随机森林等的分类
    student_type: '',
    student_record_analyze: [],
    student_math: [],
    student_week_record: [],
    student_gpa: [],
    general_ae:[]

}

export const actions = {
    //根据请求的学生的类别去请求学生数据
    get_general_gpa_flow_record: function (stype, list) {
        return {
            type: actionType.GET_GENERAL_GPA_FLOW_RECORD,
            stype,
            list,
        }

    },
    get_student_group: function (stype, list) {
        return {
            type: actionType.GET_STUDENT_GROUP,
            stype,
            list
        }
    },
    get_student_list: function (start, end, sortBy) {
        return {
            type: actionType.GET_STUDENT_LIST,
            start,
            end,
            sortBy
        }
    },
    get_student_record_analyze: function () {
        return {
            type: actionType.GET_STUDENT_RECORD_ANALYZE,
        }
    },
    get_student_math: function () {
        return {
            type: actionType.GET_STUDENT_MATH,
        }
    },
    get_student_week_record: function (list) {
        return {
            type: actionType.GET_STUDENT_WEEK_RECORD,
            list
        }
    },
    get_student_gpa: function (list) {
        return {
            type: actionType.GET_STUDENT_GPA,
            list
        }
    },
    get_general_ae: function (list) {
        return {
            type: actionType.GET_GENERAL_AE,
            list
        }
    }
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.RESPONSE_GENERAL_GPA_FLOW_RECORD:
            return {
                ...state,
                // general_lib: action.data,
                // gpa_ae: action.data.ae,
                general_records: action.data,
                // general_gpa: action.data.gpa
                // student_type:action.data.stype
            }
        case actionType.RESPONSE_STUDENT_RECORD_ANALYZE:
            return {
                ...state,
                student_record_analyze: action.data,
            }
        // case actionType.RESPONSE_STUDENT_LIST:
        // return{
        //     ...state,
        //     student_group:action.data[0].list,
        //     student_type:action.data[0].stype,
        // }
        case actionType.RESPONSE_STUDENT_GROUP:
            return {
                ...state,
                student_group: action.data[0].list,
                student_type: action.data[0].stype,
            }

        case actionType.RESPONSE_STUDENT_MATH:
            return {
                ...state,
                student_math: action.data,
            }

        case actionType.RESPONSE_STUDENT_WEEK_RECORD:
            return {
                ...state,
                student_week_record: action.data,
            }
        case actionType.RESPONSE_STUDENT_GPA:
            return {
                ...state,
                student_gpa: action.data,
            }
        case actionType.RESPONSE_GENERAL_AE:
            return {
                ...state,
                general_ae: action.data,
            }
        default:
            return state
    }
}