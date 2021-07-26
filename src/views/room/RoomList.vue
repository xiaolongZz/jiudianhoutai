<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item :to="{ path: '/room' }">客房管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/room/roomlist' }">客房列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="tabs">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px" @change="tabChange">
          <el-radio-button label="客房列表">客房列表</el-radio-button>
          <el-radio-button label="价格调整">价格调整</el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="nowtab == '客房列表'" class="addRoom">
        <div class="search">
          <el-form ref="form" :model="searchForm" label-width="80px" class="searchForm">
            <el-form-item label="客房名称" style="width: 20%">
              <el-input v-model="searchForm.roomName"></el-input>
            </el-form-item>
            <el-form-item label="添加时间">
              <el-date-picker
                v-model="searchForm.addData"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="客房分类">
              <el-select v-model="searchForm.classify_id" placeholder="无" style="width: 280px">
                <el-option v-for="item in roomOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="营销标签">
              <el-select v-model="searchForm.room_label" placeholder="无" style="width: 280px">
                <el-option v-for="item in tagOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="searchBtn">
            <el-button icon="el-icon-plus" @click="addRoom">添加客房</el-button>
            <el-button icon="el-icon-search">查询</el-button>
            <el-button icon="el-icon-download">导出</el-button>
            <el-button icon="el-icon-upload">批量导出</el-button>
          </div>
        </div>
        <el-table class="roomListTable" :data="roomListData" style="width: 100%" border>
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" width="55"> </el-table-column>
          <el-table-column prop="room_name" label="房名" width="180"> </el-table-column>
          <el-table-column prop="price" label="价格"> </el-table-column>
          <el-table-column prop="inventory" label="库存"> </el-table-column>
          <el-table-column prop="address" label="实际销量"> </el-table-column>
          <el-table-column prop="updated_at" label="创建时间"> </el-table-column>
          <el-table-column prop="room_label" label="营销标签"> </el-table-column>
          <el-table-column prop="address" label="操作">
            <!-- eslint-disable-next-line -->
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.status == 1">下架</el-button>
              <el-button type="text" size="small" v-if="scope.row.status == 0">上架</el-button>
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="OffTheShelf">
          <el-button>批量上架</el-button>
          <el-button>批量下架</el-button>
          <el-button icon="el-icon-delete">删除</el-button>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>

      <div v-if="nowtab == '价格调整'" class="adjustmentPrice">价格调整</div>
    </el-card>
  </div>
</template>

<script>
import { getRoomList } from '../../assets/api/index.js'
export default {
  data() {
    return {
      userInfo: {},
      tabPosition: '客房列表',
      nowtab: '客房列表',
      searchForm: {
        room_name: '',
        addData: '',
      },
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
      roomOptions: [
        {
          value: '标间',
          label: '标间',
        },
        {
          value: '单人房',
          label: '单人房',
        },
        {
          value: '行政房',
          label: '行政房',
        },
      ],
      tagOptions: [
        {
          value: '全部',
          label: '全部',
        },
        {
          value: '特价房',
          label: '特价房',
        },
        {
          value: '限时取消',
          label: '限时取消',
        },
        {
          value: '可以开票',
          label: '可以开票',
        },
        {
          value: '不能取消',
          label: '不能取消',
        },
         {
          value: '免费取消',
          label: '免费取消',
        },
         {
          value: '立即确认',
          label: '立即确认',
        },
      ],
      roomListData: [],
      // 当前页数
      page: 1,
      // 一页显示的条数
      currentPage: 5,
      // 总条数
      total: 0,
      // 上下架的状态
      status: '', //1  上架，0 下架
    }
  },
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.RoomList()
  },
  methods: {
    tabChange(tab) {
      this.nowtab = tab
    },
    handleSizeChange(val) {
      console.log(val)
    },
    handleCurrentChange(val) {
      this.page = val
      console.log(val)
    },
    async RoomList() {
      let obj = {}
      obj.hotel_id = this.userInfo.hotel_id
      obj.status = this.status
      obj.page = this.page
      await getRoomList(obj).then((res) => {
        this.total = res.data.total
        this.roomListData = res.data.list
      })
    },
    addRoom() {
      this.$router.push('/roomList/addRoom')
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
  .tabs {
    margin-top: 20px;
    .el-radio-group {
      .el-radio-button:nth-child(2) {
        margin-left: 20px;
        border-left: 1px solid #dcdfe6;
      }
    }
  }
  .addRoom {
    .search {
      .searchForm {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .searchBtn {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
        .el-button {
          width: 120px;
          margin-left: 20px;
        }
      }
    }
    .roomListTable {
      margin-top: 15px;
    }
    .OffTheShelf {
      margin-top: 15px;
      .el-button {
        width: 120px;
      }
    }
    .el-pagination {
      margin-top: 15px;
      text-align: center;
    }
  }
}
</style>