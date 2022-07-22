import request from '../utils/request'

// 获取优惠券列表
const getCouponList = () => {
  return request({ url: '/admin/coupon/1', method: 'GET' })
}

// 导出方法
export default {
  getCouponList
}
