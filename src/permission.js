import router, { addRoutes } from './router'
import store from './store'

const whiteList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  console.log(token)
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      let hasNewRoutes = false
      if (!store.getters.userInfo) {
        const { menus } = await store.dispatch('user/getUserInfo')
        console.log('菜单数据===>', menus)
        // 动态添加路由
        hasNewRoutes = addRoutes(menus)
        console.log('路由表数据===>', router.getRoutes())
        next(to.path)
      } else {
        hasNewRoutes ? next(to.fullPath) : next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
