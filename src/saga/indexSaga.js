/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-25 16:58:55
 * @LastEditTime: 2019-11-19 16:13:09
 * @LastEditors: Please set LastEditors
 */
import {fork} from 'redux-saga/effects'

import {getPersonalRecordFlow} from './personalSaga'
import {getGeneralGpaRecordFlow} from './generalSaga'
import {getStudentGroupFlow} from './generalSaga'
import {getStudentListFlow} from './generalSaga'
//刷卡柱状图
import {getStudentRecordAnalyzeFlow} from './generalSaga'
//一组人的加权平均成绩
import {getGeneralGpaFlow} from './generalSaga'
//环形热力图
import {getGeneralWeekRecordFlow} from './generalSaga'
//数学成绩-加权平均分热力图
import {getStudentMathFlow} from './generalSaga'
import {getGroupCountFlow} from './groupSaga'
import {getGroupCountRecords} from './groupSaga'
import {getGroupStudentsFlow} from './groupSaga'

export default function* rootSaga(){
    yield fork(getPersonalRecordFlow)
    yield fork(getGeneralGpaRecordFlow)
    yield fork(getStudentGroupFlow)
    yield fork(getStudentListFlow)
    yield fork(getGroupCountFlow)
    yield fork(getGroupCountRecords)
    yield fork(getGroupStudentsFlow)
    yield fork(getStudentRecordAnalyzeFlow)
    yield fork(getStudentMathFlow)
    yield fork(getGeneralWeekRecordFlow)
    yield fork(getGeneralGpaFlow)
}