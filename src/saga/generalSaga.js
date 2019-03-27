import {take,call,put} from 'redux-saga/effects'
import {actionType as IndexAction} from '../reducers'
import {actionType as GeneralAction} from '../reducers/general'
import {get,post} from '../fetch/fetch'

export function* getGeneralGpaRecord(type,list){
    yield put({type:IndexAction.FETCH_START})
    try{
        return yield call(get,`/studentGpa?type=${type}&list=${list}`)
    }catch(err){
        yield put({type:IndexAction.SET_MESSAGE,msgContent:`请求错误,${err}`,msgType:0})
    }finally{
        yield put({type:IndexAction.FETCH_END})
    }
}

export function* getGeneralGpaRecordFlow(){
    while(true){
        let req = yield take(GeneralAction.GET_GENERAL_GPA_FLOW_RECORD)
        let res =  yield call(getGeneralGpaRecord,req.stype,req.list)
        console.log(res)
        if(res){
            if(res.code === 0){
                yield put({type:GeneralAction.RESPONSE_GENERAL_GPA_FLOW_RECORD,data:res.data})
            }
        }
    }
}

export function* getStudentGroup(type,list){
    yield put({type:IndexAction.FETCH_START})
    try{
        return yield call(get,`/studentGroup?type=${type}&list=${list}`)
    }catch(err){
        yield put({type:IndexAction.SET_MESSAGE,msgContent:`请求错误,${err}`,msgType:0})
    }finally{
        yield put({type:IndexAction.FETCH_END})
    }
}

export function* getStudentGroupFlow(){
    while(true){
        let req = yield take(GeneralAction.GET_STUDENT_GROUP)
        let res =  yield call(getStudentGroup,req.stype)
        console.log(res)
        if(res){
            if(res.code === 0){
                //在这里发出三合一请求。
                console.log(res)
                yield put({type:GeneralAction.RESPONSE_STUDENT_GROUP,data:res.data})
                yield put({type:GeneralAction.GET_GENERAL_GPA_FLOW_RECORD,stype:res.data[0].stype,list:res.data[0].list})
            }
        }
    }
}

