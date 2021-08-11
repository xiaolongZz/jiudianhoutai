<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>收益明细 </el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="tableData" style="width: 100%" border :header-cell-style="{ textAlign: 'center', background: '#E6E1E1 1%' }" :cell-style="{ textAlign: 'center' }">
        <el-table-column prop="allTurnover" label="总营业额(元)"></el-table-column>
        <el-table-column prop="Withdrawaled" label="已提现金额(元)"> </el-table-column>
        <el-table-column prop="Withdrawal" label="可提现金额(元)">
          <template slot-scope="scope">
            <span>{{ scope.row.Withdrawal }}</span>
            <el-button size="mini" type="danger" class="Withdrawal" @click="goWithdrawal(scope.row)">提现</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="dataSelect">
        <span>筛选时间</span>
        <el-radio-group v-model="radio1">
          <el-radio-button label="今天"></el-radio-button>
          <el-radio-button label="昨天"></el-radio-button>
          <el-radio-button label="最近7天"></el-radio-button>
        </el-radio-group>
        <span class="selectData">自定义时间</span>
        <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
      </div>
      <el-table :data="tableData1" style="width: 100%" border :header-cell-style="{ textAlign: 'center', background: '#E6E1E1 1%' }" :cell-style="{ textAlign: 'center' }">
        <el-table-column prop="allTurnover" label="订单收入(元)"> </el-table-column>
        <el-table-column prop="Withdrawaled" label="有效订单"> </el-table-column>
        <el-table-column prop="Withdrawal" label="退款订单"></el-table-column>
      </el-table>
      <div id="main" style="width: 100%; height: 270px"></div>
    </el-card>
  </div>
</template>

<script>
import { statistics } from '../../assets/api/index.js'
// 按需引入 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
// 以下的组件按需引入
require('echarts/lib/component/tooltip') // tooltip组件
require('echarts/lib/component/title') //  title组件
require('echarts/lib/component/legend') // legend组件
export default {
  data() {
    return {
      tableData: [{ allTurnover: 200000, Withdrawaled: 1510, Withdrawal: 18255 }],
      tableData1: [{ allTurnover: 200000, Withdrawaled: 1510, Withdrawal: 18255 }],
      radio1: '',
      value2: '',
    }
  },
  created() {
  },
  mounted(){
    var echarts = require('echarts')
    this.earch()

  },
  methods: {
    goWithdrawal() {
      this.$router.push({ path: '/earnings/Withdrawal' })
    },
    earch() {
      // 初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      // 配置参数
      var option = {
        legend: { data: ['收入'] },
        xAxis: { data: ['2021-07-18','2021-07-19','2021-07-20',] },
        yAxis: {},
        series: [{ name: '收入', type: 'line', data: ['10','510','81'] }],
      }
      myChart.setOption(option)
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
  margin-bottom: 30px;
}
.Withdrawal {
  margin-left: 30px;
}
.dataSelect {
  margin-top: 150px;
  line-height: 40px;
  margin-bottom: 20px;
  .el-radio-group {
    margin-left: 50px;
  }
  .selectData {
    margin-left: 500px;
    margin-right: 20px;
  }
}
#main{
  margin-top: 100px;
}
</style>