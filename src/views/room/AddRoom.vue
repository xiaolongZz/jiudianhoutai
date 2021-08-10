<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item>客房管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/roomList' }">客房列表</el-breadcrumb-item>
        <el-breadcrumb-item v-if="this.from == 'add'" :to="{ path: '/roomList/addRoom' }">添加客房</el-breadcrumb-item>
        <el-breadcrumb-item v-if="this.from == 'edit'" :to="{ path: '/roomList/addRoom' }">编辑客房</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 步骤条区域 -->
      <el-steps :space="200" :active="activeIndex + 0" finish-status="success" simple>
        <el-step title="基本信息"></el-step>
        <el-step title="房间信息"></el-step>
      </el-steps>
      <!-- tab 栏区域 -->
      <el-form :model="roomInfo" label-width="110px" label-position="left" :rules="rules" ref="roomInfoForm">
        <el-tabs v-model="activeTabIndex" :tab-position="'left'" @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0" class="tab1">
            <el-form-item label="客房名称:" prop="room_name" style="width: 21%">
              <el-input v-model="roomInfo.room_name"></el-input>
            </el-form-item>
            <div style="width: 600px" class="cancel_time">
              <el-form-item label="免费取消时间" prop="final_cancel_time">
                <el-select v-model="roomInfo.final_cancel_time" placeholder="请选择">
                  <el-option v-for="item in cancelOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width: 120px" label-width="0" prop="final_cancel_hour">
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
            <el-form-item label="客房类型" prop="classify_id">
              <el-select v-model="roomInfo.classify_id" placeholder="请选择">
                <el-option v-for="item in nameOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
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
                :before-upload="beforeUpload"
                :on-remove="handleRemove"
                :limit="20"
                :auto-upload="false"
                :on-exceed="handleExceed"
                :on-change="picsChange"
                :on-success="upLoadSuccess"
                ref="upload"
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
            <el-form-item label="标签选择:" style="width: 100%">
              <el-checkbox-group v-model="roomInfo.room_label">
                <el-checkbox v-for="(item, index) in roomInfo.all_label.room_label" :key="index" :label="item.id">{{ item.label_name }}</el-checkbox>
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
            <el-form-item prop="room_facilities" style="width: 100%" v-for="item in roomInfo.all_label.room_facilities" :key="item.type_id" label="房间信息">
              <label slot="label">{{ item.name }}</label>
              <el-checkbox-group v-model="roomInfo.room_facilities">
                <el-checkbox v-for="ele in item.label" :key="ele.id" :label="ele.id">{{ ele.label_name }}</el-checkbox>
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
import { getRoomDetail, uploadToken, createRoom, editRoom, getSelectOption } from '../../assets/api/index.js'
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
      rules: {
        room_name: [{ required: true, message: '请输入客房名称', trigger: 'blur' }],
        final_cancel_time: [{ required: true, message: '请选择免费取消时间', trigger: 'blur' }],
        final_cancel_hour: [{ required: true, message: '请选择免费取消时间', trigger: 'blur' }],
        classify_id: [{ required: true, message: '请选择客房类型', trigger: 'blur' }],
        price: [{ required: true, message: '请输入房间价格', trigger: 'blur' }],
        inventory: [{ required: true, message: '请输入房间库存', trigger: 'blur' }],
        max_people: [{ required: true, message: '请输入房间最大入住人数', trigger: 'blur' }],
        area: [{ required: true, message: '请输入房间面积', trigger: 'blur' }],
        status: [{ required: true, message: '请选择客房状态', trigger: 'blur' }],
      },
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
      dialogImageUrl: '',
      headerObj: {
        token: '',
        key: '',
      },
      uploadPicnum: 0, // 上传成功的图片数量
      num: 0,
      roomPic: [],
    }
  },
  created() {
    this.getRoomInfo()
    this.getclassifySelect()
  },
  methods: {
    async getRoomInfo() {
      if (!this.roomId) {
        await getRoomDetail({ id: '' }).then((res) => {
          this.roomInfo = res.data
        })
      }
      await getRoomDetail({ id: this.roomId }).then((res) => {
        this.roomInfo = res.data
        this.roomPic = res.data.room_pictures
      })
    },
    async getclassifySelect() {
      await getSelectOption({ hotel_id: this.hotel_id }).then((res) => {
        res.data.classify.forEach((ele) => {
          this.nameOptions.push(ele)
        })
      })
    },
    previousStep() {
      if (this.activeIndex == 1 && this.activeTabIndex == '1') {
        this.activeIndex--
        this.activeTabIndex = '0'
      }
    },
    nextStep() {
      if (this.activeIndex == 0 && this.activeTabIndex == '0') {
        this.activeIndex++
        this.activeTabIndex = '1'
      }
    },
    tabClicked(data) {
      this.activeIndex = parseFloat(data.index)
      this.activeTabIndex = data.index.toString()
    },
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
    handleExceed() {
      this.$message.info('最多上传20张房间缩略图！')
    },
    picsChange(file) {
      if (file.status === 'success') {
        file.url = 'http://hotelv2-qiniu.shall-buy.com/' + file.response.key
        file.key = file.response.key
        return
      } else {
        this.roomInfo.room_pictures.push(file)
      }
    },
    handleRemove(file) {
      // 如果删除的是已有的图片
      if (file.key) {
        //  1.获取要删除的图片的临时路径
        let fileKey = file.key
        //  2.从pics数组中，找到这个图片对应的索引
        let i = this.roomInfo.room_pictures.findIndex((x) => x.key === fileKey)
        //  3.将删除的图片存起来返给后端
        this.roomInfo.del_picture.push(this.roomInfo.room_pictures[i].key)
        //  4.调用数组的splice 方法，把图片信息对象从pics中删除掉
        this.roomInfo.room_pictures.splice(i, 1)
      } else {
        let fileUid = file.uid
        let k = this.roomInfo.room_pictures.findIndex((x) => x.uid === fileUid)
        this.roomInfo.room_pictures.splice(k, 1)
      }
    },
    async upLoadSuccess() {
      this.num++
      if (this.from == 'add') {
        if (this.roomInfo.room_pictures.length == this.num) {
          this.roomInfo.thumbnail = this.roomInfo.room_pictures[0].response.key
          await createRoom(this.roomInfo).then((res) => {
            this.num = 0
            this.$message.success('新增房间成功！')
            this.$router.push({ path: '/roomList' })
          })
        }
      }
      if (this.from == 'edit') {
        this.uploadPicnum-- // 已上传成功的图片数量
        if (this.uploadPicnum == 0) {
          await editRoom(this.roomInfo).then((res) => {
            this.uploadPicnum = 0
            this.$message.success('编辑房间成功！')
            this.$router.push({ path: '/roomList' })
          })
        }
      }
    },
    submit() {
      this.$refs.roomInfoForm.validate(async (valid) => {
        this.roomInfo.hotel_id = this.$route.query.hotel_id
        if (!valid) {
          this.$message.error('请填写完整的客房信息后再进行提交！')
          return
        }
        if (this.roomInfo.room_pictures.length == 0) {
          this.$message.error('请至少上传一张房间照片后再进行提交！')
          return
        }
        this.uploadPicnum = 0
        this.roomInfo.room_pictures.forEach((element) => {
          if (element.status == 'ready') {
            this.uploadPicnum++
          }
        })
        this.$refs.upload.submit()
        if (this.roomPic == this.roomInfo.room_pictures) {
          await editRoom(this.roomInfo).then((res) => {
            this.uploadPicnum = 0
            this.$message.success('编辑房间成功！')
            this.$router.push({ path: '/roomList' })
          })
        }
      })
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
