/*
 * @Author: your name
 * @Date: 2019-04-10 20:44:16
 * @LastEditTime: 2020-02-26 12:54:48
 * @LastEditors: Please set LastEditors
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
    all_students: [],
    features: [],
    stuList: [],
    dayCount: {},
    startDate: new Date(2009, 8),
    endDate: new Date(2011, 2),
    // math_grades:[]
}

export const actions = {
    //根据请求所有学生的类别去请求学生数据
    get_group_counts: function () {
        return {
            type: actionType.GET_GROUP_COUNT,
        }

    },
    get_group_records: function (grade, sems, flag) {
        return {
            type: actionType.GET_GROUP_RECORDS,
            grade, sems, flag
        }
    },
    get_group_students: function (grade, flag) {
        return {
            type: actionType.GET_GROUP_STUDENT,
            grade, flag
        }
    },
    get_features: function (grade, flag) {
        return {
            type: actionType.GET_FEATURES,
            grade, flag
        }
    }
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionType.RESPONSE_GROUP_STUDENT:
            return {
                ...state,
                all_students: action.data,
                // math_grades:action.data.math_grades
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
                stuList: action.data.stu_list,
                dayCount: action.data.dayCount,
                startDate: action.data.startDate,
                endDate: action.data.endDate
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