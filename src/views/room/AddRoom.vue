<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item :to="{ path: '/roomList' }">客房管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="this.from == 'add'" :to="{ path: '/roomList/addRoom' }">添加客房</el-breadcrumb-item>
        <el-breadcrumb-item v-if="this.from == 'edit'" :to="{ path: '/roomList/addRoom' }">编辑客房</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 步骤条区域 -->
      <el-steps :space="200" :active="activeIndex + 0" finish-status="success" simple>
        <el-step title="基本信息"></el-step>
        <el-step title="房间信息"></el-step>
      </el-steps>
      <!-- tab 栏区域 -->
      <el-form :model="roomInfo" label-width="100px" label-position="left">
        <el-tabs v-model="activeTabIndex" :tab-position="'left'" @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0" class="tab1">
            <el-form-item label="客房名称:" prop="room_name" style="width: 20%">
              <el-input v-model="roomInfo.room_name"></el-input>
            </el-form-item>
            <div style="width: 600px" class="cancel_time">
              <el-form-item label="免费取消时间" prop="room_name">
                <el-select v-model="roomInfo.final_cancel_time" placeholder="请选择">
                  <el-option v-for="item in cancelOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width: 120px" label-width="0">
                <el-time-select
                  style="width: 120px"
                  v-model="roomInfo.final_cancel_hour"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30',
                  }"
                  placeholder="选择时间"
                >
                </el-time-select>
              </el-form-item>
            </div>
            <el-form-item label="客房类型">
              <el-select v-model="roomInfo.classify_id" placeholder="请选择">
                <el-option v-for="item in nameOptions" :key="item.id" :label="item.label_name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格:" prop="price" style="width: 100%"><el-input v-model="roomInfo.price" style="width: 15%"></el-input> 元</el-form-item>
            <el-form-item label="库存:" prop="inventory" style="width: 100%"> <el-input v-model="roomInfo.inventory" style="width: 15%"></el-input> 间</el-form-item>
            <el-form-item label="入住人数:" prop="max_people" style="width: 100%"><el-input v-model="roomInfo.max_people" style="width: 15%"></el-input> 人</el-form-item>
            <el-form-item label="房间面积:" prop="area" style="width: 100%"><el-input v-model="roomInfo.area" style="width: 15%"></el-input> m²</el-form-item>
            <el-form-item label="房间缩略图:" style="width: 100%">
              <el-upload
                action="https://up-z1.qiniup.com"
                :file-list="roomInfo.room_pictures"
                list-type="picture-card"
                :data="headerObj"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
                :on-remove="handleRemove"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" center>
                <img width="80%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
            <el-form-item label="标签选择:" prop="all_label" style="width: 100%">
              <el-checkbox-group v-model="roomInfo.room_label">
                <el-checkbox v-for="item in roomInfo.all_label.room_label" :key="item.id" :label="item.id">{{ item.label_name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="上下架:" prop="status" style="width: 100%">
              <el-radio-group v-model="roomInfo.status">
                <el-radio :label="0">上架</el-radio>
                <el-radio :label="1">下架</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="房间信息" name="1">
            <el-form-item prop="room_facilities" style="width: 100%" v-for=" item in roomInfo.all_label.room_facilities" :key="item.type_id" label="房间信息">
              <label slot="label">{{item.name}}</label>
              <el-checkbox-group v-model="roomInfo.room_facilities">
                <el-checkbox v-for="ele in item.label" :key="ele.id" :label="ele.id">{{ele.label_name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <!-- 按钮区域 -->
      <div class="buttongroup">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" @click="previousStep">上一步</el-button>
          <el-button type="primary" @click="nextStep">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
      </div>
      <div class="buttongroup" v-show="activeIndex">
        <el-button type="primary" style="width: 100px" @click="submit">提交</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { classifySelect, getRoomInfo, uploadToken,createRoom,editRoom } from '../../assets/api/index.js'
export default {
  data() {
    return {
      hotel_id: this.$route.query.hotel_id, // 酒店id
      roomId: this.$route.query.roomId, // 房间id
      from: this.$route.query.from, // 从哪个按钮进来的标识     add   edit
      roomInfo: {
        all_label: {
          room_facilities: [],
          room_label: [],
        },
      }, // 根据酒店id查询到的房间信息
      editRoomInfo:{
        hotel_id:'',
        room_name:'',
        price:'',
        classify_id:'',
        inventory:'',
        thumbnail:'',
        room_pictures:[],
        room_label:[],
        room_facilities:[],
        area:'',
        max_people:''
      },
      thumbnail: '', // 缩略图
      activeIndex: 0,
      activeTabIndex: '0',
      cancelOptions: [
        { value: '入住当日', label: '入住当日' },
        { value: '入住前一日', label: '入住前一日' },
        { value: '入住前两日', label: '入住前两日' },
        { value: '入住前三日', label: '入住前三日' },
      ],
      nameOptions: [],
      dialogVisible: false,
      checkList: [],
      dialogImageUrl: '',
      headerObj: {
        token: '',
        key: '',
      },
    }
  },
  created() {
    this.getRoomInfo()
    this.getclassifySelect()
  },
  methods: {
    async getRoomInfo() {
      if (!this.roomId) {
       await getRoomInfo({ id: '' }).then((res) => {
        this.roomInfo = res.data
      })
      }
      await getRoomInfo({ id: this.roomId }).then((res) => {
        this.roomInfo = res.data
      })
    },
    async getclassifySelect() {
      await classifySelect({ hotel_id: this.hotel_id }).then((res) => {
        res.data.room_classify.forEach((ele) => {
          console.log(ele);
          this.nameOptions.push(ele)
        })
      })
    },
    previousStep() {
      if (this.activeIndex === 1 && this.activeTabIndex === '1') {
        this.activeIndex--
        this.activeTabIndex = '0'
      }
    },
    nextStep() {
      if (this.activeIndex === 0 && this.activeTabIndex === '0') {
        this.activeIndex++
        this.activeTabIndex = '1'
      }
    },
    tabClicked() {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async beforeUpload(file) {
      await uploadToken().then((res) => {
        const i = file.type.indexOf('/')
        const picType = file.type.slice(i + 1)
        this.headerObj.token = res.data.token
        this.headerObj.key = res.data.key + '.' + picType
      })
    },
    // 监听图片上传成功的事件
    handleSuccess(response) {
      // 1. 拼接得到一个图片信息对象
      const picInfo = {
        key: response.key,
        url: 'http://hotelv2-qiniu.shall-buy.com/' + response.key,
      }
      // 2. 将图片信息对象，push到pics数组中
      this.roomInfo.room_pictures.push(picInfo)
      this.editRoomInfo.room_pictures.push(picInfo)
    },
    handleRemove(file) {
      //  1.获取要删除的图片的临时路径
      const fileKey = file.key
      //  2.从pics数组中，找到这个图片对应的索引
      const i = this.roomInfo.room_pictures.findIndex((x) => x.key === fileKey)
      const k = this.editRoomInfo.room_pictures.findIndex((x) => x.key === fileKey)
      this.roomInfo.del_picture.push(this.roomInfo.room_pictures[i].key)
      this.editRoomInfo.del_picture.push(this.editRoomInfo.room_pictures[k].key)
      // 3.调用数组的splice 方法，把图片信息对象从pics中删除掉
      this.roomInfo.room_pictures.splice(i, 1)
      this.editRoomInfo.room_pictures.splice(i, 1)
    },
  async submit(){
    this.editRoomInfo.hotel_id = this.$route.query.hotel_id,
    this.editRoomInfo.thumbnail = this.editRoomInfo.room_pictures[0]
      console.log(this.editRoomInfo);
      if(this.from == 'add'){
        // 添加客房
  await createRoom(this.editRoomInfo).then((res)=>{
    console.log(res);
  })
      }
      if(this.from == 'edit'){
        // 编辑客房
      }
    }
  },
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 50px;
}
.el-steps {
  width: 500px;
  margin-bottom: 50px;
}
.el-tab-pane {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    margin-right: 50px;
  }
}
.cancel_time {
  display: flex;
  .el-form-item {
    margin-right: 20px;
  }
}
.tab1 {
  padding-left: 50px;
}
.buttongroup {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}
</style>
