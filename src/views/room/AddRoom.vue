<template>
  <div>
    <el-card>
      <!-- 步骤条区域 -->
      <el-steps :space="200" :active="activeIndex-0" finish-status="success" simple>
        <el-step title="基本信息"></el-step>
        <el-step title="房间信息"></el-step>
      </el-steps>
        <el-form :model="addRoomForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
        <el-tabs v-model="activeIndex" :tab-position="'left'" @tab-click="tabClicked" :before-leave="beforeTabLeave">
          <el-tab-pane label="基本信息" name="0">
              1123
          </el-tab-pane>
          <el-tab-pane label="房间信息" name="1">
              4456
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left" @click="previousStep">上一步</el-button>
        <el-button type="primary" @click="nextStep">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "0",
      addRoomForm:{

      },
      addFormRules:{}
    }
  },
  methods: {
    previousStep() {
      if (this.activeIndex==1) {
        this.activeIndex--
        console.log(this.activeIndex);
      }
    },
    nextStep() {
      if (this.activeIndex==0) {
        this.activeIndex++
        console.log(this.activeIndex);
      }
    },
    tabClicked(){

    },
    beforeTabLeave(activeName, oldActiveName){
        console.log(activeName,oldActiveName);
    }
  },
}
</script>
<style lang="less" scoped>
.el-steps {
  width: 500px;
}
</style>
