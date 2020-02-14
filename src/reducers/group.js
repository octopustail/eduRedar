/*
 * @Author: your name
 * @Date: 2019-04-10 20:44:16
 * @LastEditTime : 2020-02-13 13:51:13
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/src/reducers/group.js
 */
export const actionType = {
    // GET_GENERAL_GPA: 'GET_GENERAL_GPA',
    // GET_GPA_FLOW: 'GET_GPA_FLOW',
    // GET_GENERAL_RECORD: 'GET_GENERAL_RECORD',
    GET_GROUP_COUNT: 'GET_GROUP_COUNT',
    RESPONSE_GROUP_COUNT: 'RESPONSE_GROUP_COUNT',
    GET_GROUP_RECORDS: 'GET_GROUP_RECORDS',
    RESPONSE_GROUP_RECORDS: 'RESPONSE_GROUP_RECORDS',
    GET_GROUP_STUDENT: 'GET_GROUP_STUDENT',
    RESPONSE_GROUP_STUDENT: 'RESPONSE_GROUP_STUDENT',
    GET_FEATURES: 'GET_FEATURES',
    RESPONSE_FEATURES: 'RESPONSE_FEATURES'
}

/**
 * @description: groups的props
 * @param {
 * group_counts:刷卡次数的统计 river图的数据,
 * group_records:刷卡次数散点图数据,
 * group_groups:每一类种类的学生
 * } 
 * @return: 
 */
const initialState = {
    counts: [],
    records: [],
    students: [],
    features: [],
    stuList:[]
}

export const actions = {
    //根据请求的学生的类别去请求学生数据
    get_group_counts: function (list) {
        return {
            type: actionType.GET_GROUP_COUNT,
            list,
        }

    },
    get_group_records: function (list) {
        return {
            type: actionType.GET_GROUP_RECORDS,
            list
        }
    },
    get_group_students: function () {
        return {
            type: actionType.GET_GROUP_STUDENT
        }
    },
    get_features: function (flag) {
        return {
            type: actionType.GET_FEATURES,
            flag
        }
    }
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.RESPONSE_GROUP_STUDENT:
            return {
                ...state,
                students: action.data.students
            }
        case actionType.RESPONSE_GROUP_COUNT:
            return {
                ...state,
                counts: action.data
            }
        case actionType.RESPONSE_GROUP_RECORDS:
            return {
                ...state,
                records: action.data.count,
                stuList:action.data.stu_list
            }
        case actionType.RESPONSE_FEATURES:
            return {
                ...state,
                features: action.data
            }
        default:
            return state
    }
}