import router from './router'
import store from './store'

const whiteList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  console.log(token)
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      if (!store.getters.userInfo) {
        const userInfo = await store.dispatch('user/getUserInfo')
        console.log(userInfo)
        if (userInfo) {
          return next(to.path)
        }
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
