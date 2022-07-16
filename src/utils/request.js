import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' }
})

instance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    console.log(response)
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 统一发送请求参数
function request(options) {
  console.log(options)
  options.method = options.method || 'GET'
  options.params =
    options.method.toLocaleUpperCase() === 'GET' ? options.data : {}

  return instance(options)
}

export default request
