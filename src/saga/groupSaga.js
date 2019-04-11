import {take,call,put} from 'redux-saga/effects'
import {actionType as IndexAction} from '../reducers'
import {actionType as GroupAction} from '../reducers/group'
import {get,post} from '../fetch/fetch'

export function* getGroupCount(list){
    yield put({type:IndexAction.FETCH_START})
    try{
        return yield call(get,`/studentCounts?${list}`)
    }catch(err){
        yield put({type:IndexAction.SET_MESSAGE,msgContent:`请求错误,${err}`,msgType:0})
    }finally{
        yield put({type:IndexAction.FETCH_END})
    }
}

export function* getGroupCountFlow(){
    while(true){
        let req = yield take(GroupAction.GET_GROUP_COUNT)
        let res =  yield call(getGroupCount,req.list)
        console.log(res)
        if(res){
            if(res.code === 0){
                yield put({type:GroupAction.RESPONSE_GROUP_COUNT,data:res.data})
            }
        }
    }
}

export function* getGroupRecords(list){
    yield put({type:IndexAction.FETCH_START})
    try{
        return yield call(get,`/studentRecords?${list}`)
    }catch(err){
        yield put({type:IndexAction.SET_MESSAGE,msgContent:`请求错误,${err}`,msgType:0})
    }finally{
        yield put({type:IndexAction.FETCH_END})
    }
}

export function* getGroupCountRecords(){
    while(true){
        let req = yield take(GroupAction.GET_GROUP_RECORDS)
        let res =  yield call(getGroupRecords,req.list)
        console.log(res)
        if(res){
            if(res.code === 0){
                yield put({type:GroupAction.RESPONSE_GROUP_COUNT,data:res.data})
            }
        }
    }
}

export function* getGroupStudents(){
    yield put({type:IndexAction.FETCH_START})
    try{
        return yield call(get,`/studentCate`)
    }catch(err){
        yield put({type:IndexAction.SET_MESSAGE,msgContent:`请求错误,${err}`,msgType:0})
    }finally{
        yield put({type:IndexAction.FETCH_END})
    }
}

export function* getGroupStudentsFlow(){
    while(true){
        let req = yield take(GroupAction.GET_GROUP_STUDENT)
        let res =  yield call(getGroupStudents)
        console.log(res)
        if(res){
            if(res.code === 0){
                //在这里发出counts和river请求。
                console.log(res)
                yield put({type:GroupAction.RESPONSE_GROUP_STUDENTS,data:res.data})
                yield put({type:GroupAction.GET_GROUP_COUNT,list:res.data.list})
                yield put({type:GroupAction.GET_GROUP_RECORDS,list:res.data.list})

            }
        }
    }
}

