/*
 * @Author: your name
 * @Date: 2019-03-27 20:45:41
 * @LastEditTime: 2020-02-26 12:58:49
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /eduRedar/src/fetch/fetch.js
 */
import axios from 'axios'


let config ={
    baseURL : '/',
    transformRequest:[
        function(data){
            let ret = '';
            for(let it in data){
                ret += encodeURIComponent(it) + '=' +encodeURIComponent(data[it])+'&'
            }
            return ret
        }
    ],
    transformResponse:[
        function(data){
            return data
        }
    ],
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    timeout:50000,
    responseType:'json'
}

axios.interceptors.response.use(function(res){
    return res.data
})

export function get(url){
    return axios.get(url,config)
}
export function post(url){
    return axios.post(url,config)
}