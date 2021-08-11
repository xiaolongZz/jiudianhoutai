<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>系统消息 <span class="weidumessage">({{ data }}条未读信息)</span></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="messagebox">
        <div class="messagelist" @click="messageDetaile()">
          <el-descriptions title="您有新的订单">
            <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
            <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
            <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
          </el-descriptions>
          <div class="messageed">未读</div>
        </div>
        <div class="datatime">2021-07-13 11:08</div>
        <div class="btns">
          <el-button>已读</el-button> <br />
          <el-button>删除</el-button>
        </div>
      </div>
      <div class="messagebox">
        <div class="messagelist" @click="messageDetaile()">
          <el-descriptions title="您有新的订单">
            <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
            <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
            <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
          </el-descriptions>
          <div class="messageed">未读</div>
        </div>
        <div class="datatime">2021-07-13 11:08</div>
        <div class="btns">
          <el-button>已读</el-button> <br />
          <el-button>删除</el-button>
        </div>
      </div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
      </el-dialog>
      <div class="allbtns">
        <el-button>全部已读</el-button>
        <el-button>删除已读</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: '1000',
      dialogVisible: false,
      ismessage: 1,
    }
  },
  methods: {
    messageDetaile() {
      if (this.ismessage) {
        this.dialogVisible = true
      } else {
        this.$router.push({ path: '/orderList'})
      }
    },
    handleClose() {
      this.dialogVisible = false
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
.weidumessage {
  margin-left: 10px;
  color: black;
}
.messagebox {
  position: relative;
  margin-top: 20px;
  padding-left: 100px;
}
.messagelist {
  position: relative;
  border: 1px solid #ccc;
  width: 80%;
  padding-left: 5px;
  cursor: pointer;
}
.el-descriptions {
  margin-top: 20px;
  width: 100%;
  margin-bottom: 10px;
}
.messageed {
  position: absolute;
  top: 15px;
  right: 20px;
  color: red;
}
.datatime {
  width: 80%;
  text-align: right;
  color: #ccc;
  margin-top: 5px;
}
.btns {
  height: 100px;
  position: absolute;
  top: 50%;
  transform: translateY(-50px);
  right: 12%;
  .el-button {
    margin-bottom: 10px;
  }
}
.allbtns {
  text-align: center;
}
</style>