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
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="酒店中文名：" style="width: 350px">
          <el-input v-model="form.chineseName" placeholder="酒店名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="酒店英文名：" style="width: 350px">
          <el-input v-model="form.englishName" placeholder="酒店名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="酒店星级：" style="width: 350px">
          <el-select v-model="form.star" placeholder="请选择星级" clearable>
            <el-option v-for="item in hotelStarOption" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="酒店品牌：" style="width: 350px">
          <el-select v-model="form.type" placeholder="请选择酒店品牌" clearable>
            <el-option v-for="item in hotelStyleOption" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开业时间：" style="width: 350px">
          <el-date-picker v-model="form.openYear" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" clearable> </el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话：" style="width: 350px">
          <el-input v-model="form.tel" placeholder="联系电话" clearable></el-input>
        </el-form-item>
        <el-form-item label="详情地址：" style="width: 800px">
          <el-input v-model="form.dizhi" placeholder="详情地址" clearable></el-input>
        </el-form-item>
        <el-form-item label="地图定位：" style="width: 500px">
          <div style="display: flex">
            <div style="flex: 1">192.1515155</div>
            <div style="flex: 1">5155.15115</div>
            <div>
              <el-button @click="chooseID">选择坐标</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div class="posion">
        <div>123</div>
        <div id="container"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { restapiLongitudeLatitude } from '../../assets/api/index.js'
export default {
  created() {},
  data() {
    return {
      activeIndex: 0,
      form: {
        chineseName: '',
        englishName: '',
        star: '',
        type: '',
        openYear: '',
        tel: '',
        dizhi: '',
      },
      hotelStarOption: [
        {
          value: '1',
          label: '一星',
        },
        {
          value: '2',
          label: '二星',
        },
        {
          value: '3',
          label: '三星',
        },
        {
          value: '4',
          label: '四星',
        },
        {
          value: '5',
          label: '五星',
        },
      ],
      hotelStyleOption: [
        {
          value: '全季',
          label: '全季',
        },
        {
          value: '如家',
          label: '如家',
        },
        {
          value: '汉庭',
          label: '汉庭',
        },
        {
          value: '速8',
          label: '速8',
        },
      ],
      dialogVisible: false,
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    async chooseID() {
      this.dialogVisible = true
      console.log(222222222)
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
.el-steps {
  width: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.posion {
  text-align: center;
  #container {
    width: 100%;
    height: 500px;
  }
}
</style>