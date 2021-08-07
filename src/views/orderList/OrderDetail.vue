<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item :to="{ path: '/orderList' }">订单列表</el-breadcrumb-item>
        <el-breadcrumb-item >订单详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="detailBox">
        <el-descriptions title="基本信息" border :column="1" style="width: 450px">
          <el-descriptions-item label="主订单号">{{ this.orderDetail.order_sn }}</el-descriptions-item>
          <el-descriptions-item label="订单状态">{{ this.orderDetail.status }}</el-descriptions-item>
          <el-descriptions-item label="会员手机号">{{ this.orderDetail.contact_phone }}</el-descriptions-item>
          <el-descriptions-item label="会员昵称"></el-descriptions-item>
          <el-descriptions-item label="订单金额">{{ this.orderDetail.order_money }}</el-descriptions-item>
          <el-descriptions-item label="下单时间 ">{{ this.orderDetail.created_at }}</el-descriptions-item>
          <el-descriptions-item label="确认状态">{{ this.orderDetail.is_confirm }}</el-descriptions-item>
          <el-descriptions-item label="关闭时间">{{ this.orderDetail.finish_date }}</el-descriptions-item>
          <el-descriptions-item label="发票">{{ this.orderDetail.status }}</el-descriptions-item>
          <el-descriptions-item label="取消操作人">{{ this.orderDetail.cancel_operator }}</el-descriptions-item>
          <el-descriptions-item label="取消原因"></el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="入住信息" border :column="1" style="width: 450px">
          <el-descriptions-item label="离店时间"></el-descriptions-item>
          <el-descriptions-item label="房型">{{ this.orderDetail.roomInfo.room_name }}</el-descriptions-item>
          <el-descriptions-item label="房间数">{{ this.orderDetail.price_detail[0].room_num }}</el-descriptions-item>
          <el-descriptions-item label="客房政策"></el-descriptions-item>
          <el-descriptions-item label="每间房可入住人数">{{ this.orderDetail.roomInfo.max_guest_applicable }}</el-descriptions-item>
          <el-descriptions-item label="入住人数 "></el-descriptions-item>
          <el-descriptions-item label="入住人">{{ this.orderDetail.contact_name }}</el-descriptions-item>
          <el-descriptions-item label="入住人手机号">{{ this.orderDetail.contact_phone }}</el-descriptions-item>
          <el-descriptions-item label="预计到店时间">{{ this.orderDetail.price_detail[0].time }}</el-descriptions-item>
          <el-descriptions-item label="其他要求"></el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="结算信息" border :column="1" style="width: 300px">
          <el-descriptions-item label="离店时间">{{ this.orderDetail.order_sn }}</el-descriptions-item>
          <el-descriptions-item label="房型">{{ this.orderDetail.status }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="goback">
        <el-button @click="goBack" type="primary">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { orderDetails } from '../../assets/api/index.js'
export default {
  name: 'orderDetail',
  data() {
    return {
      order_sn: this.$route.query.order_sn, // 订单编号
      orderDetail: {
        roomInfo: {
          room_name: '',
        },
        price_detail: [{ room_num: '' }],
      }, //订单信息
    }
  },
  created() {
    this.getOrderDetail()
  },
  methods: {
    async getOrderDetail() {
      await orderDetails({ order_sn: this.order_sn }).then((res) => {
        this.orderDetail = res.data
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
.detailBox {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
}
.goback {
  text-align: center;
  margin-top: 20px;
}
</style>