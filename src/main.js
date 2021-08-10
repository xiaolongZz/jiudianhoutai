import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Api from './assets/api/api'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false
Vue.use(Api)
import AMapLoader from '@amap/amap-jsapi-loader'
AMapLoader.load({
  key: 'c3149d95666afcd3f0ffa276467594bd', // 申请好的Web端开发者Key，首次调用 load 时必填 
}).then((AMap) => {
  map = new AMap.Map('container')
})
  .catch((e) => {
    console.log(e)
  })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
