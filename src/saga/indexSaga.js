import {fork} from 'redux-saga/effects'

import {getPersonalRecordFlow} from './personalSaga'
import {getGeneralGpaRecordFlow} from './generalSaga'

export default function* rootSaga(){
    yield fork(getPersonalRecordFlow)
    yield fork(getGeneralGpaRecordFlow)
}