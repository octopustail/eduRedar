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
    timeout:10000,
    responseType:'json'
}

axios.interceptors.response.use(function(res){
    return res.data
})

export function get(url){
    console.log(url)
    return axios.get(url,config)
}
export function post(url){
    return axios.post(url,config)
}