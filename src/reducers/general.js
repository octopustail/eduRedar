/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-19 19:52:25
 * @LastEditTime: 2019-10-17 10:22:13
 * @LastEditors: Please set LastEditors
 */
export const actionType = {
    // GET_GENERAL_GPA: 'GET_GENERAL_GPA',
    // GET_GPA_FLOW: 'GET_GPA_FLOW',
    // GET_GENERAL_RECORD: 'GET_GENERAL_RECORD',
    GET_GENERAL_GPA_FLOW_RECORD: 'GET_GENERAL_GPA_FLOW_RECORD',
    RESPONSE_GENERAL_GPA_FLOW_RECORD: 'RESPONSE_GENERAL_GPA_FLOW_RECORD',
    GET_STUDENT_GROUP:'GET_STUDENT_GROUP',
    RESPONSE_STUDENT_GROUP:'RESPONSE_STUDENT_GROUP',
    GET_STUDENT_LIST:'GET_STUDENT_LIST',
    RESPONSE_STUDENT_LIST:'RESPONSE_STUDENT_LIST',
    GET_STUDENT_RECORD_ANALYZE:'GET_STUDENT_RECORD_ANALYZE',
    RESPONSE_STUDENT_RECORD_ANALYZE:'RESPONSE_STUDENT_RECORD_ANALYZE',
    GET_STUDENT_MATH:'GET_STUDENT_MATH',
    RESPONSE_STUDENT_MATH:'RESPONSE_STUDENT_MATH',
}

const initialState = {
    general_gpa: [],
    general_records: {},
    student_group:[],
    student_type:'',
    student_record_analyze: [],
    student_math:[]
    
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
    },
    get_student_list:function(start,end,sortBy){
        return{
            type:actionType.GET_STUDENT_LIST,
            start,
            end,
            sortBy
        }
    },
    get_student_record_analyze:function(){
        return{
            type:actionType.GET_STUDENT_RECORD_ANALYZE,
        }
    },
    get_student_math:function(){
        return{
            type:actionType.GET_STUDENT_MATH,
        }
    }
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.RESPONSE_GENERAL_GPA_FLOW_RECORD:
            return {
                ...state,
                // general_lib: action.data.lib,
                gpa_ae: action.data.ae,
                general_records: action.data.records,
                general_gpa: action.data.gpa
                // student_type:action.data.stype
            }
        case actionType.RESPONSE_STUDENT_RECORD_ANALYZE:
            return{
                ...state,
                student_record_analyze:action.data,
            }
        // case actionType.RESPONSE_STUDENT_LIST:
        // return{
        //     ...state,
        //     student_group:action.data[0].list,
        //     student_type:action.data[0].stype,
        // }
        case actionType.RESPONSE_STUDENT_GROUP:
        return{
            ...state,
            student_group:action.data[0].list,
            student_type:action.data[0].stype,
        }

        case actionType.RESPONSE_STUDENT_MATH:
            return{
                ...state,
                student_math:action.data,
            }
        default:
            return state
    }
}