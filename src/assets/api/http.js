import axios from 'axios'
import { Message } from 'element-ui'
// 创建一个axios实例
axios.defaults.baseURL = process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // 当跨域请求时发送cookie
    axios.defaults.timeout = 30000; // 请求超时


// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 在发送请求之前的处理
        if (config.method == 'get' && config.url.includes('https://restapi.amap.com')) {
            return config
        }
        config.headers.Authorization = window.sessionStorage.getItem("token")
        return config
    },
    error => {
        //处理请求错误
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(response => {
    const res = response.data
    return res
},
    error => {
        console.log(error.response.data.message);
        Message({
            message: error.response.data.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
const http = {
    // 封装get请求
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    },
    // 封装post请求
    post(url, data = {}, config) {
        return new Promise((resolve, reject) => {
            axios.post(url, data, config)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                })
        })
    },
}

export default http
