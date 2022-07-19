import router, { addRoutes } from './router'
import store from './store'

const whiteList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  console.log(token)
  if (token) {
    if (to.path === '/login') {
      // console.log('1')
      next(from.path)
    } else {
      let hasNewRoutes = false
      if (!store.getters.userInfo.menus) {
        // console.log('2')
        const { menus } = await store.dispatch('user/getUserInfo')
        console.log('菜单数据===>', menus)
        if (menus && menus.length > 0) {
          // 动态添加路由
          hasNewRoutes = addRoutes(menus)
        }
        console.log('路由表数据===>', router.getRoutes())
        return next(to.path)
      } else {
        hasNewRoutes ? next(to.fullPath) : next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      console.log('4')
      next('/login')
    }
  }
})
