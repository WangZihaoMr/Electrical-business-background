import request from '../utils/request'

// 登录接口
const login = (data = {}) => {
  return request({ url: '/admin/login', method: 'POST', data })
}

// 用户信息接口
const getUserInfo = () => {
  return request({ url: '/admin/getinfo', method: 'POST' })
}

// 退出登录
const loginOut = () => {
  return request({ url: '/admin/logout', method: 'POST' })
}

// 导出方法
export default {
  login,
  getUserInfo,
  loginOut
}
