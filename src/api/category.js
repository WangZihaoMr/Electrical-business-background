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

// 商品选择接口
const getGoodsSelectionList = () => {
  return request({ url: '/admin/goods/1?tab=all', method: 'GET' })
}

// 删除接口
const delCate = (data) => {
  return request({ url: `/admin/category/${data.id}`, method: 'POST', data })
}

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

// 更新分类编辑接口
const updateCategory = (data = {}) => {
  return request({ url: `/admin/category/${data.id}`, method: 'POST', data })
}

// 导出方法
export default {
  getCatagoryList,
  updateCateList,
  addCatagoryList,
  getGoodsList,
  getGoodsSelectionList,
  updateCategory,
  delCate
}
