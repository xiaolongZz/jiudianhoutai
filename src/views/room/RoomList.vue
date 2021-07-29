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
                value-format="yyyy-MM-dd"
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
            <div class="searchBtn_left">
              <el-button @click="allRoom">全部房间</el-button>
              <el-button @click="onlineRoom">已上架</el-button>
              <el-button @click="enlineRoom">已下架</el-button>
            </div>
            <div class="searchBtn_righr">
              <el-button icon="el-icon-plus" @click="addRoom">添加客房</el-button>
              <el-button icon="el-icon-search" @click="searchRoom">查询</el-button>
              <el-button icon="el-icon-download" @click="exportroom">导出</el-button>
              <!-- <el-button icon="el-icon-upload">批量导出</el-button> -->
            </div>
          </div>
        </div>
        <el-table class="roomListTable" :data="roomListData" style="width: 100%" border @select="selectRow" @select-all="selectAllRow">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" width="55"> </el-table-column>
          <el-table-column prop="room_name" label="房名" width="180"> </el-table-column>
          <el-table-column prop="price" label="价格"> </el-table-column>
          <el-table-column prop="inventory" label="库存"> </el-table-column>
          <el-table-column prop="sales" label="实际销量"> </el-table-column>
          <el-table-column prop="updated_at" label="创建时间"> </el-table-column>
          <el-table-column prop="room_label" label="营销标签">
            <!-- eslint-disable-next-line -->
            <template slot-scope="scope">
              <el-tag v-for="item in scope.row.room_label" :key="item.index" style="margin: 0 5px">{{ item }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <!-- eslint-disable-next-line -->
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.status == 1" @click="offShelfRoom(scope.row.id)">下架</el-button>
              <el-button type="text" size="small" v-if="scope.row.status == 0" @click="onShelfRoom(scope.row.id)">上架</el-button>
              <el-button type="text" size="small" @click="editRoom(scope.row)">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="OffTheShelf">
          <el-button @click="batchShelves">批量上架</el-button>
          <el-button @click="batchOffShelf">批量下架</el-button>
          <el-button icon="el-icon-delete">删除</el-button>
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
      </div>

      <div v-if="nowtab == '价格调整'" class="adjustmentPrice">
        <div class="top">
          <span>跳转时间：</span>
          <el-date-picker v-model="adjustmentTime" type="month" placeholder="请选择年月"> </el-date-picker>
          <span>包含房间：</span>
          <el-input style="width: 250px" placeholder="请输入房间名查询" v-model="adjustmentRoomName"></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <el-calendar v-model="adjustmentTime">
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{ date, data }">
            <p :class="data.isSelected ? 'is-selected' : ''">{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}</p>
          </template>
        </el-calendar>
        <el-date-picker type="dates" v-model="adjustmentRoomName" placeholder="选择一个或多个日期"> </el-date-picker>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getRoomList, onShelf, offShelf, editRoom, classifySelect, getSelectOption, exportRoom } from '../../assets/api/index.js'
export default {
  data() {
    return {
      // 查询参数对象
      queryInfo: {},
      userInfo: {},
      tabPosition: '客房列表',
      nowtab: '客房列表',
      searchForm: {
        addData: '',
        room_name: '',
        start_date: '',
        finish_date: '',
        room_label: '',
        classify_id: '',
        pageSize: this.pageSize,
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
      roomOptions: [],
      tagOptions: [],
      roomListData: [],
      // 当前页数
      currentPage: 1,
      // 一页显示的条数
      pageSize: 10,
      // 总条数
      total: 0,
      // 上下架的状态
      status: '', //1  上架，0 下架
      // 批量上下架数组
      batchArr: [],
      adjustmentTime: '',
      Increase: 0,
      adjustmentRoomName: '',
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
      this.pageSize = val
      this.RoomList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.RoomList()
    },
    async RoomList() {
      let obj = {}
      obj.hotel_id = this.userInfo.hotel_id
      obj.status = this.status
      obj.page = this.currentPage
      obj.pageSize = this.pageSize
      this.queryInfo = obj
      await getRoomList(this.queryInfo).then((res) => {
        this.total = res.data.total
        this.roomListData = res.data.list
      })
      await getSelectOption({ hotel_id: this.userInfo.hotel_id }).then((res) => {
        res.data.classify.forEach((item) => {
          item.value = item.name
          item.label = item.name
          this.roomOptions.push(item)
        })
        res.data.lable.forEach((item) => {
          item.value = item.label_name
          item.label = item.label_name
          this.tagOptions.push(item)
        })
      })
    },
    addRoom() {
      this.$router.push({ path: '/roomList/addRoom', query: { hotel_id: this.userInfo.hotel_id, from: 'add' } })
    },
    async offShelfRoom(id) {
      let idArray = []
      idArray.push(id)
      await offShelf({ idArray: idArray }).then((res) => {
        this.RoomList()
        this.$message.success(res.message)
      })
    },
    async onShelfRoom(id) {
      let idArray = []
      idArray.push(id)
      await onShelf({ idArray: idArray }).then((res) => {
        this.RoomList()
        this.$message.success(res.message)
      })
    },
    async batchShelves() {
      if (this.status === '') {
        this.$message.warning('请先选择上/下架后再批量处理!')
        return
      } else if (this.status === 1) {
        this.$message.warning('房间已处于上架状态！')
        return
      }
      if (this.batchArr.length > 0) {
        await onShelf({ idArray: this.batchArr }).then((res) => {
          this.batchArr = []
          this.status = ''
          this.RoomList()
        })
      }
    },
    async batchOffShelf() {
      if (this.status === '') {
        this.$message.warning('请先选择上/下架后再批量处理!')
        return
      } else if (this.status === 0) {
        this.$message.warning('房间已处于下架状态！')
        return
      }
      if (this.batchArr.length > 0) {
        await offShelf({ idArray: this.batchArr }).then((res) => {
          this.batchArr = []
          this.status = ''
          this.RoomList()
        })
      }
    },
    allRoom() {
      this.status = ''
      this.RoomList()
    },
    onlineRoom() {
      this.status = 1
      this.RoomList()
    },
    enlineRoom() {
      this.status = 0
      this.RoomList()
    },
    selectRow(selection) {
      let idArray = []
      selection.forEach((element) => {
        idArray.push(element.id)
      })
      this.batchArr = idArray
    },
    selectAllRow(selection) {
      let idArray = []
      selection.forEach((element) => {
        idArray.push(element.id)
      })
      this.batchArr = idArray
    },
    editRoom(itm) {
      this.$router.push({ path: '/roomList/addRoom', query: { hotel_id: itm.hotel_id, roomId: itm.id, from: 'edit' } })
    },
    async exportroom() {
      await exportRoom({ hotel_id: this.userInfo.hotel_id }).then((res) => {
        const reader = new FileReader()
        reader.readAsDataURL(res) // 转换为base64，可以直接放入a标签href
        reader.onload = function (e) {
          let a = document.createElement('a') // 转换完成，创建一个a标签用于下载
          a.download = '客房列表' + '.xls'
          a.href = e.target.result
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
      })
    },
    searchRoom() {
      console.log(this.searchForm)
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
        justify-content: space-between;
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
  .adjustmentPrice {
    .is-selected {
      color: #1989fa;
    }
    .top {
      margin-bottom: 30px;
      span {
        margin-left: 20px;
      }
      .el-button {
        margin-left: 15px;
        margin-right: 50px;
      }
    }
    .budge {
      width: 10px;
      height: 10px;
      border-radius: 5px;
      margin: 10px auto;
    }
    .blue {
      background-color: #409eff;
    }
  }
}
</style>