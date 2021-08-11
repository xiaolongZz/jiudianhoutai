<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item :to="{ path: '/earnings' }">财务管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/earnings' }">收益明细 </el-breadcrumb-item>
        <el-breadcrumb-item>收益提现 </el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <div class="WithdrawableCash">
        <span>可提现金额</span>
        <span>3500.00</span>元
      </div>
      <el-divider></el-divider>
      <div class="Withdrawalaccount">
        <div>提现账户</div>
        <div>
          <el-radio-group v-model="radio"> <el-radio :label="1">提现到销巴账户余额（绡巴会员账户：17700000000）</el-radio> <br /> </el-radio-group>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="Withdrawalamount">
        <p>提现金额</p>
        <el-input v-model="input" placeholder="请输入提现金额数" style="width: 60%; margin-bottom: 12px">
          <span slot="append">元</span>
        </el-input>
        <el-alert title="最低提现金额必须大于等于100元；" type="warning" show-icon :closable="false"> </el-alert>
        <el-alert title="提现标准手续费为 0.1%" type="warning" show-icon :closable="false"> </el-alert>
      </div>
      <div>
        <p>提现手续费</p>
        <el-input v-model="input1" placeholder="0" style="width: 60%; margin-bottom: 12px" disabled>
          <span slot="append">元</span>
        </el-input>
      </div>
      <div>
        <p>实际到账金额</p>
        <el-input v-model="input2" placeholder="0" style="width: 60%; margin-bottom: 12px" disabled>
          <span slot="append">元</span>
        </el-input>
      </div>
      <div class="submitbtn">
        <el-button type="primary" :loading="tijiao" style="width:150px">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '',
      input: '',
      input1: '',
      input2: '',
      tijiao:false
    }
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
.WithdrawableCash {
  > span:nth-child(2) {
    margin-left: 500px;
    color: red;
  }
}
.Withdrawalaccount {
  > div:nth-child(2) {
    margin-top: 20px;
  }
}
.Withdrawalamount {
  .el-alert {
    margin-bottom: 5px;
  }
}
.submitbtn{
    margin-top: 20px;
    text-align: center;
}
</style>