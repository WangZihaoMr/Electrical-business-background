import request from '../utils/request'

// 分类管理列表接口
const getCatagoryList = () => {
  return request({ url: '/admin/category', method: 'GET' })
}

// 新增分类管理列表接口
const addCatagoryList = (data = {}) => {
  return request({ url: '/admin/category', method: 'POST', data })
}

// 推荐商品接口
const getGoodsList = () => {
  return request({
    url: '/admin/app_category_item/list?category_id=5',
    method: 'GET'
  })
}

// 删除接口
// const delCate = () => {
//   return request({ url: '', method: '' })
// }

// 更新分类列表状态接口
const updateCateList = (data = {}) => {
  return request({
    url: `/admin/category/${data.id}/update_status`,
    method: 'POST',
    data: {
      status: data.status
    }
  })
}

// 导出方法
export default {
  getCatagoryList,
  updateCateList,
  addCatagoryList,
  getGoodsList
}
