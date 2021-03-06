/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-25 16:58:55
 * @LastEditTime: 2019-10-17 10:52:23
 * @LastEditors: Please set LastEditors
 */
import {fork} from 'redux-saga/effects'

import {getPersonalRecordFlow} from './personalSaga'
import {getGeneralGpaRecordFlow} from './generalSaga'
import {getStudentGroupFlow} from './generalSaga'
import {getStudentListFlow} from './generalSaga'
import {getStudentRecordAnalyzeFlow} from './generalSaga'
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
}