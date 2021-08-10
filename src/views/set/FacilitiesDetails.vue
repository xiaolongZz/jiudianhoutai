<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item>房间设施</el-breadcrumb-item>
      </el-breadcrumb>
      <el-checkbox-group v-model="checkboxGroup1">
        <el-checkbox border v-for="item in checkboxGroup" :key="item.id" :label="item.id">{{ item.label_name }}</el-checkbox>
      </el-checkbox-group>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item>酒店标签</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
  </div>
</template>
<script>
import { getHotelClassify } from '../../assets/api/index.js'
export default {
  data() {
    return {
      checkboxGroup: [],
      checkboxGroup1: [],
    }
  },
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.getClassify()
  },
  methods: {
    async getClassify() {
      await getHotelClassify({ hotel_id: this.userInfo.hotel_id }).then((res) => {
        console.log(res.data.hotel_facilities)
        this.checkboxGroup = res.data.hotel_facilities
      })
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
  margin-bottom: 20px;
}
.el-checkbox-group {
  width: 1000px;
  margin-bottom: 10px;
  .el-checkbox {
    width: 150px;
    margin-bottom: 15px;
    margin-left: 0 !important;
    margin-right: 20px;
  }
}
</style>