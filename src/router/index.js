import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Home from '../views/home/home.vue'
import Welcome from '../views/Welcome.vue'
import OrderList from '../views/orderList/OrderList.vue'
import OrderDetail from '../views/orderList/OrderDetail.vue'
import Comment from '../views/orderList/Comment.vue'
import CommentDetail from '../views/orderList/CommentDetail.vue'
import RoomList from '../views/room/RoomList.vue'
import Classify from '../views/room/Classify.vue'
import AddRoom from '../views/room/AddRoom.vue'
import RoomDetail from '../views/room/RoomDetail.vue'
import Facilities from '../views/set/Facilities.vue'
import Role from '../views/set/Role.vue'
import AddRole from '../views/set/AddRole.vue'
import Account from '../views/set/Account.vue'
import FacilitiesDetails from '../views/set/FacilitiesDetails.vue'
import Message from '../views/set/Message.vue'
import Earnings from '../views/finance/Earnings.vue'
import Record from '../views/finance/Record.vue'
import Withdrawal from '../views/finance/Withdrawal.vue'

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
    { path: '/orderList/orderdetail', component: OrderDetail },
    { path: '/account', component: Account },
    { path: '/facilitiesDetails', component: FacilitiesDetails },
    { path: '/message', component: Message },
    { path: '/earnings', component: Earnings },
    { path: '/record', component: Record },
    { path: '/earnings/Withdrawal', component: Withdrawal },
    ]
  },

]


const router = new VueRouter({
  routes
})

router.beforeEach((to, form, next) => {
  // to  ?????????????????????
  // form ?????????????????????????????????
  // next ???????????? ????????????
  if (to.path === '/login') return next()
  // ??????token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})


export default router
