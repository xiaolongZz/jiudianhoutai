<template>
  <div>
    <div id="container"></div>
    <div class="searbox">
      <div><el-input placeholder="请输入相关地址来查找相关位置" v-model="searchInput" class="searInput" @input="seInput"> </el-input></div>
      <div class="tipList">
        <div v-for="(item, index) in tipsList" :key="index" class="tips" @click="clickTips(item.location)">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { search } from '../../assets/api/index.js'
export default {
  data() {
    return {
      map: null,
      lnglatXY: [],
      searchInput: '',
      timer: null,
      tipsList: [],
    }
  },
  mounted() {
    this.init()
  },
  created() {},
  methods: {
    init() {
      this.map = new AMap.Map('container', {
        zoom: 11, //级别
        resizeEnable: true,
      })
      let _this = this
      //绑定点击事件
      this.map.on('click', function (e) {
        _this.map.clearMap()
        let marker = new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [e.lnglat.getLng(), e.lnglat.getLat()],
        })
        _this.map.add(marker)
        _this.lnglatXY[0] = e.lnglat.getLng()
        _this.lnglatXY[1] = e.lnglat.getLat()
        _this.$emit('func', _this.lnglatXY[0], _this.lnglatXY[1])
      })
    },
    clickTips(location) {
      if (location && location.length == 0) {
        this.$message.warning('请输入更加详细的地址!')
        return false
      }
      let e = location.split(',')
      this.map.clearMap()
      let marker = new AMap.Marker({
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: [e[0], e[1]],
      })
      this.map.add(marker)
      this.map.setFitView()
      this.lnglatXY[0] = e[0]
      this.lnglatXY[1] = e[1]
      this.$emit('func', this.lnglatXY[0], this.lnglatXY[1])
    },
    seInput(value) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async () => {
        await search(value).then((res) => {
          this.tipsList = res.tips
        })
      }, 500)
    },
  },
}
</script>
<style lang="less" scoped>
#container {
  height: 40vh;
  margin-top: 15px;
  position: relative;
}
.searbox {
  text-align: right;
  position: absolute;
  right: 20px;
  top: 100px;
  z-index: 999;
  background: white;
  .searInput {
    width: 230px;
  }
  .tipList {
    width: 200px;
    text-align: left;
    > div:hover {
      cursor: pointer;
      background-color: #cae1ff;
    }
    .tips {
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>