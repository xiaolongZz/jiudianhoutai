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



    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
