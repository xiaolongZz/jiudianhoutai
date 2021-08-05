<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item>基础设置</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 步骤条区域 -->
      <el-steps :space="200" :active="activeIndex + 0" finish-status="success" simple>
        <el-step title="基础设施 >>"></el-step>
        <el-step title="酒店图片 >>"></el-step>
        <el-step title="入住政策"></el-step>
      </el-steps>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {}
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
.el-steps {
  width: 600px;
  margin-top: 20px;
}
</style>