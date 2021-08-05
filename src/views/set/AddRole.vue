<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item :to="{ path: '/role' }">系统设置</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/role' }">角色管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加角色</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title">基本信息</div>
      <el-form ref="form" :model="roleForm" label-width="80px">
        <el-form-item label="角色名：" style="width:350px">
          <el-input v-model="roleForm.name" placeholder="输入职位"></el-input>
        </el-form-item>
          <el-form-item label="排序：" style="width:350px">
          <el-input v-model="roleForm.name" placeholder="输入整数，数字越大排序越靠前"></el-input>
        </el-form-item>
      </el-form>
      <div class="title">权限</div>
    </el-card>
  </div>
</template>
<script>
import { roleList } from '../../assets/api/index.js'
export default {
  data() {
    return {
      userInfo: {},
      roleLists: [],
      roleForm: {},
    }
  },
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      await roleList({ hotel_id: this.userInfo.hotel_id }).then((res) => {
        this.roleLists = res.data.list
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
</style>