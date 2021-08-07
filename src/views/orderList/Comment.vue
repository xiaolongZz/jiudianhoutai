<template>
  <div>
    <el-card>
      <div class="title">评价管理</div>
      <div class="search">
        <el-form ref="form" :model="searchForm" label-width="80px" class="searchForm">
          <el-form-item label="关键词" size="small " style="width: 350px">
            <el-input v-model="searchForm.keywords" placeholder="房型/订单编号" clearable></el-input>
          </el-form-item>
          <el-form-item label="下单时间" size="small ">
            <el-date-picker
              v-model="orderTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="评价来源" size="small ">
            <el-select v-model="searchForm.resource">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="searchbtn">
        <el-button @click="search">查询</el-button>
      </div>
      <div class="evaluationList">
        <el-table :data="evaluationData" border style="width: 100%">
          <el-table-column prop="order_sn" label="订单编号"></el-table-column>
          <el-table-column prop="room_name" label="房型"></el-table-column>
          <el-table-column prop="content" label="评价信息"> </el-table-column>
          <el-table-column prop="ratings" label="评分等级"> </el-table-column>
          <el-table-column prop="status" label="评价状态"> </el-table-column>
          <el-table-column prop="nickname" label="用户昵称"> </el-table-column>
          <el-table-column prop="created_at" label="评价时间"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showDetail(scope.row.id)">详情</el-button>
              <el-button type="text" size="small" @click="showReplayDialog(scope.row.id)">回复</el-button>
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
      <el-dialog title="回复" :visible="dialogVisible" width="30%" :before-close="handleClose">
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4 }" placeholder="回复顾客的评论" v-model="content" resize="none"> </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="replay">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getHotelComment, createReply } from '../../assets/api/index.js'
export default {
  name: 'Evaluationmanagement',
  data() {
    return {
      userInfo: {},
      searchForm: {
        hotel_id: '',
        resource: '',
        keywords: '',
        page: '',
        pageSize: '',
        start_date: '',
        finish_date: '',
      },
      // 当前页数
      currentPage: 1,
      // 一页显示的条数
      pageSize: 10,
      // 总条数
      total: 0,
      orderTime: '',
      pickerOptions: {
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
      dialogVisible: false,
      content: '',
      evaluationData: [],
      options: [],
      replayId: '',
    }
  },
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      this.searchForm.hotel_id = this.userInfo.hotel_id
      this.searchForm.page = this.currentPage
      this.searchForm.pageSize = this.pageSize
      await getHotelComment(this.searchForm).then((res) => {
        this.total = res.data.total
        this.evaluationData = res.data.list
      })
    },
    showDetail(id) {
      this.$router.push({ path: '/comment/detail', query: { id: id } })
    },
    handleClose() {
      this.dialogVisible = false
      this.content = ''
    },
    showReplayDialog(id) {
      this.dialogVisible = true
      this.replayId = id
    },
    async replay() {
      await createReply({ id: this.replayId, content: this.content }).then((res) => {
        console.log(res)
        this.replayId = ''
        this.$message.success('回复成功~')
        this.dialogVisible = false
        this.content = ''
        this.getCommentList()
      })
    },
    search() {
      if (this.orderTime) {
        this.searchForm.start_date = this.orderTime[0]
        this.searchForm.finish_date = this.orderTime[1]
      }
      if(!this.orderTime){
        this.searchForm.start_date=''
        this.searchForm.finish_date=''
      }
      this.getCommentList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getCommentList()
      
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCommentList()
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
  .search {
    margin-top: 20px;
    .searchForm {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .el-form-item {
        width: 480px;
        display: inline-block;
        .el-date-picker {
          width: 200px;
        }
      }
    }
  }
  .searchbtn {
    height: 40px;
    position: relative;
    .el-button {
      position: absolute;
      right: 200px;
      width: 130px;
    }
  }
  .evaluationList {
    margin-top: 20px;
  }
  .el-pagination {
    margin-top: 15px;
    text-align: center;
  }
}
</style>