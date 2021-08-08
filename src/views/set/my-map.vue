<template>
  <div>
    <span>请选择地点</span>
    <el-divider></el-divider>
    <el-input placeholder="请输入相关地址来查找相关位置" v-model="ruleForm.searchInput" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="searchByadd"></el-button>
    </el-input>
    <div id="container"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      map: null,
      ruleForm: {
        address: '',
        long: '',
        lat: '',
        searchInput: '阿克苏',
      },
      lnglatXY: [],
    }
  },
  mounted() {
    this.init()
    // this.map = new AMap.Map('container', {
    //   viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
    //   zoom: 15, //初始化地图层级
    //   // center: [116.397428, 39.90923], //初始化地图中心点
    // })
    // //为地图注册click事件获取鼠标点击出的经纬度坐标
    // this.map.on('click', (e) => {
    //   // console.log(e.lnglat.lng, e.lnglat.lat)
    //   this.lng = e.lnglat.lng
    //   this.lat = e.lnglat.lat
    //   this.$emit('func', this.lng, this.lat)
    //   this.map.add(marker)
    //   console.log(marker)
    //   this.map.setFitView()
    // })
    // var marker = new AMap.Marker({
    //   icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
    //   position: [this.lng, this.lat],
    //   anchor: 'bottom-center',
    // })
  },
  created() {},
  methods: {
    init() {
      let that = this
      var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 15,
      })
      AMap.plugin('AMap.Geolocation', function () {
        //异步加载插件
        var geolocation = new AMap.Geolocation()
        map.addControl(geolocation)
      })
      var geocoder, marker
      function regeocoder(lnglatXY, that) {
        AMap.plugin('AMap.Geocoder', function () {
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all',
          })
          geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              that.ruleForm.address = result.regeocode.formattedAddress
            }
          })
          if (!marker) {
            marker = new AMap.Marker()
            map.add(marker)
          }
          marker.setPosition(lnglatXY)
        })
      }
      map.on('click', function (e) {
        var lnglatXY = [e.lnglat.getLng(), e.lnglat.getLat()]
        regeocoder(lnglatXY, that)
        that.ruleForm.long = e.lnglat.getLng()
        that.ruleForm.lat = e.lnglat.getLat()
        that.$emit('func', that.ruleForm.long, that.ruleForm.lat, that.ruleForm.address)
      })
    },
    searchByadd() {
      let that = this
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 15,
      })
      var geocoder, marker
      AMap.plugin('AMap.Geocoder', () => {
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all',
        })
        geocoder.getLocation(this.ruleForm.searchInput, function (status, result) {
          if (status === 'complete' && result.geocodes.length) {
            that.lnglatXY[0] = result.geocodes[0].location.lng
            that.lnglatXY[1] = result.geocodes[0].location.lat
            that.map.panTo(that.lnglatXY)
          } else {
            log.error('根据地址查询位置失败')
          }
        })
      })
    },
  },
}
</script>
<style lang="less" scoped>
#container {
  height: 40vh;
  margin-top: 15px;
}
</style>