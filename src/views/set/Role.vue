<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item >系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" class="addRole" @click="goAddRole">添加角色</el-button>
      <div class="title">账号列表</div>
      <el-table :data="roleLists" border style="width: 100%">
        <el-table-column prop="name" label="角色" width="200px"></el-table-column>
        <el-table-column prop="menu" label="权限">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.menu" :key="index"> {{ item }} </span>
          </template>
        </el-table-column>
        <el-table-column label="权限编辑" width="200px">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    goAddRole() {
      this.$router.push({ path: '/role/addrole'})
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
.addRole {
  margin: 20px 0;
}
.el-table {
  margin-top: 20px;
}
</style>