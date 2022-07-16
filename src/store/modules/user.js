import LoginApi from '../../api/login'
import { setItem, getItem } from '@/utils/storage'

const TOKEN_KEY = 'token'
export default {
  namespaced: true,
  state: {
    token: getItem(TOKEN_KEY) || ''
  },
  mutations: {
    // 存储token
    set_token(state, token) {
      state.token = token
      setItem(TOKEN_KEY, token)
    }
  },
  actions: {
    // 登录方法
    async login({ commit }, loginForm) {
      const token = await LoginApi.login(loginForm)
      console.log(token)
      commit('set_token', token)
      return token
    }
  }
}
