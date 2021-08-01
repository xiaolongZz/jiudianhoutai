<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/roomList' }">客房管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/classify' }">分类管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" @click="addClassification">添加分类</el-button>
      <div class="title">分类列表</div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="分类名称" width="180"> </el-table-column>
        <el-table-column prop="name" label="添加时间" width="180"> </el-table-column>
        <el-table-column prop="address" label="状态"> </el-table-column>
        <el-table-column label="操作">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text" size="small">隐藏</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      dialogVisible: false,
    }
  },
  methods: {
    addClassification() {
      this.dialogVisible = true
    },
  },
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 45px;
}
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 10px;
  text-align: left;
  height: 54px;
  line-height: 54px;
  background-color: #fafafa;
  font-size: 13px;
}
</style>