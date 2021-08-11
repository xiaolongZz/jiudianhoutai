<template>
  <div>
    <el-card>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" class="addRole" @click="goAddAccount">添加账号</el-button>
      <div class="title">账号列表</div>
      <el-table :data="accountLists" border style="width: 100%" :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="角色" prop="role">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.role" :key="index" style="margin-right: 10px">{{ item.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_name" label="姓名"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column label="权限编辑">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goEditAccount(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small">停用</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加账号的弹窗 -->
    <el-dialog title="添加账号" :visible.sync="addDialogVisible" width="40%" :before-close="handleAddClose">
      <p>基本信息:</p>
      <el-form ref="addFormRef" :model="addForm" label-width="100px">
        <el-form-item label="姓名：" style="width: 60%">
          <el-input v-model="addForm.user_name" placeholder="输入姓名职业均可"></el-input>
        </el-form-item>
        <el-form-item label="账号：" style="width: 60%">
          <el-input v-model="addForm.account" placeholder="输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="密码：" style="width: 60%">
          <el-input v-model="addForm.password" placeholder="输入六位以上十六位以下密码      "></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" style="width: 60%">
          <el-input v-model="addForm.confirm_password" placeholder="再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="角色：">
          <el-select v-model="addForm.role_id" placeholder="请选择该账号的角色，可多选" clearable multiple style="width: 54%" value-key='id'>
            <el-option v-for="(item,i) in roleOptions" :key="i" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleAddClose">取 消</el-button>
        <el-button type="primary" @click="addAccount">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑账号的弹窗 -->
    <el-dialog title="编辑账号" :visible.sync="editDialogVisible" width="40%" :before-close="handleEditClose">
      <p>基本信息:</p>
      <el-form ref="addFormRef" :model="editForm" label-width="100px">
        <el-form-item label="姓名：" style="width: 60%">
          <el-input v-model="editForm.user_name" placeholder="输入姓名职业均可"></el-input>
        </el-form-item>
        <el-form-item label="账号：" style="width: 60%">
          <el-input v-model="editForm.account" placeholder="输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="密码：" style="width: 60%">
          <el-input v-model="editForm.password" placeholder="输入六位以上十六位以下密码      "></el-input>
        </el-form-item>
        <el-form-item label="角色：">
          <el-select v-model="editForm.role" placeholder="请选择该账号的角色，可多选" multiple style="width: 54%" value-key='id'> 
            <el-option v-for="(item,i) in editForm.all_role" :key="i" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="editForm.status" placeholder="设置该账号的状态" style="width: 54%">
            <el-option v-for="(item,i) in statuOptions" :key="i" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleEditClose">取 消</el-button>
        <el-button type="primary" @click="editAccount">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { roleList, createUser, getUserList, getUser } from '../../assets/api/index.js'
export default {
  data() {
    return {
      userInfo: {},
      accountLists: [],
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        user_name: '',
        account: '',
        password: '',
        confirm_password: '',
        role_id: [],
      },
      editForm: {},
      passwordAgain: '',
      roleOptions: [],
      statuOptions: [
        {
          value: '0',
          label: '停用',
        },
        {
          value: '10',
          label: '启用中',
        },
      ],
    }
  },
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.getRoleList()
    this.getUser()
  },
  methods: {
    async getRoleList() {
      await roleList({ hotel_id: this.userInfo.hotel_id }).then((res) => {
        res.data.list.forEach((item) => {
          let role = {}
          role.label = item.name
          role.value = item.id
          this.roleOptions.push(role)
        })
      })
    },
    async getUser() {
      await getUserList({ hotel_id: this.userInfo.hotel_id }).then((res) => {
        this.accountLists = res.data.list
      })
    },
    goAddAccount() {
      this.addDialogVisible = true
    },
    async goEditAccount(id) {
      this.editDialogVisible = true
      await getUser({ id: id+'' }).then((res) => {
        this.editForm = res.data
      })
    },
    addAccount() {
      this.addDialogVisible = false
    },
    handleAddClose() {
      this.addDialogVisible = false
    },
    handleEditClose() {
      this.editDialogVisible = false
    },
    editAccount() {
      this.editDialogVisible = true
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
.addRole {
  margin: 20px 0;
}
.el-table {
  margin-top: 20px;
}
</style>