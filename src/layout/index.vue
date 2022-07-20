<template>
  <el-container>
    <el-header>
      <div class="logo">
        <span
          ><el-icon
            class="el-icon-platform-eleme"
            style="padding-right: 5px"
          ></el-icon
          >积云编程</span
        >
      </div>
      <app-header></app-header>
    </el-header>
    <el-container>
      <app-aside></app-aside>
      <app-main></app-main>
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from './Header'
import AppAside from './Aside'
import AppMain from './Main'

export default {
  name: 'layoutView',
  components: { AppHeader, AppAside, AppMain },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.el-container {
  background-color: #f2f3f5;
}
.el-header {
  padding: 0;
  background-color: #b3c0d1;
  color: #333;
  background-color: #4338ca;
  height: 64px !important;
  line-height: 64px;
  display: flex;
}

.el-aside {
  width: 250px !important;
  background-color: #d3dce6;
  color: #333;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.logo {
  width: 250px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 25px;
}
.el-icon-eleme {
  margin-right: 5px;
}
</style>
