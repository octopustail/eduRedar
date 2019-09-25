/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-27 20:45:41
 * @LastEditTime: 2019-09-25 21:20:43
 * @LastEditors: Please set LastEditors
 */
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
        if(res){
            if(res.code === 0){
                yield put({type:GeneralAction.RESPONSE_GENERAL_GPA_FLOW_RECORD,data:res.data})
            }
        }
    }
}

export function* getStudentGroup(type){
    yield put({type:IndexAction.FETCH_START})
    try{
        console.log('type',type)
        return yield call(get,`/studentGroup?stype=${type}`)
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
    } n 
}

export function* getStudentList(start,end,sortBy){
    console.log(start,end,sortBy)
    yield put({type:IndexAction.FETCH_START})
    try{
        return yield call(get,`/studentList?start=${start}&end=${end}&sortBy=${sortBy}`)
    }catch(err){
        yield put({type:IndexAction.SET_MESSAGE,msgContent:`请求错误,${err}`,msgType:0})
    }finally{
        yield put({type:IndexAction.FETCH_END})
    }
}

export function* getStudentListFlow(){
    while(true){
        let req = yield take(GeneralAction.GET_STUDENT_LIST)
        let res =  yield call(getStudentList,req.start,req.end,req.sortBy)
        if(res){
            if(res.code === 0){
                //在这里发出三合一请求。
                yield put({type:GeneralAction.GET_GENERAL_GPA_FLOW_RECORD,list:res.data})
            }
        }
    }
}

export function* getStudentRecordAnalyze(){
    yield put({type:IndexAction.FETCH_START})
    try{
        return yield call(get,`/studentRecordsAnalyze`)
    }catch(err){
        yield put({type:IndexAction.SET_MESSAGE,msgContent:`请求错误,${err}`,msgType:0})
    }finally{
        yield put({type:IndexAction.FETCH_END})
    }
}

export function* getStudentRecordAnalyzeFlow(){
    while(true){
        let req = yield take(GeneralAction.GET_STUDENT_RECORD_ANALYZE)
        let res =  yield call(getStudentRecordAnalyze,req.start,req.end,req.sortBy)
        if(res){
            if(res.code === 0){
                //在这里发出三合一请求。
                yield put({type:GeneralAction.RESPONSE_STUDENT_RECORD_ANALYZE,data:res.data.stuRecordAnalyze})
            }
        }
    }
}

