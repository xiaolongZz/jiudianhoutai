<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item :to="{ path: '/roomList' }">客房列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/roomList/roomdetail' }">房间详情</el-breadcrumb-item>
      </el-breadcrumb>
      <p class="item">基本详情</p>
      <div class="roomInfo">
        <div>
          <span>房间名称</span>
          <span>{{ roomInfo.room_name }}</span>
        </div>
        <div>
          <span>房型</span>
          <span>{{ roomInfo.classify_name }}</span>
        </div>
        <div>
          <span>床型规格</span>
          <span>
            <i v-for="(item, index) in roomInfo.badType" :key="index" style="font-style: normal">{{ index + 1 }}、{{ item.bed_label }} {{ item.long }}*{{ item.wide }} （米）</i>
          </span>
        </div>
        <div>
          <span>价格</span>
          <span>{{ roomInfo.price }}</span>
        </div>
        <div>
          <span>营销标签</span>
          <span>
            <i v-for="(item, index) in roomInfo.room_label_name" :key="index" style="font-style: normal"> {{ item }} ,</i>
          </span>
        </div>
        <div>
          <span>库存数量</span>
          <span>总数：{{ roomInfo.inventory }} 剩余：{{ roomInfo.remain }}</span>
        </div>
      </div>
      <p class="item">客房图片</p>
      <el-image v-for="(item, index) in roomInfo.room_pictures" :key="index" style="width: 200px; height: 200px" :src="item.url" :preview-src-list="srcList"> </el-image>
      <p>共 {{ srcList.length }} 张图片</p>
      <div class="goBack">
        <el-button @click="goBack">返回</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getRoomDetail } from '../../assets/api/index.js'
export default {
  data() {
    return {
      roomId: this.$route.query.roomId, // 房间id
      hotel_id: this.$route.query.hotel_id, // 酒店id
      roomInfo: {}, // 房间信息
      allClassify: '', //房间分类名称
      srcList: [], // 房间图片预览数组
    }
  },
  created() {
    this.getRoomInfo()
  },
  methods: {
    async getRoomInfo() {
      await getRoomDetail({ id: this.roomId }).then((res) => {
        this.roomInfo = res.data
        res.data.room_pictures.forEach((element) => {
          this.srcList.push(element.url)
        })
      })
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="less" scoped>
.title {
  padding-left: 10px;
  text-align: left;
  height: 54px;
  line-height: 54px;
  background-color: #fafafa;
  font-size: 13px;
}
.roomInfo {
  div {
    display: flex;
    border: 1px solid #ccc;
    width: 40%;
    margin-bottom: -1px;
    min-height: 50px;
    line-height: 50px;
  }
  span {
    padding-left: 5px;
    flex: 1;
    border-left: 1px solid #ccc;
    margin-top: -1px;
    margin-left: -1px;
  }
}
.item {
  color: #ccc;
  margin-bottom: 20px;
}
.el-image {
  margin: 0 10px;
}
.goBack {
  text-align: center;
}
</style>