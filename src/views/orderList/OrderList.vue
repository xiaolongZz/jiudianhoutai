<template>
  <div>
    <el-card>
      <div class="title">筛选查询</div>
      <div class="search">
        <el-form ref="form" :model="searchForm" label-width="80px" class="searchForm">
          <el-form-item label="订单编号" size="small ">
            <el-input v-model="searchForm.order_sn" clearable></el-input>
          </el-form-item>
          <el-form-item label="下单时间" size="small ">
            <el-date-picker
              v-model="orderTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              :picker-options="orderPickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="入住时间" size="small ">
            <el-date-picker
              v-model="CheckInTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              :picker-options="orderPickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="支付时间" size="small ">
            <el-date-picker
              v-model="payTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              :picker-options="orderPickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离店时间" size="small ">
            <el-date-picker
              v-model="leaveTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              :picker-options="orderPickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态" size="small ">
            <el-select v-model="searchForm.status" placeholder="请选择" clearable>
              <el-option v-for="item in orderStatus" :key="item.value" :label="item.label" :value="item.label"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" size="small ">
            <el-input v-model="searchForm.contact_phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="支付方式" size="small ">
            <el-select v-model="searchForm.pay_type" placeholder="请选择" clearable>
              <el-option v-for="item in pay_type" :key="item.value" :label="item.label" :value="item.label"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small ">
            <el-button size="medium " @click="search">查询</el-button>
            <el-button size="medium ">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="title title2">订单列表</div>
      <div>
        <!-- <el-button v-for="(btn,index) in btnsList" :key="index"  @click="select(index)">{{btn}}</el-button> -->
        <el-radio-group v-model="searchForm.status" style="width: 100%">
          <el-radio-button label="待确认">待确认</el-radio-button>
          <el-radio-button label="待入住">待入住</el-radio-button>
          <el-radio-button label="已入住">已入住</el-radio-button>
          <el-radio-button label="已完成">已完成</el-radio-button>
          <el-radio-button label="待付款">待付款</el-radio-button>
          <el-radio-button label="已关闭">已关闭</el-radio-button>
          <el-radio-button label="全部订单">全部订单</el-radio-button>
        </el-radio-group>
        <!-- <el-button>待确认</el-button>
        <el-button>待入住</el-button>
        <el-button>已入住</el-button>
        <el-button>已完成</el-button>
        <el-button>待付款</el-button>
        <el-button>已关闭</el-button>
        <el-button>全部订单</el-button> -->
      </div>
      <div class="orderlist">
        <el-table :data="orderList" border stripe style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="order_sn" label="订单编号" width="200px"></el-table-column>
          <el-table-column prop="nikename" label="会员昵称"></el-table-column>
          <el-table-column prop="contact_name" label="联系人信息"> </el-table-column>
          <el-table-column prop="room_name" label="房型信息"> </el-table-column>
          <el-table-column prop="order_money" label="订单金额"> </el-table-column>
          <el-table-column prop="room_number" label="房间数" width="80px"> </el-table-column>
          <el-table-column prop="people_number" label="入住人数" width="80px"> </el-table-column>
          <el-table-column prop="pay_type" label="支付方式">
            <template slot-scope="scope">
              <span v-for="item in pay_type" :key="item.value">
                <span v-if="item.value == scope.row.pay_type">{{ item.label }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="下单时间" width="200px"> </el-table-column>
          <el-table-column prop="status" label="订单状态"> </el-table-column>
          <el-table-column prop="address" label="操作">
            <!-- eslint-disable-next-line -->
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="goOrderDetail(scope.row.order_sn)">详情</el-button>
              <el-button type="text" size="small" @click="deletOrder(scope.row.order_sn)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { orderOption, orderList, deleteOrder } from '../../assets/api/index.js'
export default {
  name: 'Ordermanagement',
  data() {
    return {
      userInfo: {}, //账号信息
      orderTime: '', //下单时间数组
      CheckInTime: '', //入住时间数组
      payTime: '', //支付时间数组
      leaveTime: '', //离店时间数组
      searchForm: {
        pageSize: '',
        currentPage: '',
        hotel_id: '',
        order_sn: '', //订单编号
        created_at_start: '', //下单开始时间
        created_at_end: '', //下单结束时间
        pay_date_start: '', //支付时间开始
        pay_date_end: '', //支付时间结束
        arrival_date_start: '', //入住时间
        arrival_date_end: '', //入住时间结束
        departure_date_start: '', //离店时间开始
        departure_date_end: '', //离店时间结束
        status: '', //订单状态
        contact_phone: '', //联系电话
        pay_type: '', //支付方式
      },
      orderList: [], //当前订单列表
      pay_type: [], // 支付方式
      orderStatus: [], // 订单状态
      currentPage: 1, // 当前页数
      pageSize: 10, // 一页显示的条数
      total: 0, // 总条数
      orderPickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
    }
  },
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.searchForm.hotel_id = this.userInfo.hotel_id
    this.getOrderOption()
    this.getOrderList()
  },
  methods: {
    async getOrderOption() {
      await orderOption().then((res) => {
        this.pay_type = res.data.pay_type.options
        this.orderStatus = res.data.status.options
      })
    },
    async getOrderList() {
      this.searchForm.pageSize = this.pageSize
      this.searchForm.page = this.currentPage
      await orderList(this.searchForm).then((res) => {
        this.orderList = res.data.list
        this.total = res.data.total
      })
    },
    search() {
      this.orderTime ? (this.searchForm.created_at_start = this.orderTime[0]) : (this.searchForm.created_at_start = '')
      this.orderTime ? (this.searchForm.created_at_end = this.orderTime[1]) : (this.searchForm.created_at_end = '')
      this.CheckInTime ? (this.searchForm.arrival_date_start = this.CheckInTime[1]) : (this.searchForm.arrival_date_start = '')
      this.CheckInTime ? (this.searchForm.arrival_date_end = this.CheckInTime[1]) : (this.searchForm.arrival_date_end = '')
      this.payTime ? (this.searchForm.pay_date_start = this.payTime[1]) : (this.searchForm.pay_date_start = '')
      this.payTime ? (this.searchForm.pay_date_end = this.payTime[1]) : (this.searchForm.pay_date_end = '')
      this.leaveTime ? (this.searchForm.departure_date_start = this.leaveTime[1]) : (this.searchForm.departure_date_start = '')
      this.leaveTime ? (this.searchForm.departure_date_end = this.leaveTime[1]) : (this.searchForm.departure_date_end = '')
      this.getOrderList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getOrderList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getOrderList()
    },
    goOrderDetail(order_sn) {
      this.$router.push({ path: '/orderList/orderdetail', query: { order_sn: order_sn } })
    },
    async deletOrder(order_sn) {
      console.log(order_sn)
      const confiemResult = await this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confiemResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      await deleteOrder({ order_sn: order_sn }).then(() => {
        this.$message.success('删除成功~')
        this.getOrderList()
      })
    },
  },
}
</script>
<style lang="less" scoped>
.el-card {
  .title {
    padding-left: 10px;
    text-align: left;
    height: 54px;
    line-height: 54px;
    background-color: #fafafa;
    font-size: 13px;
  }
  .title2 {
    margin-top: 50px;
  }
  .search {
    margin-top: 20px;
    .searchForm {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .el-form-item {
        width: 480px;
        display: inline-block;
        .el-date-picker {
          width: 200px;
        }
      }
    }
  }
  .orderlist {
    margin-top: 15px;
  }
  .el-pagination {
    margin-top: 15px;
    text-align: center;
  }
  .select {
    width: 200px;
  }
}
</style>