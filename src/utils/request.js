import axios from 'axios'
// import { getItem } from '../utils/storage'
import store from '../store'
// const token = getItem('token')
// console.log(token)

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
  // headers: { token: store.user.token }
})

instance.interceptors.request.use(
  function (config) {
    const token = store.getters.token
    if (token) config.headers.token = token
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    if (response.data.msg === 'ok') {
      return response.data.data
    } else if (response.msg === 'ok') {
      return response.data
    }
    // console.log(response)
    // return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 统一发送请求参数
function request(options) {
  options.method = options.method || 'GET'
  options.params =
    options.method.toLocaleUpperCase() === 'GET' ? options.data : {}
  return instance(options)
}

export default request
