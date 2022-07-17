import LoginApi from '../../api/login'
import { setItem, getItem } from '@/utils/storage'

const TOKEN_KEY = 'token'

export default {
  namespaced: true,
  state: {
    token: getItem(TOKEN_KEY) || '',
    userInfo: '',
    isIconStatus: false
  },
  mutations: {
    // 存储token
    set_token(state, token) {
      state.token = token
      setItem(TOKEN_KEY, token)
    },
    // 存储用户信息
    set_userInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    // 左侧菜单的状态
    setIcon(state, status) {
      state.isIconStatus = status
    }
  },
  actions: {
    // 登录方法
    async login({ commit }, loginForm) {
      const res = await LoginApi.login(loginForm)
      // console.log(res.token)
      commit('set_token', res.token)
      return res.token
    },
    // 用户信息
    async getUserInfo({ commit }) {
      const res = await LoginApi.getUserInfo()
      // console.log(res)
      commit('set_userInfo', res)
      return res
    },
    // 退出登录
    async loginOut({ commit }) {
      const res = await LoginApi.loginOut()
      console.log(res)
      commit('set_token', '')
      commit('set_userInfo', {})
      return res
    }
  }
}
