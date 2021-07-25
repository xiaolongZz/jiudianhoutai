import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import OrderList from '../views/orderList/OrderList.vue'
import Comment from '../views/orderList/Comment.vue'
import CommentDetail from '../views/orderList/CommentDetail.vue'
import RoomList from '../views/room/RoomList.vue'
import Classify from '../views/room/Classify.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    children: [{ path: '/welcome', component: Welcome },
    { path: '/order/list', component: OrderList },
    { path: '/comment', component: Comment },
    { path: '/comment/detail', component: CommentDetail },
    { path: '/room/list', component: RoomList },
    { path: '/classify', component: Classify },


    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
