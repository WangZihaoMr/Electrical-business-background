import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局重置样式表
import './stylesheet/reset.css'

// 引入elemnt-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入页面鉴权       // 清除token后，页面鉴权报错
import './permission'

// 左侧菜单伸缩文字不消失问题
import Fragment from 'vue-fragment'

// 关闭vue提示
Vue.config.productionTip = false

// 注册elemnt-ui
Vue.use(ElementUI)
Vue.use(Fragment.Plugin)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
