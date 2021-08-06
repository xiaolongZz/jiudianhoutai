import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Home from '../views/home/Home.vue'

import Welcome from '../views/Welcome.vue'
import OrderList from '../views/orderList/OrderList.vue'
import Comment from '../views/orderList/Comment.vue'
import CommentDetail from '../views/orderList/CommentDetail.vue'
import RoomList from '../views/room/RoomList.vue'
import Classify from '../views/room/Classify.vue'
import AddRoom from '../views/room/AddRoom.vue'
import RoomDetail from '../views/room/RoomDetail.vue'
import Facilities from '../views/set/Facilities.vue'
import Role from '../views/set/Role.vue'
import AddRole from '../views/set/AddRole.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/index',
    component: Index,
    children: [{ path: '/welcome', component: Welcome },
    { path: '/home', component: Home },
    { path: '/orderList', component: OrderList },
    { path: '/comment', component: Comment },
    { path: '/comment/detail', component: CommentDetail },
    { path: '/roomList', component: RoomList },
    { path: '/classify', component: Classify },
    { path: '/roomList/addRoom', component: AddRoom },
    { path: '/roomList/roomdetail', component: RoomDetail },
    { path: '/facilities', component: Facilities },
    { path: '/role', component: Role },
    { path: '/role/addrole', component: AddRole },
    ]
  },

]


const router = new VueRouter({
  routes
})

router.beforeEach((to, form, next) => {
  // to  将要访问的函数
  // form 代表从哪个路径跳转而来
  // next 是个函数 表示放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})


export default router
