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
      >
        <template v-for="item in menusList">
          <template v-if="item.children && item.children.length >= 0">
            <el-submenu :index="item.path" :key="item.title">
              <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="(ele, i) in item.children"
                :key="i"
                :index="ele.path"
              >
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ ele.name }}</span>
              </el-menu-item>
            </el-submenu>
          </template>

          <template v-if="!item.children">
            <el-menu-item :index="item.path" :key="item.title">
              <i :class="'el-icon-' + item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
      <!-- {{ menusList }} -->
    </el-aside>
  </div>
</template>

<script>
import { filterMenus } from '../../utils/menu'
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
      return filterMenus(this.$store.getters.userInfo.menus)
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
