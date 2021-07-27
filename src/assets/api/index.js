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
// 上架客房接口
let onShelf = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/onShelf', obj)
}
// 下架客房接口
let offShelf = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/offShelf', obj)
}
// 编辑客房
let editRoom = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/editRoom', obj)
}
let classifySelect = (obj) => {
    return axios.post('/hotelv2/index/merchant/roomClassify/classifySelect', obj)
}
let getSelectOption = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/getSelectOption', obj)
}
export {
    bizLogin,
    passReset,
    userLogin,
    getRoomList,
    getUserInfo,
    onShelf,
    offShelf,
    editRoom,
    classifySelect,
    getSelectOption
}