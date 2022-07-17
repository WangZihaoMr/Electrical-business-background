<template>
  <div class="header-container">
    <!-- 头部左侧 -->
    <ul class="scaling">
      <li>
        <el-icon class="el-icon-s-fold"></el-icon>
        <!-- <el-icon class="el-icon-s-unfold"></el-icon> -->
      </li>
      <li>
        <el-tooltip
          class="item"
          effect="dark"
          content="刷新"
          placement="bottom"
        >
          <el-icon class="el-icon-refresh"></el-icon>
        </el-tooltip>
      </li>
    </ul>
    <!-- 头部右侧 -->
    <div class="userAvatar">
      <span class="screenIcon" @click="toggleScreen">
        <el-tooltip
          class="item"
          effect="dark"
          :content="isFullscreen ? '取消全屏' : '全屏'"
          placement="bottom"
        >
          <el-icon
            :class="isFullscreen ? 'el-icon-aim' : 'el-icon-full-screen'"
          ></el-icon>
        </el-tooltip>
      </span>
      <el-avatar :size="25" :src="$store.getters.userInfo.avatar"></el-avatar>
      <el-dropdown @command="handleSelectOptions">
        <span class="el-dropdown-link">
          {{ $store.getters.userInfo.username
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="fixPwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码 -->
    <el-drawer title="修改密码" :visible.sync="drawer">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'headerView',
  components: {},
  data() {
    return {
      isFullscreen: false,
      drawer: false
    }
  },
  mounted() {
    const that = this
    window.addEventListener('keydown', this.KeyDown, true)
    window.onresize = () => {
      // 调用判断全屏的方法，用来监听
      that.checkFull()
    }
  },
  methods: {
    handleSelectOptions(command) {
      if (command === 'fixPwd') {
        this.handleFixPassword()
      } else {
        this.handleLoginOut()
      }
      console.log(command)
    },
    // 修改密码
    handleFixPassword() {
      this.drawer = !this.drawer
    },
    // 退出登录
    async handleLoginOut() {
      this.$confirm('是否要退出登录？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const res = this.$store.dispatch('user/loginOut')
          console.log(res)
          this.$router.push('/login')
          this.$notify({
            title: '',
            message: '退出登录成功',
            type: 'success'
          })
        })
        .catch(() => {})
    },
    // 全屏功能
    toggleScreen() {
      screenfull.toggle()
      this.isFullscreen = !this.isFullscreen
    },
    checkFull() {
      const fullscreen = window.fullScreen || document.webkitIsFullScreen
      this.fullscreen = fullscreen
      return fullscreen
    },
    // F11按键
    KeyDown(event) {
      let count = 0
      count++
      if (event.keyCode === 122) {
        if (count === 1) {
          console.log('keycode', event.returnValue)
          event.returnValue = false
          this.toggleScreen() // 触发全屏的按钮
          count = 0
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.el-icon {
  font-size: 20px;
}
.header-container {
  width: calc(100vw - 250px);
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  // 头部左侧
  .scaling {
    display: flex;
    li {
      width: 42px;
      height: 64px;
      text-align: center;
      line-height: 64px;
      cursor: pointer;
      &:hover {
        background-color: #4f46e5;
      }
    }
  }
  // 头部右侧
  .userAvatar {
    display: flex;
    align-items: center;
    height: 64px;
    .screenIcon {
      cursor: pointer;
      width: 46px;
      height: 64px;
      text-align: center;
      line-height: 64px;
      &:hover {
        background-color: #4f46e5;
      }
    }
    .el-avatar {
      cursor: pointer;
    }
    .el-dropdown {
      color: #ffffff;
      cursor: pointer;
      margin: 0 30px 0 10px;
    }
  }
}
::v-deep(.el-drawer) {
  width: 45% !important;
}
</style>
