import request from '../utils/request'

// 获取规格列表数据
const getSkusList = () => {
  return request({ url: 'admin/skus/1', method: 'GET' })
}

// 新增表格规格数据
const addSkus = (data = {}) => {
  return request({ url: '/admin/skus', method: 'POST', data })
}

// 删除表格规格数据
const delSkus = () => {
  return request({ url: '/admin/skus/delete_all', method: 'POST' })
}

// 编辑switch开关
const editSwitch = (id = '') => {
  return request({ url: `/admin/skus/${id}/update_status`, method: 'POST' })
}

// 编辑表格规格数据
const editTableSkus = (id = '', data = {}) => {
  return request({ url: `/admin/skus/${id}`, method: 'POST', data })
}

// 表单规格编辑
const editFormSkus = (id = '', data = {}) => {
  return request({ url: `/admin/skus/${id}`, method: 'POST', data })
}

// 导出方法
export default {
  getSkusList,
  addSkus,
  delSkus,
  editFormSkus,
  editTableSkus,
  editSwitch
}
