<template>
  <div>
    <el-card>
      <!-- 步骤条区域 -->
      <el-steps :space="200" :active="activeIndex + 0" finish-status="success" simple>
        <el-step title="基本信息"></el-step>
        <el-step title="房间信息"></el-step>
      </el-steps>
      <!-- tab 栏区域 -->
      <el-form :model="addRoomForm" label-width="100px" label-position="left">
        <el-tabs v-model="activeTabIndex" :tab-position="'left'" @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0" class="tab1">
            <el-form-item label="客房名称:" prop="room_name" style="width: 20%">
              <el-input v-model="addRoomForm.room_name"></el-input>
            </el-form-item>
            <div style="width: 600px" class="cancel_time">
              <el-form-item label="免费取消时间" prop="room_name">
                <el-select v-model="addRoomForm.final_cancel_time" placeholder="请选择">
                  <el-option v-for="item in cancelOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width: 120px" label-width="0">
                <el-time-select
                  style="width: 120px"
                  v-model="addRoomForm.final_cancel_hour"
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
              <el-select v-model="addRoomForm.name" placeholder="请选择">
                <el-option v-for="item in nameOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格:" prop="room_name" style="width: 100%"><el-input v-model="addRoomForm.room_name" style="width: 15%"></el-input></el-form-item>
            <el-form-item label="库存:" prop="room_name" style="width: 100%"> <el-input v-model="addRoomForm.room_name" style="width: 15%"></el-input> </el-form-item>
            <el-form-item label="入住人数:" prop="room_name" style="width: 100%"><el-input v-model="addRoomForm.room_name" style="width: 15%"></el-input> 人</el-form-item>
            <el-form-item label="房间面积:" prop="room_name" style="width: 100%"><el-input v-model="addRoomForm.room_name" style="width: 15%"></el-input> m²</el-form-item>
            <el-form-item label="房间缩略图:" style="width: 100%">
              <el-upload action="#" list-type="picture-card" :auto-upload="false" @before-remove="beforeRemove" @on-remove="remove">
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
            <el-form-item label="标签选择:" prop="room_name" style="width: 100%">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="上下架:" prop="room_name" style="width: 100%">
              <el-radio v-model="radio" label="1" border>上架</el-radio>
              <el-radio v-model="radio" label="2" border>下架</el-radio>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="房间信息" name="1">
            <el-form-item label="房间设施:" prop="room_name" style="width: 100%">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="服务项目:" prop="room_name" style="width: 100%">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="餐厅设施:" prop="room_name" style="width: 100%">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="活动设施:" prop="room_name" style="width: 100%">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="通用设施:" prop="room_name" style="width: 100%">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="商务服务:" prop="room_name" style="width: 100%">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="儿童设施:" prop="room_name" style="width: 100%">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
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
        <el-button type="primary" style="width: 100px">提交</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { classifySelect } from '../../assets/api/index.js'
export default {
  data() {
    return {
      hotel_id: this.$route.query.hotel_id,
      activeIndex: 0,
      activeTabIndex: '0',
      addRoomForm: {
        room_name: '',
        final_cancel_time: '',
        final_cancel_hour: '',
        name: '',
      },
      addFormRules: {},
      cancelOptions: [
        { value: '入住当日', label: '入住当日' },
        { value: '入住前一日', label: '入住前一日' },
        { value: '入住前两日', label: '入住前两日' },
        { value: '入住前三日', label: '入住前三日' },
      ],
      nameOptions: [],
      dialogVisible: false,
      checkList: [],
      radio: '',
    }
  },
  created() {
    this.getclassifySelect()
  },
  methods: {
    async getclassifySelect() {
      await classifySelect({ hotel_id: this.hotel_id }).then((res) => {
        res.data.forEach((ele) => {
          ele.value = ele.id
          ele.label = ele.name
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
    handleRemove(file) {
      let pic = file
      this.remove(pic)
    },
    beforeRemove(file) {},
    remove(file) {},
  },
}
</script>
<style lang="less" scoped>
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
