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
              <el-input v-model="searchForm.room_name"></el-input>
            </el-form-item>
            <el-form-item label="添加时间">
              <el-date-picker
                v-model="addData"
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
              <el-select v-model="searchForm.classify_id" placeholder="无" style="width: 280px" clearable>
                <el-option v-for="(item, index) in roomOptions" :key="index" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="营销标签">
              <el-select v-model="searchForm.room_label" placeholder="无" style="width: 280px" clearable>
                <el-option v-for="(item, index) in tagOptions" :key="index" :label="item.label_name" :value="item.id"> </el-option>
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
          <el-table-column prop="room_name" label="房名">
            <template slot-scope="scope">
              <div class="roomName">
                <el-image style="width: 100px; height: 100px" :src="scope.row.thumbnail"> </el-image>
                <div>
                  <p>{{ scope.row.room_name }}</p>
                  <el-tag>{{ scope.row.name }}</el-tag>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格"> </el-table-column>
          <el-table-column prop="inventory" label="库存"> </el-table-column>
          <el-table-column prop="sales" label="实际销量"> </el-table-column>
          <el-table-column prop="updated_at" label="创建时间"> </el-table-column>
          <el-table-column prop="room_label" label="营销标签">
            <template slot-scope="scope">
              <el-tag v-for="item in scope.row.room_label" :key="item.index" style="margin: 0 5px">{{ item.label_name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.status == 1" @click="offShelfRoom(scope.row.id)">下架</el-button>
              <el-button type="text" size="small" v-if="scope.row.status == 0" @click="onShelfRoom(scope.row.id)">上架</el-button>
              <el-button type="text" size="small" @click="editRoom(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleRoom(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="OffTheShelf">
          <el-button @click="batchShelves">批量上架</el-button>
          <el-button @click="batchOffShelf">批量下架</el-button>
          <el-button icon="el-icon-delete" @click="batchDele">批量删除</el-button>
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
          <el-date-picker v-model="adjustmentTime" type="month" placeholder="请选择年月" @change="changeData" :clearable="false"> </el-date-picker>
          <span>包含房间：</span>
          <el-input style="width: 250px" placeholder="请输入房间名查询" v-model="adjustmentRoomName"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="searRoomPrice">搜索</el-button>
        </div>
        <div class="calendar_class">
          <el-calendar v-model="adjustmentTime">
            <template slot="dateCell" slot-scope="{ date, data }">
              <div @click="chooseDay(date, data)">
                <p :class="data.isSelected ? 'is-selected' : ''">
                  {{ data.day.split('-').slice(1).join('-') }}
                </p>
                <!-- <span v-show="data.type ==='current-month'">涨幅{{ Increase }}%</span> -->
                <span v-for="item in priceList" :key="item.id">
                  <span v-if="item.date == data.day">{{ '涨幅  ' + item.price.revise_range }}</span>
                </span>
                <span class="is-selected" v-if="calendarData.days.indexOf(data.day) != -1">{{ calendarData.sign }}</span>
              </div>
            </template>
          </el-calendar>
        </div>

        <div class="down">
          <span>已选中 {{ selectData }} 日</span>
          <el-button type="primary" @click="showEideDialogVisible">修改价格</el-button>
        </div>
        <el-alert title="tips：点击后选中相应日期（可多选、单选），点击日历右下方按钮进行价格涨幅修改。" type="info" center show-icon :closable="false"></el-alert>
        <el-dialog title="修改价格" :visible.sync="eideDialogVisible" width="70%" :before-close="handleClose">
          <p>选定时间：</p>
          <div class="selectedData">
            <span v-for="(item, index) in calendarData.days" :key="index">{{ item }}</span>
          </div>
          <div class="selectedRoom">
            <span>选定房间：</span>
            <span> <el-button @click="clearSelect">全不选</el-button><el-button @click="selectAll">全选</el-button> </span>
          </div>
          <div>
            <el-checkbox-group v-model="checkedCities">
              <el-checkbox v-for="room in roomListData" :label="room.id" :key="room.id">{{ room.room_name }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <p>价格涨幅：</p>
          <el-select v-model="revise_type" placeholder="请选择涨幅调整" class="priceIncrease">
            <el-option v-for="item in priceIncreaseOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <span>比例：</span> <el-input v-model="revise_range" placeholder="请输入内容" class="proportion"></el-input><span> %</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="eideDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateRoomPrice">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getRoomList, onShelf, offShelf, getSelectOption, exportRoom, updatePrice, getPriceCalendar, deleteRoom } from '../../assets/api/index.js'
export default {
  data() {
    return {
      // 查询参数对象
      queryInfo: {},
      userInfo: {},
      tabPosition: '客房列表',
      nowtab: '客房列表',
      addData: '',
      searchForm: {
        hotel_id: '',
        room_name: '',
        start_date: '',
        finish_date: '',
        room_label: '',
        classify_id: '',
        pageSize: '',
        status: '',
        page: '',
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
      calendarValue: '',
      Increase: 0,
      adjustmentRoomName: '',
      calendarData: { days: [], sign: '✔️' },
      selectData: 0,
      eideDialogVisible: false,
      checkedCities: [],
      revise_type: '',
      priceIncreaseOptions: [
        {
          value: '0',
          label: '减少',
        },
        {
          value: '1',
          label: '增加',
        },
      ],
      revise_range: '',
      priceList: [],
      getPriceForm: {
        year: '',
        month: '',
        hotel_id: '',
        room_name: '',
      },
      nowData: new Date(),
      lists: [
        { key: 'Jan', value: '01' },
        { key: 'Feb', value: '02' },
        { key: 'Mar', value: '03' },
        { key: 'Apr', value: '04' },
        { key: 'May', value: '05' },
        { key: 'Jun', value: '06' },
        { key: 'Jul', value: '07' },
        { key: 'Aug', value: '08' },
        { key: 'Sep', value: '09' },
        { key: 'Oct', value: 10 },
        { key: 'Nov', value: 11 },
        { key: 'Dec', value: 12 },
      ],
    }
  },
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.RoomList()
    this.getPrice(this.nowData)
  },
  mounted() {},
  watch: {
    adjustmentTime(newVal, oldVal) {
      let newData = newVal + ' '
      let oldtime = oldVal + ' '
      newData = newData.split(' ')
      oldVal = oldtime.split(' ')
      if (newData[3] == oldVal[3] && newData[1] == oldVal[1]) {
        return
      } else {
        this.getPrice(newVal)
      }
    },
  },
  methods: {
    chooseDay(date, data) {
      if (this.calendarData.days.includes(data.day)) {
        let index = this.calendarData.days.indexOf(data.day)
        this.calendarData.days.splice(index, 1)
      } else {
        this.calendarData.days.push(data.day)
      }
      this.selectData = this.calendarData.days.length
    },
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
      this.searchForm.pageSize = this.pageSize
      this.searchForm.page = this.currentPage
      this.searchForm.hotel_id = this.userInfo.hotel_id
      if (this.addData) {
        this.searchForm.start_date = this.addData[0]
        this.searchForm.finish_date = this.addData[1]
      } else {
        this.searchForm.start_date = ''
        this.searchForm.finish_date = ''
      }
      await getRoomList(this.searchForm).then((res) => {
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
    async getPrice(newVal) {
      let newData = newVal + ' '
      newData = newData.split(' ')
      this.getPriceForm.year = newData[3]
      this.getPriceForm.month = this.lists.filter((item) => item.key == newData[1])[0].value
      this.getPriceForm.hotel_id = this.userInfo.hotel_id
      this.getPriceForm.room_name = this.adjustmentRoomName
      await getPriceCalendar(this.getPriceForm).then((res) => {
        this.priceList = res.data
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
    batchDele() {
      this.deleRoom(this.batchArr)
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
    async deleRoom(itm) {
      console.log(itm instanceof Array)
      let idArray = []
      if (itm instanceof Array) {
        idArray = itm
      } else {
        idArray.push(itm.id)
      }
      const confiemResult = await this.$confirm('此操作将永久删除房间, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confiemResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      await deleteRoom({ idArray: idArray }).then(() => {
        this.$message.success('删除成功~')
        this.RoomList()
      })
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
    searRoomPrice() {
      if (!this.adjustmentTime) {
        this.adjustmentTime = this.nowData
      }
      this.getPrice(this.adjustmentTime)
    },

    changeData(data) {
      this.getPrice(data)
    },
    searchRoom() {
      this.RoomList()
    },
    showEideDialogVisible() {
      this.eideDialogVisible = true
    },
    handleClose() {
      this.eideDialogVisible = false
    },
    selectAll() {
      this.checkedCities = []
      this.roomListData.forEach((item) => {
        this.checkedCities.push(item.id)
      })
    },
    clearSelect() {
      this.checkedCities = []
    },
    async updateRoomPrice() {
      // room_id:              //类型：Array  必有字段  备注：房间id
      // calendar_id:          //类型：Array  必有字段  备注：日期id
      // revise_type:          //类型：String  必有字段  备注：0=下调，1=上调
      // revise_range:         //类型：String  必有字段  备注：价格调整幅度
      let obj = {}
      obj.room_id = this.checkedCities
      obj.date = this.calendarData.days
      obj.revise_type = this.revise_type
      obj.revise_range = this.revise_range
      await updatePrice(obj).then((res) => {
        this.eideDialogVisible = false
        this.calendarData.days = []
        this.checkedCities = []
        this.revise_type = ''
        this.revise_range = ''
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
    .calendar_class /deep/ .el-calendar-table:not(.is-range) td.next {
      pointer-events: none;
    }
    .calendar_class /deep/ .el-calendar-table:not(.is-range) td.prev {
      pointer-events: none;
    }
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
    .down {
      display: flex;
      justify-content: flex-end;
      height: 40px;
      line-height: 40px;
      button {
        margin-left: 50px;
        margin-right: 100px;
      }
    }
    .el-alert {
      margin: 0 auto;
      width: 80%;
      margin-top: 20px;
    }
    .selectedData {
      span {
        display: inline-block;
        width: 100px;
        height: 60px;
        line-height: 60px;
        border: 1px solid #ccc;
        text-align: center;
        margin-left: -1px;
      }
    }
    .selectedRoom {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
    }
    .proportion {
      width: 200px;
    }
    .priceIncrease {
      margin-right: 50px;
    }
  }
  .roomName {
    display: flex;
    justify-content: space-between;
  }
}
</style>