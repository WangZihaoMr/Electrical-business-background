<template>
  <div class="aside-container">
    <el-aside :width="this.$store.getters.isIconStatus ? '68px' : '250px'">
      <!-- <fragment></fragment> -->
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :unique-opened="true"
        :collapse="isIconStatus"
        :collapse-transition="true"
        router
      >
        <template v-for="(item, index) in menusList">
          <template v-if="item.child && item.child.length > 0">
            <el-submenu :index="index.toString()" :key="item.title">
              <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                v-for="ele in item.child"
                :key="ele.frontpath"
                :index="ele.frontpath"
              >
                <!-- {{ ele.frontpath }} -->
                <i :class="'el-icon-' + ele.icon"></i>
                <span slot="title">{{ ele.name }}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </template>
      </el-menu>
      <!-- {{ menusList }} -->
    </el-aside>
  </div>
</template>

<script>
// import { filterMenus } from '../../utils/menu'
export default {
  name: 'asideView',
  components: {},
  data() {
    return {
      isCollapse: this.$store.getters.isCollapse
    }
  },
  created() {},
  methods: {},
  computed: {
    menusList() {
      return this.$store.getters.userInfo.menus
    },
    isIconStatus() {
      return this.$store.getters.isIconStatus
    }
  }
}
</script>
<style scoped lang="scss">
.el-menu {
  border-right: 0;
}
.el-aside {
  transition: all 0.2s;
  height: calc(100vh - 64px);
  overflow-y: auto;
}
// 去除页面滚动条的样式
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
