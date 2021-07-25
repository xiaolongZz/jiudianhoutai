<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="title">
        <span>小巴酒店</span>
      </div>
      <div class="headPortrait">
        <div class="message">
          <span> 您有一笔新订单，请及时处理！</span>
          <i class="el-icon-bell"></i>
        </div>
        <el-popover placement="top-start" width="200" trigger="hover">
          <div class="logoutbox" style="text-align: center; border-bottom: 1px solid #ccc">
            <el-button type="text" @click="goHome">首页</el-button>
          </div>
          <div class="logoutbox" style="text-align: center">
            <el-button type="text" @click="logout">退出</el-button>
          </div>
          <!-- <el-button slot="reference">hover 激活</el-button> -->
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" slot="reference"></el-avatar>
        </el-popover>
        <i>{{ userInfo.user_name }}</i>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">
          <i :class="isCollapse ? 'iconfont icon-indent' : 'iconfont icon-outdent'"></i>
        </div>
        <!-- 侧边栏菜单 -->
        <el-menu background-color="#fff" text-color="black" active-text-color="#ffd04b" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级子菜单 -->
            <el-menu-item :index="'/' + subItem.url + ''" v-for="subItem in item.child" :key="subItem.id" @click="saveNavState('/' + subItem.url + '')">
              <!-- 二级菜单模板 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体结构 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      menuList: [],
      userInfo: {},
      // 图标
      iconsObj: {
        1: 'iconfont icon-dashboard',
        2: 'iconfont icon-dingdanliebiao',
        3: 'iconfont icon-dingdanguanli',
        4: 'iconfont icon-caiwuguanli',
        5: 'iconfont icon-setting-fill',
      },
      // 是否折叠
      isCollapse: false,
      /// 呗激活的链接地址
      activePath: '',
    }
  },
  created() {
    this.menuList = JSON.parse(window.sessionStorage.getItem('menu'))
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    console.log(this.menuList)
  },
  computed: {},
  methods: {
    goHome() {
      this.$router.push('/home')
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 点击按钮 切换菜单的折叠和展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
  },
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  height: 50px !important;
  background: #6c6d6f 1%;
  display: flex;
  justify-content: space-between;
  padding: 0 156px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
  .title {
    span {
      color: #fff;
      font-size: 24px;
    }
  }
  .headPortrait {
    cursor: pointer;
    .message {
      margin-right: 40px;
      span {
        color: #fff;
        font-size: 14px;
        &:hover {
          color: rgb(203, 224, 10);
          cursor: pointer;
        }
      }
    }
    i {
      margin-left: 10px;
      font-style: normal;
      color: #fff;
    }
  }
}
.el-aside {
  background-color: #fff;
  .el-menu {
    border-right: none;
  }
}
.toggle-button {
  background-color: rgb(135, 167, 235);
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
</style>