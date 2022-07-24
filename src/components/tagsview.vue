<template>
  <div class="tags-contianer">
    <ul class="tags">
      <li
        :class="{ active: item.path === $route.path }"
        v-for="(item, index) in tags"
        :key="index"
        @click="handleTopath(index, item.path)"
      >
        {{ item.title
        }}<span
          v-if="index !== 0"
          class="close"
          @click="handleDelTag(index, item.path)"
          ><i class="el-icon-close"></i
        ></span>
      </li>
    </ul>
    <el-dropdown @command="handleCloseTagOptions">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="closeOtherTag">关闭其他</el-dropdown-item>
        <el-dropdown-item command="closeAllTag">关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {
    // 删除单个tag
    handleDelTag(i, path) {
      console.log(path)
      if (this.tags.length === 1) {
        this.$router.push(this.tags[0].path)
      } else {
        this.$router.push(this.tags[i - 1].path)
      }
      this.$store.dispatch('tagsview/delTag', i)
    },
    // 跳转tag
    handleTopath(i, path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
      console.log('1===>', this.tags[i].path)
    },
    // 关闭选项功能
    handleCloseTagOptions(command) {
      console.log(command)
      if (command === 'closeOtherTag') {
        this.handleCloseOtherTag()
      } else {
        this.handleCloseAllTag()
      }
    },
    // 关闭其他功能
    handleCloseOtherTag() {
      const currentTag = this.tags.find(
        (item) => item.path === this.$route.path
      )
      const tags = [{ path: '/index', title: '控制台' }, currentTag]
      this.$store.dispatch('tagsview/closeOtherTag', tags)
    },
    // 关闭所有功能
    handleCloseAllTag() {
      this.$store.dispatch('tagsview/closeAllTag')
    }
  },
  // 监听路由，添加tag标签
  watch: {
    $route: {
      handler(to, from) {
        // console.log('to===>', to)
        const obj = {
          path: to.path,
          title: to.meta.title
        }
        // 添加单个tag
        if (to.path && to.meta.title) {
          this.$store.dispatch('tagsview/addTag', obj)
        }
      },
      immediate: true, // 进入页面立即执行
      deep: true
    }
  },
  computed: {
    tags() {
      return this.$store.getters.tags
    }
  }
}
</script>
<style scoped lang="scss">
.tags-contianer {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .tags {
    display: flex;
    height: 40px;
    overflow: auto;
    align-items: center;
    li {
      height: 32px;
      line-height: 32px;
      padding: 0 20px;
      font-size: 14px;
      margin: 0 5px;
      background-color: #ffffff;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      &:hover {
        color: #409eff;
        transition: all 0.5s;
      }
      .close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        margin-left: 4px;
        border-radius: 50%;
        i {
          font-size: 12px;
        }
        &:hover {
          color: #ffffff;
          transition: all 0.5s;
          background-color: #a8abb2;
        }
      }
    }
    .active {
      color: #409eff;
    }
  }
}
</style>
