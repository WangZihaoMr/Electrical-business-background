<template>
  <div class="main-container">
    <tags-view></tags-view>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import TagsView from '../../components/tagsview'
export default {
  name: 'mainView',
  components: { TagsView },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.main-container {
  width: calc(100vw - 250px);
}
</style>
