import request from '../utils/request'

// 获取规格列表数据
const getSkusList = () => {
  return request({ url: 'admin/skus/1', method: 'GET' })
}

// 导出方法
export default {
  getSkusList
}
