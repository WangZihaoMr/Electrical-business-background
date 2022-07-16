<template>
  <div class="login-container">login页面</div>
</template>

<script>
import LoginApi from '../../api/login'

export default {
  name: 'LoginView',
  components: {},
  data() {
    return {}
  },
  created() {
    this.loadLogin()
  },
  methods: {
    async loadLogin() {
      const res = await LoginApi.login({ username: 'admin', password: 'admin' })
      console.log(res)
    }
  }
}
</script>
<style scoped lang="scss"></style>
