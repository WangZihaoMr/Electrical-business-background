<template>
  <div class="main-container">
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'mainView',
  components: {},
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
