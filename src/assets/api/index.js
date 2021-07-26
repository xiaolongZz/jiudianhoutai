import axios from "./http.js"

// 商家端登录接口
let bizLogin = (obj) => {
    return axios.post('/hotelv2/index/merchant/auth/bizLogin', obj)
}

// 重置密码接口
let passReset = (obj) => {
    return axios.post('/hotelv2/index/auth/passReset', obj)
}

// 员工登录接口
let userLogin = (obj) => {
    return axios.post('/hotelv2/index/auth/userLogin', obj)
}

// 员工信息
let getUserInfo = (obj) =>{
    return axios.post('/hotelv2/index/merchant/user/getUserInfo',obj)
}
//  获取房间列表接口
let getRoomList = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/getRoomList', obj)
}

export {
    bizLogin,
    passReset,
    userLogin,
    getRoomList,
    getUserInfo
}