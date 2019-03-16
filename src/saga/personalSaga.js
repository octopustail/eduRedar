import {take,call,put,select} from 'redux-saga/effects'
import {actionType as IndexAction} from '../reducers'
import {actionType as PersonalAction} from '../reducers/person'
import {get,post} from '../fetch/fetch'

export function* getPersonalRecord(id){
    yield put({type:IndexAction.FETCH_START});
    try{
        return yield call(get,`/studentRecord?sid=${id}`)
    }catch(err){
        yield put({type:IndexAction.SET_MESSAGE,msgContent:'请求错误',msgType:0})
    }finally{
        yield put({type:IndexAction.FETCH_END})
    }
}

export function* getPersonalRecordFlow(){
    while(true){
        let req = yield take(PersonalAction.GET_PERSONAL_RECORDS);
        let res = yield call(getPersonalRecord,req.id)

        if(res){
            if(res.code === 0){
                yield put({type:PersonalAction.RESPONSE_PERSONAL_RECORDS,data:res.data})
            }
        }
    }
}