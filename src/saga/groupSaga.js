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
        if(res){
            if(res.code === 0){
                yield put({type:GroupAction.RESPONSE_GROUP_RECORDS,data:res.data})
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
        if(res){
            if(res.code === 0){
                //在这里发出counts和river请求。
                yield put({type:GroupAction.RESPONSE_GROUP_STUDENT,data:res.data})
                yield put({type:GroupAction.GET_GROUP_COUNT,list:res.data.students})
                yield put({type:GroupAction.GET_GROUP_RECORDS,list:res.data.students})

            }
        }
    }
}

export function* getFeatures(flag){
    yield put({type:IndexAction.FETCH_START})
    try{
        return yield call(get,`/features?flag=${flag}`)
    }catch(err){
        yield put({type:IndexAction.SET_MESSAGE,msgContent:`请求错误,${err}`,msgType:0})
    }finally{
        yield put({type:IndexAction.FETCH_END})
    }
}

export function* getFeaturesFlow(){
    while(true){
        let req = yield take(GroupAction.GET_FEATURES)
        let res =  yield call(getFeatures,req.flag)
        if(res){
            if(res.code === 0){
                //在这里发出counts和river请求。
                yield put({type:GroupAction.RESPONSE_FEATURES,data:res.data.features})
            }
        }
    }
}

