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
import AMap from 'vue-amap'

Vue.use(AMap);
AMap.initAMapApiLoader({
  key: 'c3149d95666afcd3f0ffa276467594bd',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v:'1.4.4'
});
Vue.config.productionTip = false
Vue.use(Api)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
