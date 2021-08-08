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
  key: '65d2c725c6886cef22e37f09fd707267', // 申请好的Web端开发者Key，首次调用 load 时必填
  version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: ['AMap.CitySearch', 'AMap.MouseTool', 'AMap.Geolocation'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  AMapUI: {
    // 是否加载 AMapUI，缺省不加载
    version: '1.1', // AMapUI 缺省 1.1
    plugins: [], // 需要加载的 AMapUI ui插件
  },
  Loca: {
    // 是否加载 Loca， 缺省不加载
    version: '1.3.2', // Loca 版本，缺省 1.3.2
  },
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
