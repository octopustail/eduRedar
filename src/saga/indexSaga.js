import {fork} from 'redux-saga/effects'

import {getPersonalRecordFlow,helloSaga} from './personalSaga'

export default function* rootSaga(){
    yield fork(getPersonalRecordFlow)
    yield fork(helloSaga)
}