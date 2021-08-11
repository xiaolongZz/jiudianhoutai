<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item :to="{ path: '/roomList' }">客房管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/classify' }">分类管理</el-breadcrumb-item>
      </el-breadcrumb>

      <el-button type="primary" @click="addClassification">添加分类</el-button>

      <div class="title">分类列表</div>

      <el-table :data="classifyList" border style="width: 100%" :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
        <el-table-column prop="name" label="分类名称"> </el-table-column>
        <el-table-column prop="created_at" label="添加时间"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">隐藏</span>
            <span v-if="scope.row.status == 1">生效</span>
            <span></span>
          </template>
        </el-table-column>
        >
        <el-table-column label="操作">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteClassify(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加分类" :visible.sync="dialogVisible" width="47%" :before-close="handleClose">
        <el-form :model="addClassificationForm" ref="addClassificationFormRef" label-width="100px">
          <el-form-item
            :label="'分类名称'"
            prop="name"
            :rules="{
              required: true,
              message: '分类名称不能为空',
              trigger: 'blur',
            }"
          >
            <el-input v-model="addClassificationForm.name" placeholder="请输入要添加的分类名称" style="width: 200px"> </el-input>
          </el-form-item>
          <el-form-item v-for="(bed_type, index) in addClassificationForm.bed_type" :label="'床型' + (index + 1)" :key="bed_type.index" :prop="'bed_type' + index">
            <el-select v-model="addClassificationForm.bed_type[index].bed_label" placeholder="请选择" style="width: 120px">
              <el-option v-for="item in bed_label" :key="item.id" :label="item.bed_label" :value="item.bed_label"> </el-option>
            </el-select>
            <el-input style="width: 80px" v-model="addClassificationForm.bed_type[index].long" type="number" placeholder="长" :min="0"></el-input>
            <span> m *</span>
            <el-input style="width: 80px" v-model="addClassificationForm.bed_type[index].wide" type="number" placeholder="宽" :min="0"></el-input>
            <span> m</span>
            <el-input style="width: 60px" v-model="addClassificationForm.bed_type[index].num" type="number" :min="1"></el-input>
            <span> 张</span>
            <el-button icon="el-icon-plus" circle @click="addBed_type" size="mini"></el-button>
            <el-button icon="el-icon-minus" size="mini" circle v-if="addClassificationForm.bed_type.length > 1" @click="removeBed_type(addClassificationForm.bed_type[index])"></el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="addClassify">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getClassifyList, deleteRoomClassify, classifySelect, createRoomClassify } from '../../assets/api/index.js'
export default {
  data() {
    return {
      userInfo: {},
      classifyList: [],
      dialogVisible: false,
      addClassificationForm: {
        hotel_id: '',
        name: '',
        bed_type: [{ bed_label: '', long: '', wide: '', num: 1 }],
      },
      room_classify: [],
      bed_label: [],
    }
  },
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.GetClassifyList()
  },
  methods: {
    addClassification() {
      this.dialogVisible = true
    },
    async GetClassifyList() {
      await getClassifyList({ hotel_id: this.userInfo.hotel_id }).then((res) => {
        this.classifyList = res.data.list
      })
      await classifySelect({ hotel_id: this.userInfo.hotel_id }).then((res) => {
        this.room_classify = res.data.room_classify
        this.bed_label = res.data.bed_label
      })
      this.addClassificationForm.hotel_id = this.userInfo.hotel_id
    },
    handleClose() {
      this.dialogVisible = false
      this.addClassificationForm = {
        hotel_id: this.userInfo.hotel_id,
        name: '',
        bed_type: [{ bed_label: '', long: '', wide: '', num: 1 }],
      }
    },
    addClassify() {
      this.$refs.addClassificationFormRef.validate(async (valid) => {
        if (!valid) {
          return
        }
        await createRoomClassify(this.addClassificationForm).then((res) => {
          this.dialogVisible = false
          this.GetClassifyList()
          this.$message.success('添加分类成功!')
        })
      })
    },
    async deleteClassify(id) {
      const confiemResult = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confiemResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      await deleteRoomClassify({ id: id }).then((res) => {
        this.$message.success('删除分类成功!')
        this.GetClassifyList()
      })
    },
    removeBed_type(bed_type) {
      let index = this.addClassificationForm.bed_type.indexOf(bed_type)
      if (index !== -1) {
        this.addClassificationForm.bed_type.splice(index, 1)
      }
    },
    addBed_type() {
      this.addClassificationForm.bed_type.push({
        bed_label: '',
        long: '',
        wide: '',
        num: 1,
      })
    },
  },
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 45px;
}
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 10px;
  text-align: left;
  height: 54px;
  line-height: 54px;
  background-color: #fafafa;
  font-size: 13px;
}
.classifyName {
  margin-right: 20px;
}
.el-form {
  .el-form-item {
    .el-input {
      margin: 0 10px;
    }
    .el-button {
      margin-left: 12px;
    }
    .el-select {
      margin-left: 10px;
    }
  }
}
</style>