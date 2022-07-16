<template>
  <div class="login-container">
    <!-- hidden-xs-only - 当视口在 xs 尺寸时隐藏 hidden-sm-only - 当视口在 sm
    尺寸时隐藏 hidden-sm-and-down - 当视口在 sm 及以下尺寸时隐藏
    hidden-sm-and-up - 当视口在 sm 及以上尺寸时隐藏 hidden-md-only - 当视口在 md
    尺寸时隐藏 hidden-md-and-down - 当视口在 md 及以下尺寸时隐藏
    hidden-md-and-up - 当视口在 md 及以上尺寸时隐藏 hidden-lg-only - 当视口在 lg
    尺寸时隐藏 hidden-lg-and-down - 当视口在 lg 及以下尺寸时隐藏
    hidden-lg-and-up - 当视口在 lg 及以上尺寸时隐藏 hidden-xl-only - 当视口在 xl
    尺寸时隐藏 -->
    <el-row :gutter="24">
      <el-col :xs="24" :md="24" :lg="16">
        <div class="grid-content bg-purple">
          <div class="welcome">欢迎光临</div>
        </div>
      </el-col>
      <el-col :xs="24" :md="24" :lg="8">
        <div class="grid-content bg-purple-light">
          <div class="login-form">
            <div>
              <h2 class="title">欢迎回来</h2>
              <div class="line-box">
                <span class="line"></span>
                <span class="info">账号密码登录</span>
                <span class="line"></span>
              </div>
              <el-form
                :model="loginForm"
                :rules="loginFormRules"
                ref="loginFormRef"
                class="demo-ruleForm"
              >
                <el-form-item prop="username">
                  <el-input
                    v-model.trim="loginForm.username"
                    size="small"
                    placeholder="请输入用户名"
                    prefix-icon="el-icon-user"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model.trim="loginForm.password"
                    show-password
                    size="small"
                    placeholder="请输入密码"
                    prefix-icon="el-icon-lock"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    class="login-btn"
                    type="primary"
                    size="small"
                    round
                    block
                    @click="handleLoginSubmit('loginFormRef')"
                    >登录</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--     <el-row>
      <el-col :span="16">
        <div class="welcome">欢迎光临</div>
      </el-col>
      <el-col :span="8">
        <div class="login-form">
          <div>
            <h2 class="title">欢迎回来</h2>
            <div class="line">
              <span></span>
              <span>账号密码登录</span>
              <span></span>
            </div>
            <el-form
              :model="loginForm"
              :rules="loginFormRules"
              ref="loginFormRef"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import LoginApi from '../../api/login'

export default {
  name: 'LoginView',
  components: {},
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created() {},
  methods: {
    async loadLogin() {
      const token = await LoginApi.login(this.loginForm)
      console.log(token)
    },
    handleLoginSubmit(loginFormRef) {
      this.$refs[loginFormRef].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.login-container {
  height: 100%;
  background-color: pink;
  .welcome {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    font-weight: 700;
    color: #ffffff;
    height: 100%;
    background-color: #6366f1;
  }
  .login-form {
    text-align: center;
    height: 225px;
    background-color: #fdfdfd;
    .title {
      font-weight: 700;
      font-size: 40px;
      line-height: 45px;
    }
    .line-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;
      margin: 15px 0;
    }
    .info {
      margin: 0 10px;
      color: #d1d5db;
      font-size: 20px;
    }
    .line {
      display: inline-block;
      width: 90px;
      height: 1px;
      background-color: #e5e7eb;
    }
    .el-form {
      width: 250px;
      margin: auto;
    }
  }
}
.el-col {
  padding: 0 !important;
  height: 100vh;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: #fdfdfd;
}
.login-btn {
  width: 100%;
  font-size: 16px;
  background-color: #626aef;
}
::v-deep(.el-form-item__content) {
  line-height: 0;
}
</style>
