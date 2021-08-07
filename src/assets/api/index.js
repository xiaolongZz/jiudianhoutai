import axios from "./http.js"
//*********************************************************登录相关接口****************************************************************** */
// 商家端登录接口
let bizLogin = (obj) => {
    return axios.post('/hotelv2/index/merchant/auth/bizLogin', obj)
}
// 重置密码接口
let passReset = (obj) => {
    return axios.post('/hotelv2/index/merchant/auth/passReset', obj)
}
// 员工登录接口
let userLogin = (obj) => {
    return axios.post('/hotelv2/index/merchant/auth/userLogin', obj)
}
//*************************************************************首页相关接口********************************************************************* */
// 首页订单和收入统计
let statistics = (obj) => {
    return axios.post('/hotelv2/index/merchant/order/statistics', obj)
}
//*************************************************************订单模块相关接口***************************************************************** */

// 订单列表页面下拉框选项
let orderOption = (obj) => {
    return axios.post('/hotelv2/index/merchant/order/orderOption', obj)
}
// 酒店评论列表
let getHotelComment = (obj) => {
    return axios.post('/hotelv2/index/merchant/comment/getHotelComment', obj)
}
// 评论详情
let getCommentDetial = (obj) => {
    return axios.post('/hotelv2/index/merchant/comment/getCommentDetial', obj)
}
// 新增评论回复
let createReply = (obj) => {
    return axios.post('/hotelv2/index/merchant/comment/createReply', obj)
}
//订单列表
let orderList = (obj) => {
    return axios.post('/hotelv2/index/merchant/order/orderList', obj)
}
//订单详情
let orderDetails = (obj) => {
    return axios.post('/hotelv2/index/merchant/order/orderDetails', obj)
}
//删除订单
let deleteOrder = (obj) => {
    return axios.post('/hotelv2/index/merchant/order/delete', obj)
}
//*************************************************************客房管理相关接口***************************************************************** */

//  获取房间列表接口
let getRoomList = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/getRoomList', obj)
}
// 分类下拉列表
let classifySelect = (obj) => {
    return axios.post('/hotelv2/index/merchant/roomClassify/classifySelect', obj)
}
// 房间列表下拉框
let getSelectOption = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/getSelectOption', obj)
}
// 获取客房信息
let getRoomDetail = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/getDetail', obj)
}
// 编辑客房
let editRoom = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/editRoom', obj)
}
// 上架客房接口
let onShelf = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/onShelf', obj)
}
// 下架客房接口
let offShelf = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/offShelf', obj)
}
// 导出客房信息
let exportRoom = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/exportRoom', obj, { responseType: 'blob' })
}
// 获取七六云token
let uploadToken = (obj) => {
    return axios.get('hotelv2/index/qiniu/uploadToken', obj)
}
// 新增客房
let createRoom = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/createRoom', obj)
}
// 获取价格调整日历
let getPriceCalendar = (obj) => {
    return axios.post('/hotelv2/index/merchant/price/getPriceCalendar', obj)
}
// 调整房间价格
let updatePrice = (obj) => {
    return axios.post('/hotelv2/index/merchant/price/updatePrice', obj)
}
// 创建客房分类
let createRoomClassify = (obj) => {
    return axios.post('/hotelv2/index/merchant/roomClassify/createRoomClassify', obj)
}
// 删除客房
let deleteRoom = (obj) => {
    return axios.post('/hotelv2/index/merchant/room/delete', obj)
}
// 删除客房分类
let deleteRoomClassify = (obj) => {
    return axios.post('/hotelv2/index/merchant/roomClassify/delete', obj)
}
// 修改分类状态
let changeStatus = (obj) => {
    return axios.post('/hotelv2/index/merchant/roomClassify/changeStatus', obj)
}
// 分类列表
let getClassifyList = (obj) => {
    return axios.post('/hotelv2/index/merchant/roomClassify/getClassifyList', obj)
}
// 酒店标签下拉框
let hotellableSelect = (obj) => {
    return axios.post('/hotelv2/index/merchant/lable/hotellableSelect', obj)
}

//*************************************************************财务管理相关接口***************************************************************** */
//*************************************************************系统设置相关接口***************************************************************** */
// 员工信息
let getUserInfo = (obj) => {
    return axios.post('/hotelv2/index/merchant/user/getUserInfo', obj)
}
// 员工账户信息
let getUser = (obj) => {
    return axios.post('/hotelv2/index/merchant/user/getUser', obj)
}
// 修改员工状态
let modifyStatus = (obj) => {
    return axios.post('/hotelv2/index/merchant/user/modifyStatus', obj)
}
// 创建员工账户
let createUser = (obj) => {
    return axios.post('/hotelv2/index/merchant/user/createUser', obj)
}
// 删除员工
let deleteById = (obj) => {
    return axios.post('/hotelv2/index/merchant/user/deleteById', obj)
}
// 删除角色
let deleteRole = (obj) => {
    return axios.post('/hotelv2/index/merchant/role/deleteRole', obj)
}
// 员工列表
let getUserList = (obj) => {
    return axios.post('/hotelv2/index/merchant/user/getUserList', obj)
}
// 更新员工账户信息
let updateUser = (obj) => {
    return axios.post('/hotelv2/index/merchant/user/updateUser', obj)
}
// 角色列表
let roleList = (obj) => {
    return axios.post('/hotelv2/index/merchant/role/roleList', obj)
}
// 角色详情
let getRole = (obj) => {
    return axios.post('/hotelv2/index/merchant/role/getRole', obj)
}
// 添加角色
let createRole = (obj) => {
    return axios.post('/hotelv2/index/merchant/role/createRole', obj)
}
// 编辑角色
let editRole = (obj) => {
    return axios.post('/hotelv2/index/merchant/role/editRole', obj)
}
//高德地图坐标转换定位
const restapiLongitudeLatitude=()=>{
    return axios.get(`https://restapi.amap.com/v3/assistant/inputtips?key=83ac6df73e7176011d65a143204ad653`)
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
    getSelectOption,
    getRoomDetail,
    exportRoom,
    uploadToken,
    updatePrice,
    getPriceCalendar,
    getClassifyList,
    changeStatus,
    createRoom,
    hotellableSelect,
    editRole,
    createRole,
    getRole,
    roleList,
    updateUser,
    createReply,
    getCommentDetial,
    getHotelComment,
    getUserList,
    deleteRole,
    deleteById,
    createUser,
    modifyStatus,
    deleteRoomClassify,
    deleteRoom,
    createRoomClassify,
    getUser,
    orderOption,
    restapiLongitudeLatitude,
    orderList,
    orderDetails,
    deleteOrder,
    statistics
}