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
const delSkus = (ids = []) => {
  return request({
    url: '/admin/skus/delete_all',
    method: 'POST',
    data: { ids: ids }
  })
}

// 多选删除规格数据
const delCheckSkus = (data = {}) => {
  return request({
    url: '/admin/skus/delete_all',
    method: 'POST',
    data
  })
}

// 编辑switch开关
const editSwitch = (data = {}) => {
  return request({
    url: `/admin/skus/${data.id}/update_status`,
    method: 'POST',
    data: {
      status: data.status
    }
  })
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
  editSwitch,
  delCheckSkus
}
