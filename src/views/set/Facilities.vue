<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item>基础设置</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 步骤条区域 -->
      <el-steps :space="200" :active="activeIndex + 0" finish-status="success" simple>
        <el-step title="基础设施 >>"></el-step>
        <el-step title="酒店图片 >>"></el-step>
        <el-step title="入住政策"></el-step>
      </el-steps>
      <el-form ref="form" :model="form" label-width="100px">
        <!-- tab 栏区域 -->
        <el-tabs v-model="activeTabIndex" :tab-position="'left'" @tab-click="tabClicked">
          <el-tab-pane label="基础设施" name="0" class="tab1">
            <el-form-item label="酒店中文名：" style="width: 350px">
              <el-input v-model="form.chinese_name" placeholder="酒店名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="酒店英文名：" style="width: 350px">
              <el-input v-model="form.english_name" placeholder="酒店名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="酒店星级：" style="width: 350px">
              <el-select v-model="form.star" placeholder="请选择星级" clearable>
                <el-option v-for="item in hotelStarOption" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="酒店品牌：" style="width: 350px">
              <el-select v-model="form.hotel_classify" placeholder="请选择酒店品牌" clearable>
                <el-option v-for="item in hotelStyleOption" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开业时间：" style="width: 350px">
              <el-date-picker v-model="form.open_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" clearable> </el-date-picker>
            </el-form-item>
            <el-form-item label="联系电话：" style="width: 350px">
              <el-input v-model="form.tel" placeholder="联系电话" clearable></el-input>
            </el-form-item>
            <el-form-item label="详情地址：" style="width: 800px">
              <el-input v-model="form.address" placeholder="详情地址" clearable></el-input>
            </el-form-item>
            <el-form-item label="地图定位：" style="width: 500px">
              <div style="display: flex">
                <el-input style="width: 150px; margin-right: 20px" placeholder="经度" v-model="form.longitude"></el-input>
                <el-input style="width: 150px; margin-right: 20px" placeholder="纬度" v-model="form.latitude"></el-input>
                <div>
                  <el-button @click="chooseID">选择坐标</el-button>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="酒店资质：" style="width: 800px">
              <el-upload
                action="https://up-z1.qiniup.com"
                :file-list="form.qualification"
                list-type="picture-card"
                :data="headerObj"
                :before-upload="beforeUpload"
                :on-remove="handleRemove1"
                :auto-upload="false"
                :on-change="picsChange1"
                :on-success="upLoadSuccess"
                ref="upload1"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview1(file)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleRemove1(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <span>请上传营业执照，荣誉证书等</span>
              <el-dialog :visible.sync="dialogVisible1">
                <img width="100%" :src="dialogImageUrl1" alt="" />
              </el-dialog>
            </el-form-item>
            <el-form-item label="酒店简介：" style="width: 600px">
              <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" placeholder="请输入酒店介绍信息" v-model="form.briefIntroduction"> </el-input>
            </el-form-item>
            <el-form-item label="上下线：" style="width: 600px">
              <el-radio v-model="form.biz_status" label="1">上线</el-radio>
              <el-radio v-model="form.biz_status" label="2">维护</el-radio>
            </el-form-item>
            <el-divider></el-divider>
          </el-tab-pane>
          <el-tab-pane label="酒店图片" name="1" class="tab1">
            <span>酒店预览图(0/1)</span>
            <el-upload
              action="https://up-z1.qiniup.com"
              :file-list="form.picture"
              list-type="picture-card"
              :data="headerObj"
              :before-upload="beforeUpload"
              :on-remove="handleRemove2"
              :auto-upload="false"
              :on-change="picsChange2"
              :on-success="upLoadSuccess"
              ref="upload2"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview2(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleRemove2(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible2">
              <img width="100%" :src="dialogImageUrl2" alt="" />
            </el-dialog>
            <span>外观(无限制)</span>
            <el-upload
              action="https://up-z1.qiniup.com"
              :file-list="form.appearance"
              list-type="picture-card"
              :data="headerObj"
              :before-upload="beforeUpload"
              :on-remove="handleRemove3"
              :auto-upload="false"
              :on-change="picsChange3"
              :on-success="upLoadSuccess"
              ref="upload3"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview3(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleRemove3(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible3">
              <img width="100%" :src="dialogImageUrl3" alt="" />
            </el-dialog>
            <span>公共区域(已上传3张)</span>
            <el-upload
              action="https://up-z1.qiniup.com"
              :file-list="form.public"
              list-type="picture-card"
              :data="headerObj"
              :before-upload="beforeUpload"
              :on-remove="handleRemove4"
              :auto-upload="false"
              :on-change="picsChange4"
              :on-success="upLoadSuccess"
              ref="upload4"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview4(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleRemove4(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible4">
              <img width="100%" :src="dialogImageUrl4" alt="" />
            </el-dialog>
            <span>房间(无限制)</span>
            <el-upload
              action="https://up-z1.qiniup.com"
              :file-list="form.room_pictures"
              list-type="picture-card"
              :data="headerObj"
              :before-upload="beforeUpload"
              :on-remove="handleRemove5"
              :auto-upload="false"
              :on-change="picsChange5"
              :on-success="upLoadSuccess"
              ref="upload5"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview5(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleRemove5(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible5">
              <img width="100%" :src="dialogImageUrl5" alt="" />
            </el-dialog>
            <span>其他(无限制)</span>
            <el-upload
              action="https://up-z1.qiniup.com"
              :file-list="form.other_pictures"
              list-type="picture-card"
              :data="headerObj"
              :before-upload="beforeUpload"
              :on-remove="handleRemove6"
              :auto-upload="false"
              :on-change="picsChange6"
              :on-success="upLoadSuccess"
              ref="upload6"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview6(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span class="el-upload-list__item-delete" @click="handleRemove6(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible6">
              <img width="100%" :src="dialogImageUrl6" alt="" />
            </el-dialog>
            <el-divider></el-divider>
          </el-tab-pane>
          <el-tab-pane label="入住政策" name="2" class="tab1">
            <el-form-item label="订房必读：" style="width: 600px">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10 }" placeholder="预订相关说明" v-model="form.must_read"> </el-input>
            </el-form-item>
            <el-form-item label="入离时间：">
              入住： <el-time-picker v-model="form.check_in" placeholder="选择时间" style="width: 120px; margin-right: 50px"> </el-time-picker> 离店：
              <el-time-picker v-model="form.check_out" placeholder="选择时间" style="width: 120px"> </el-time-picker>
            </el-form-item>
            <el-form-item label="儿童及加床：" style="width: 600px">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10 }" placeholder="关于儿童加床相关说明" v-model="form.extra_bed"> </el-input>
            </el-form-item>
            <el-form-item label="宠物：" style="width: 600px">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10 }" placeholder="关于宠物入住说明" v-model="form.pet_instructions"> </el-input>
            </el-form-item>
            <el-form-item label="早餐：" style="width: 600px">
              <el-select v-model="form.breakfast" clearable placeholder="请选择">
                <el-option v-for="item in breakfastOption" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预订提示：" style="width: 600px">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10 }" placeholder="用户下预定提示：例如根据当前城市治安管理条例......" v-model="form.reserve_remind"> </el-input>
            </el-form-item>
            <el-form-item label="年龄限制：" style="width: 600px">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10 }" placeholder="预定酒店要求年龄问题描述" v-model="form.age_range"> </el-input>
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
      <div class="buttongroup" v-show="activeIndex == 2">
        <el-button type="primary" style="width: 0 100px" @click="submit">提交</el-button>
      </div>
    </el-card>
    <el-dialog title="选择酒店经纬度" :visible.sync="dialogVisible" v-if="dialogVisible" width="50%" :before-close="handleClose">
      <div class="posion">
        <MyMap @func="getLongLat(arguments)"> </MyMap>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="chooseLocation">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { uploadToken,getDetails } from '../../assets/api/index.js'
import MyMap from './my-map.vue'
export default {
  components: {
    MyMap,
  },
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    // this.getHotelDetails()
  },
  data() {
    return {
      userInfo:{},
      activeIndex: 0,
      activeTabIndex: '0',
      form: {
        chinese_name: '', // 酒店中文名
        english_name: '', // 酒店英文名
        star: '', // 酒店星级
        hotel_classify: '', // 酒店品牌
        open_date: '', // 开业时间
        tel: '', // 联系电话
        address: '', // 详情地址
        longitude: '', // 经度
        latitude: '', // 纬度
        qualification: [], //酒店资质
        picture: [], //酒店预览图
        appearance: [], //外观
        public: [], //公共区域
        room_pictures: [], //房间
        other_pictures: [], // 其他
        del_picture: [],
        briefIntroduction: '', // 酒店简介
        biz_status: '', // 上下线状态
        check_in: '', // 入住时间
        check_out: '', // 离店时间
        must_read: '', // 订房必读
        extra_bed: '', //儿童及加床
        pet_instructions: '', // 宠物
        breakfast: '', // 早餐
        tireserve_remindps: '', // 预订提示
        age_range: '', //年龄限制
        all_label: [], //全部标签
      },
      selectLocation: [], //地图点击获取的经纬度
      hotelStarOption: [
        {
          value: '1',
          label: '一星',
        },
        {
          value: '2',
          label: '二星',
        },
        {
          value: '3',
          label: '三星',
        },
        {
          value: '4',
          label: '四星',
        },
        {
          value: '5',
          label: '五星',
        },
      ],
      hotelStyleOption: [
        {
          value: '全季',
          label: '全季',
        },
        {
          value: '如家',
          label: '如家',
        },
        {
          value: '汉庭',
          label: '汉庭',
        },
        {
          value: '速8',
          label: '速8',
        },
      ],
      breakfastOption: [
        {
          value: '1',
          label: '有早餐',
        },
        {
          value: '2',
          label: '无早餐',
        },
        {
          value: '3',
          label: '个别房带含早',
        },
      ],
      headerObj: {
        token: '',
        key: '',
      },
      dialogImageUrl1: '',
      dialogImageUrl2: '',
      dialogImageUrl3: '',
      dialogImageUrl4: '',
      dialogImageUrl5: '',
      dialogImageUrl6: '',
      dialogVisible: false, // 地图定位显示
      dialogVisible1: false, // 酒店资质
      dialogVisible2: false, // 酒店预览图
      dialogVisible3: false, // 酒店外观
      dialogVisible4: false, // 酒店公共区域
      dialogVisible5: false, // 酒店房间
      dialogVisible6: false, // 酒店其他
    }
  },
  mounted() {},
  methods: {
    // 获取酒店基础设置详情
  //  async getHotelDetails(){
  //    await getDetails({hotel_id:this.userInfo.hotel_id}).then((res)=>{
  //      console.log(res);
  //    })
  //   },
    // 关闭地图弹框
    handleClose() {
      this.dialogVisible = false
    },
    // 选择地图经纬度
    chooseID() {
      this.dialogVisible = true
    },
    // 确定酒店经纬度
    chooseLocation() {
      if (this.selectLocation.length != 0) {
        this.form.longitude = this.selectLocation[0]
        this.form.latitude = this.selectLocation[1]
      }
      this.dialogVisible = false
    },
    // 地图子组件传值的函数
    getLongLat(data) {
      this.selectLocation[0] = data[0]
      this.selectLocation[1] = data[1]
    },
    // tab点击事件
    tabClicked(data) {
      this.activeIndex = parseFloat(data.index)
      this.activeTabIndex = data.index.toString()
    },
    // 上一步按钮点击事件
    previousStep() {
      if (this.activeIndex === 1 && this.activeTabIndex === '1') {
        this.activeIndex--
        this.activeTabIndex = '0'
        return
      }
      if (this.activeIndex === 2 && this.activeTabIndex === '2') {
        this.activeIndex--
        this.activeTabIndex = '1'
        return
      }
    },
    // 下一步按钮点击事件
    nextStep() {
      if (this.activeIndex === 0 && this.activeTabIndex === '0') {
        this.activeIndex++
        this.activeTabIndex = '1'
        return
      }
      if (this.activeIndex === 1 && this.activeTabIndex === '1') {
        this.activeIndex++
        this.activeTabIndex = '2'
        return
      }
    },
    handlePictureCardPreview1(file) {
      this.dialogImageUrl1 = file.url
      this.dialogVisible1 = true
    },
    picsChange1(file) {
      if (file.status === 'success') {
        file.url = 'http://hotelv2-qiniu.shall-buy.com/' + file.response.key
        file.key = file.response.key
        return
      } else {
        this.form.qualification.push(file)
      }
    },
    handleRemove1(file) {
      // 如果删除的是已有的图片
      if (file.key) {
        //  1.获取要删除的图片的临时路径
        let fileKey = file.key
        //  2.从pics数组中，找到这个图片对应的索引
        let i = this.form.qualification.findIndex((x) => x.key === fileKey)
        //  3.将删除的图片存起来返给后端
        this.form.del_picture.push(this.form.qualification[i].key)
        //  4.调用数组的splice 方法，把图片信息对象从pics中删除掉
        this.form.qualification.splice(i, 1)
      } else {
        let fileUid = file.uid
        let k = this.form.qualification.findIndex((x) => x.uid === fileUid)
        this.form.qualification.splice(k, 1)
      }
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl2 = file.url
      this.dialogVisible2 = true
    },
    picsChange2(file) {
      if (file.status === 'success') {
        file.url = 'http://hotelv2-qiniu.shall-buy.com/' + file.response.key
        file.key = file.response.key
        return
      } else {
        this.form.picture.push(file)
      }
    },
    handleRemove2(file) {
      // 如果删除的是已有的图片
      if (file.key) {
        //  1.获取要删除的图片的临时路径
        let fileKey = file.key
        //  2.从pics数组中，找到这个图片对应的索引
        let i = this.form.picture.findIndex((x) => x.key === fileKey)
        //  3.将删除的图片存起来返给后端
        this.form.del_picture.push(this.form.picture[i].key)
        //  4.调用数组的splice 方法，把图片信息对象从pics中删除掉
        this.form.picture.splice(i, 1)
      } else {
        let fileUid = file.uid
        let k = this.form.picture.findIndex((x) => x.uid === fileUid)
        this.form.picture.splice(k, 1)
      }
    },
    handlePictureCardPreview3(file) {
      this.dialogImageUrl3 = file.url
      this.dialogVisible3 = true
    },
    picsChange3(file) {
      if (file.status === 'success') {
        file.url = 'http://hotelv2-qiniu.shall-buy.com/' + file.response.key
        file.key = file.response.key
        return
      } else {
        this.form.appearance.push(file)
      }
    },
    handleRemove3(file) {
      // 如果删除的是已有的图片
      if (file.key) {
        //  1.获取要删除的图片的临时路径
        let fileKey = file.key
        //  2.从pics数组中，找到这个图片对应的索引
        let i = this.form.appearance.findIndex((x) => x.key === fileKey)
        //  3.将删除的图片存起来返给后端
        this.form.del_picture.push(this.form.appearance[i].key)
        //  4.调用数组的splice 方法，把图片信息对象从pics中删除掉
        this.form.appearance.splice(i, 1)
      } else {
        let fileUid = file.uid
        let k = this.form.appearance.findIndex((x) => x.uid === fileUid)
        this.form.appearance.splice(k, 1)
      }
    },
    handlePictureCardPreview4(file) {
      this.dialogImageUrl4 = file.url
      this.dialogVisible4 = true
    },
    picsChange4(file) {
      if (file.status === 'success') {
        file.url = 'http://hotelv2-qiniu.shall-buy.com/' + file.response.key
        file.key = file.response.key
        return
      } else {
        this.form.public.push(file)
      }
    },
    handleRemove4(file) {
      // 如果删除的是已有的图片
      if (file.key) {
        //  1.获取要删除的图片的临时路径
        let fileKey = file.key
        //  2.从pics数组中，找到这个图片对应的索引
        let i = this.form.public.findIndex((x) => x.key === fileKey)
        //  3.将删除的图片存起来返给后端
        this.form.del_picture.push(this.form.public[i].key)
        //  4.调用数组的splice 方法，把图片信息对象从pics中删除掉
        this.form.public.splice(i, 1)
      } else {
        let fileUid = file.uid
        let k = this.form.public.findIndex((x) => x.uid === fileUid)
        this.form.public.splice(k, 1)
      }
    },
    handlePictureCardPreview5(file) {
      this.dialogImageUrl5 = file.url
      this.dialogVisible5 = true
    },
    picsChange5(file) {
      if (file.status === 'success') {
        file.url = 'http://hotelv2-qiniu.shall-buy.com/' + file.response.key
        file.key = file.response.key
        return
      } else {
        this.form.room_pictures.push(file)
      }
    },
    handleRemove5(file) {
      // 如果删除的是已有的图片
      if (file.key) {
        //  1.获取要删除的图片的临时路径
        let fileKey = file.key
        //  2.从pics数组中，找到这个图片对应的索引
        let i = this.form.room_pictures.findIndex((x) => x.key === fileKey)
        //  3.将删除的图片存起来返给后端
        this.form.del_picture.push(this.form.room_pictures[i].key)
        //  4.调用数组的splice 方法，把图片信息对象从pics中删除掉
        this.form.room_pictures.splice(i, 1)
      } else {
        let fileUid = file.uid
        let k = this.form.room_pictures.findIndex((x) => x.uid === fileUid)
        this.form.room_pictures.splice(k, 1)
      }
    },
    handlePictureCardPreview6(file) {
      this.dialogImageUrl6 = file.url
      this.dialogVisible6 = true
    },
    picsChange6(file) {
      if (file.status === 'success') {
        file.url = 'http://hotelv2-qiniu.shall-buy.com/' + file.response.key
        file.key = file.response.key
        return
      } else {
        this.form.other_pictures.push(file)
      }
    },
    handleRemove6(file) {
      // 如果删除的是已有的图片
      if (file.key) {
        //  1.获取要删除的图片的临时路径
        let fileKey = file.key
        //  2.从pics数组中，找到这个图片对应的索引
        let i = this.form.other_pictures.findIndex((x) => x.key === fileKey)
        //  3.将删除的图片存起来返给后端
        this.form.del_picture.push(this.form.other_pictures[i].key)
        //  4.调用数组的splice 方法，把图片信息对象从pics中删除掉
        this.form.other_pictures.splice(i, 1)
      } else {
        let fileUid = file.uid
        let k = this.form.other_pictures.findIndex((x) => x.uid === fileUid)
        this.form.other_pictures.splice(k, 1)
      }
    },
    async beforeUpload(file) {
      await uploadToken().then((res) => {
        const i = file.type.indexOf('/')
        const picType = file.type.slice(i + 1)
        this.headerObj.token = res.data.token
        this.headerObj.key = res.data.key + '.' + picType
      })
    },
    upLoadSuccess(){},
    // 提交
    submit() {
      this.$refs.upload1.submit()
      this.$refs.upload2.submit()
      this.$refs.upload3.submit()
      this.$refs.upload4.submit()
      this.$refs.upload5.submit()
      this.$refs.upload6.submit()
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
.el-steps {
  width: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
}
#container {
  width: 100%;
  height: 500px;
}
.posion {
  text-align: center;
}
.buttongroup {
  text-align: center;
}
.buttongroup {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}
.tab1 {
  padding-left: 30px;
}
</style>