import {fork} from 'redux-saga/effects'

import {getPersonalRecordFlow} from './personalSaga'
import {getGeneralGpaRecordFlow} from './generalSaga'
import {getStudentGroup} from './generalSaga'
import {getStudentGroupFlow} from './generalSaga'

export default function* rootSaga(){
    yield fork(getPersonalRecordFlow)
    yield fork(getGeneralGpaRecordFlow)
    yield fork(getStudentGroup)
    yield fork(getStudentGroupFlow)
}