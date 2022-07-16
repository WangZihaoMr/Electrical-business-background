import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局重置样式表
import './stylesheet/reset.css'

// 关闭vue提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
