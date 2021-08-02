<template>
  <div class="login-container">
    <!-- 登录标题 -->
    <div class="title">小巴酒店后台登录系统</div>
    <!-- 登录盒子 -->
    <div class="loginbox">
      <!-- logo -->
      <div class="logo">
        <img src="../assets/loginImg/logo.png" alt="" />
      </div>
      <!-- 选择登录的用户类型 -->
      <div class="userType">
        <el-select v-model="loginType" placeholder="请选择登录类型" @change="changeLoginType()" :popper-append-to-body="false">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginForm" class="loginform" :model="loginForm" :rules="loginRules" clearable>
        <!-- 登录用户名输入框 -->
        <el-form-item prop="account">
          <el-input ref="account" v-model.number="loginForm.account" placeholder="请输入账号" prefix-icon="el-icon-user-solid" />
        </el-form-item>
        <!-- 登录密码输入框 -->
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            clearable
            @keyup.enter.native="handleLogin"
            prefix-icon="el-icon-lock"
          />
          <i class="iconfont icon-huabanfuben" @click="lookingpsw()"></i>
        </el-form-item>
        <!-- 商家登录时的短信验证码登录框 -->
        <el-form-item prop="verifyCode" v-if="showVerificationCode">
          <el-input
            ref="verifyCode"
            v-model="loginForm.verifyCode"
            type="text"
            tabindex="3"
            @keyup.enter.native="handleLogin"
            placeholder="请输入验证码"
            style="width: 50%"
            prefix-icon="el-icon-message"
          />
          <el-button plain class="sendMessage" @click="sendMessage" :disabled="sendBtn">
            <span v-if="!sendMsgDisabled">获取验证码</span>
            <span v-if="sendMsgDisabled">{{ codeTime + '秒后获取' }}</span>
          </el-button>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click.native.prevent="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { bizLogin, passReset } from '../assets/api/index.js'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      // 登录表单数据
      loginForm: {
        account: '18522223333', // 13122222222     //13353221241   //15566668888  //18522223333 
        password: '123456', 
        verifyCode: '000000',
      },
      // 登录验证规则
      loginRules: {
        // const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        account: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入要登录的手机号码！',
          },
          {
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            trigger: 'blur',
            message: '请输入正确的手机号码！',
          },
        ],
        password: [{ required: true, trigger: 'blur', message: '请输入登录密码' }],
        verifyCode: [
          { required: true, trigger: 'blur', message: '请输入验证码' },
          { pattern: /^[0-9]{6}$/, trigger: 'blur', message: '请输入6位的数字验证码' },
        ],
      },
      // 验证码显示控制
      showVerificationCode: true,
      passwordType: 'password',
      loginType: '商家登录',
      sendBtn: false,
      sendMsgDisabled: false,
      codeTime: 59,
      codeInterval: null,
      options: [
        {
          value: '商家登录',
          label: '商家登录',
        },
        {
          value: '员工登录',
          label: '员工登录',
        },
      ],
    }
  },
  methods: {
    ...mapMutations(['setState']),
    // 选择登录方式
    changeLoginType() {
      if (this.loginType == '商家登录') {
        this.showVerificationCode = true
        this.loginForm = {}
      } else if (this.loginType == '员工登录') {
        this.showVerificationCode = false
        this.loginForm = {}
      }
    },
    // 点击发送短信
    sendMessage() {
      let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (this.loginForm.account != '' && this.loginForm.password != '' && reg.test(this.loginForm.account)) {
        this.sendBtn = true
        this.sendMsgDisabled = true
        if (this.codeTime > 0) {
          this.codeInterval = setInterval(() => {
            this.codeTime--
            if (this.codeTime <= 0) {
              clearInterval(this.codeInterval)
              this.codeInterval = null
              this.sendBtn = false
              this.sendMsgDisabled = false
              this.codeTime = 59
            }
          }, 1000)
        }
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) return
        if (this.showVerificationCode) {
          //  const data1 =  await passReset (this.loginForm)
          await bizLogin(this.loginForm).then((res) => {
            window.sessionStorage.setItem('token', res.data.token)
            this.$message.success('登录成功~')
          })
          this.$router.push({ path: '/index' })
        }
        if (!this.showVerificationCode) {
          const data1 = await passReset(this.loginForm)
          // const res = await userLogin(this.loginForm)
          //   this.$router.push({ path: this.redirect || '/' })
        }
      })
    },
    lookingpsw(){
      if(this.passwordType == 'password'){
        console.log(111);
        this.passwordType = 'text'
      }
       if(this.passwordType == 'text'){
        this.passwordType = 'password'
      }
    }
  },
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-image: url('../assets/loginImg/img_bg_l.png');
  background-repeat: no-repeat;
  .title {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 35px;
    font-weight: 700;
    color: #fff;
  }
  .loginbox {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 700px;
    height: 400px;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 0 15px #ccc;
    .logo {
      position: absolute;
      top: 0%;
      left: 43%;
    }
    .userType {
      position: absolute;
      top: 5%;
      right: 0%;
      width: 150px;
      height: 50px;
      font-size: 20px;
      text-align: center;
      color: black;
      cursor: pointer;
      line-height: 50px;
      padding-right: 20px;
    }
    .loginform {
      width: 100%;
      position: absolute;
      top: 25%;
      padding: 0 20px;
      box-sizing: border-box;
      .el-form-item {
        margin-bottom: 20px;
        height: 50px;
        .el-input {
          /deep/ .el-input__inner {
            height: 45px;
          }
        }
      }
      .btns {
        display: flex;
        justify-content: space-between;
        .el-button {
          width: 200px;
        }
      }
      .sendMessage {
        position: absolute;
        width: 110px;
        top: 0px;
        right: 100px;
        background-color: #2d3a4b;
        color: #fff;
      }
      .iconfont{
        position:absolute;
        right: 25px;
        cursor: pointer;
      }
    }
  }
}
</style>