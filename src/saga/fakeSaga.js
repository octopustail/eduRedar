// /* 一个功能类似sage的函数 用于异步请求数据 */
// import {get_async_fail, get_async_request, get_async_request} from '../reducers/getAsyncData'
// export function getUserInfo(){
//     return function(dispatch){
//         dispatch(get_async_request())

//         return fetch('http://localhost:8080/api/user.json')
//                 .then((response)=>(
//                     response.json()
//                 ))
//                 .then((json)=>{
//                     dispatch(get_async_request(json))
//                 })
//                 .catch(
//                     ()=>{
//                         dispatch(get_async_fail())
//                     }
//                 )
//     }
// }